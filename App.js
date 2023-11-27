import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import HomeScreen from "./screens/HomeScreen";
import TestingScreen from "./screens/TestingScreen";
import TimesUpScreen from "./screens/TimesUpScreen";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("home_screen");
  const [testMode, setTestMode] = useState("");
  const [first, setFirst] = useState(null);
  const [numbers, setNumbers] = useState(null);

  const onStartTestHandler = (mode) => {
    if (mode === "control") {
      setTestMode("control");
      if (!first) {
        setFirst("control");
      }
    } else if (mode === "experimental") {
      setTestMode("experimental");
      if (!first) {
        setFirst("experimental");
      }
    }
    setActiveScreen("testing_screen");
  };
  const onExitHandler = () => {
    setActiveScreen("home_screen");
    setTestMode("");
  };
  const onAbortHandler = () => {
    setActiveScreen("home_screen");
    setNumbers(null);
    setTestMode("");
    setFirst(null);
  };
  const onFinishHandler = () => {
    setActiveScreen("times_up_screen");
    setTestMode("");
  };
  const onConfirmNumbersHandler = (numbers) => {
    let numberArray = [];
    for (let i = 0; i < 5; i++) {
      numberArray.push(parseInt(numbers[i]));
    }
    setNumbers(numberArray);
  };

  let screen = null;

  if (activeScreen === "home_screen") {
    screen = (
      <HomeScreen
        onStartControl={onStartTestHandler.bind(this, "control")}
        onStartExperimental={onStartTestHandler.bind(this, "experimental")}
        onConfirmNumbers={(numbers) => onConfirmNumbersHandler(numbers)}
        numbers={numbers}
        onAbort={onAbortHandler}
      />
    );
  } else if (activeScreen === "testing_screen") {
    screen = (
      <TestingScreen
        mode={testMode}
        onAbort={onAbortHandler}
        first={first}
        onFinish={onFinishHandler}
        numbers={numbers}
      />
    );
  } else if (activeScreen === "times_up_screen") {
    screen = <TimesUpScreen onExit={onExitHandler} />;
  }

  return <View style={styles.container}>{screen}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
