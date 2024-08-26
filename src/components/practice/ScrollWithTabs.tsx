import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const SECTIONS = [
  { title: "Overview", content: "Overview content..." },
  { title: "Amenities", content: "Amenities content..." },
  { title: "Price & floor plan", content: "Price & floor plan content..." },
  { title: "Image tour", content: "Image tour content..." },
];

const Tab = ({ title, isActive, onPress }: any) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isActive ? 1 : 0.5),
      transform: [{ scale: withTiming(isActive ? 1 : 0.9) }],
    };
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.Text style={[styles.tabText, animatedStyle]}>
        {title}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const ScrollWithTabs = () => {
  const scrollY = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Correctly type your animated refs for ScrollViews
  const verticalScrollRef = useAnimatedRef<Animated.ScrollView>();
  const tabScrollRef = useAnimatedRef<Animated.ScrollView>();

  // Correctly type your refs for sections
  const sectionRefs = useRef<(View | null)[]>(SECTIONS.map(() => null));

  const updateActiveIndex = useCallback((index: number) => {
    if (index < 0) return;
    setActiveIndex(index);
    tabScrollRef.current?.scrollTo({ x: index * 100, animated: true });
  }, []);

  const onScrollVertical = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      const newIndex = Math.floor(scrollY.value / (SCREEN_HEIGHT * 0.4));
      if (newIndex !== activeIndex) {
        runOnJS(updateActiveIndex)(newIndex);
      }
    },
  });

  const scrollToSection = (index: number) => {
    const ref = sectionRefs.current[index];
    if (ref) {
      ref.measure((fx, fy, width, height, px, py) => {
        verticalScrollRef.current?.scrollTo({ y: py, animated: true });
      });
    }
    updateActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={tabScrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
      >
        {SECTIONS.map((section, index) => (
          <Tab
            key={section.title}
            title={section.title}
            isActive={index === activeIndex}
            onPress={() => scrollToSection(index)}
          />
        ))}
      </Animated.ScrollView>
      <Animated.ScrollView
        ref={verticalScrollRef}
        onScroll={onScrollVertical}
        scrollEventThrottle={16}
      >
        {SECTIONS.map((section, index) => (
          <View
            key={section.title}
            ref={(el) => (sectionRefs.current[index] = el)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text>{section.content}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  section: {
    minHeight: SCREEN_HEIGHT * 0.6,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ScrollWithTabs;
