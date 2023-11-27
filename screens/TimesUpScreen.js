import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const TimesUpScreen = (props) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.textContainer}>
        <Text style={styles.text}>Time's Up!</Text>
      </SafeAreaView>
      <View>
        <TouchableOpacity style={styles.exit} onPress={props.onExit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    justifyContent: "center",
    flex: 1,
  },
  text: {
    fontSize: 48,
    fontWeight: "800",
  },
  exit: {
    width: 50,
    height: 50,
  },
});

export default TimesUpScreen;
