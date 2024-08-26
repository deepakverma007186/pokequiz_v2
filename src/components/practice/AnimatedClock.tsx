import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";
import dayjs from "dayjs";

const SIZE = Dimensions.get("screen").width * 0.9;
const TICK_INTERVAL = 1000;

export default function Clock() {
  const secondRef = useRef(new Animated.Value(0));
  const minuteRef = useRef(new Animated.Value(0));
  const hourRef = useRef(new Animated.Value(0));

  useEffect(() => {
    const updateClock = () => {
      const now = dayjs();
      const seconds = now.second();
      const minutes = now.minute();
      const hours = now.hour() % 12;

      secondRef.current.setValue(seconds);
      minuteRef.current.setValue(minutes);
      hourRef.current.setValue(hours * 5 + minutes / 12);

      Animated.timing(secondRef.current, {
        toValue: seconds + 1,
        duration: TICK_INTERVAL,
        useNativeDriver: true,
      }).start();
    };

    updateClock();
    const interval = setInterval(updateClock, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const secondDegrees = secondRef.current.interpolate({
    inputRange: [0, 60],
    outputRange: ["0deg", "360deg"],
  });

  const minuteDegrees = minuteRef.current.interpolate({
    inputRange: [0, 60],
    outputRange: ["0deg", "360deg"],
  });

  const hourDegrees = hourRef.current.interpolate({
    inputRange: [0, 60],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.bigQuadrant} />
      <View style={styles.mediumQuadrant} />
      <Animated.View
        style={[styles.mover, { transform: [{ rotate: hourDegrees }] }]}
      >
        <View style={styles.hours} />
      </Animated.View>
      <Animated.View
        style={[styles.mover, { transform: [{ rotate: minuteDegrees }] }]}
      >
        <View style={styles.minutes} />
      </Animated.View>
      <Animated.View
        style={[styles.mover, { transform: [{ rotate: secondDegrees }] }]}
      >
        <View style={styles.seconds} />
      </Animated.View>
      <View style={styles.smallQuadrant} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  mover: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  hours: {
    backgroundColor: "rgba(0,0,0,0.4)",
    height: "35%",
    marginTop: "15%",
    width: 4,
    borderRadius: 4,
  },
  minutes: {
    backgroundColor: "rgba(0,0,0,0.8)",
    height: "45%",
    marginTop: "5%",
    width: 3,
    borderRadius: 3,
  },
  seconds: {
    backgroundColor: "rgba(227,71,134,1)",
    height: "50%",
    width: 2,
    borderRadius: 2,
  },
  bigQuadrant: {
    width: SIZE * 0.8,
    aspectRatio: 1,
    borderRadius: SIZE * 0.4,
    backgroundColor: "rgba(200,200,200,0.2)",
    position: "absolute",
  },
  mediumQuadrant: {
    width: SIZE * 0.5,
    aspectRatio: 1,
    borderRadius: SIZE * 0.25,
    backgroundColor: "rgba(200,200,200,0.4)",
    position: "absolute",
  },
  smallQuadrant: {
    width: 12,
    aspectRatio: 1,
    borderRadius: 6,
    backgroundColor: "rgba(227,71,134,1)",
    position: "absolute",
  },
});
