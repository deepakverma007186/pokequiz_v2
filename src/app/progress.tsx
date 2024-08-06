import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";

const Progress: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(0);
  console.log(selectedStep);

  const progressValues = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  const startProgress = (index: number) => {
    Animated.timing(progressValues[index], {
      toValue: 60,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const onNextStep = () => {
    if (selectedStep > 0) {
      startProgress(selectedStep - 1);
    }

    setTimeout(() => {
      setSelectedStep((prev) => prev + 1);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        {["1", "2", "3", "4"].map((label, index) => (
          <React.Fragment key={label}>
            <View
              style={[
                styles.step,
                { backgroundColor: selectedStep > index ? "green" : "#f2f2f2" },
              ]}
            >
              <Text style={styles.stepText}>{label}</Text>
            </View>
            {index < 3 && <View style={styles.connector} />}
          </React.Fragment>
        ))}
      </View>

      <View style={styles.progressContainer}>
        {progressValues.map((progress, index) => (
          <Animated.View
            key={index}
            style={[
              styles.progressBar,
              {
                width: progress,
                backgroundColor: "green",
                marginLeft: 30,
              },
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={onNextStep}>
        <Text>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  stepsContainer: {
    height: 4,
    alignItems: "center",
    padding: 50,
    flexDirection: "row",
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  stepText: { color: "#fff" },
  connector: { width: 60, height: 4, backgroundColor: "#f2f2f2" },
  progressContainer: {
    height: 4,
    alignItems: "center",
    padding: 50,
    position: "absolute",
    top: 0,
    flexDirection: "row",
    // left: 30,
  },
  progressBar: { height: 4 },
  button: {
    marginTop: 100,
    height: 50,
    width: 200,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
  },
});

export default Progress;
