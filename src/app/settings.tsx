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
  { title: "Brochure", content: "Brochure content..." },
  { title: "Neighbourhood", content: "Neighbourhood content..." },
  { title: "Ratings & Reviews", content: "Ratings & Reviews content..." },
  { title: "Listings", content: "Listings content..." },
  { title: "Feedback", content: "Feedback content..." },
  { title: "About Locality", content: "About Locality content..." },
  { title: "Contact", content: "Contact content..." },
  { title: "Q&A", content: "Q&A content..." },
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

const Settings = () => {
  const scrollY = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const verticalScrollRef = useAnimatedRef<Animated.ScrollView>();
  const tabScrollRef = useAnimatedRef<Animated.ScrollView>();

  // Store the layout positions of each section
  const snapTo = useRef<number[]>([]);

  const updateActiveIndex = useCallback((index: number) => {
    if (index < 0) return;
    setActiveIndex(index);
    tabScrollRef.current?.scrollTo({ x: index * 100, animated: true });
  }, []);

  const onScrollVertical = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      const currentScroll = scrollY.value;
      const midpoint = currentScroll + SCREEN_HEIGHT / 2;

      // Find the index of the section whose top is closest to the scroll midpoint
      const closestIndex = snapTo.current.findIndex(
        (layoutY, index) =>
          layoutY <= midpoint &&
          (index === snapTo.current.length - 1 ||
            snapTo.current[index + 1] > midpoint)
      );
      // console.log("🚀 ~ Settings ~ closestIndex:", closestIndex);

      // Update only if the index has changed
      if (closestIndex !== activeIndex && closestIndex >= 0) {
        runOnJS(updateActiveIndex)(closestIndex);
      }
    },
  });

  const scrollToSection = (index: number) => {
    if (snapTo.current.length > index) {
      verticalScrollRef.current?.scrollTo({
        y: snapTo.current[index],
        animated: true,
      });
    }
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
        // showsVerticalScrollIndicator={false}
      >
        {SECTIONS.map((section, index) => (
          <View
            key={section.title}
            style={styles.section}
            onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              snapTo.current[index] = layout.y;
            }}
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

export default Settings;
