import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
} from "react-native";

const HomeScreen = (props) => {
  const [editable, setEditable] = useState(true);

  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [five, setFive] = useState("");

  const updateOne = (num) => setOne(num);
  const updateTwo = (num) => setTwo(num);
  const updateThree = (num) => setThree(num);
  const updateFour = (num) => setFour(num);
  const updateFive = (num) => setFive(num);

  const validateInputs = () => {
    if (one == "") {
      Alert.alert("Number 1 is empty.");
      return;
    }
    if (one < 0 || one > 31) {
      Alert.alert("Number 1 needs to be between 0 and 31.");
      return;
    }
    if (two == "") {
      Alert.alert("Number 2 is empty.");
      return;
    }
    if (two < 0 || two > 31) {
      Alert.alert("Number 2 needs to be between 0 and 31.");
      return;
    }
    if (three == "") {
      Alert.alert("Number 1 is empty.");
      return;
    }
    if (three < 0 || three > 31) {
      Alert.alert("Number 3 needs to be between 0 and 31.");
      return;
    }
    if (four == "") {
      Alert.alert("Number 4 is empty.");
      return;
    }
    if (four < 0 || four > 31) {
      Alert.alert("Number 4 needs to be between 0 and 31.");
      return;
    }
    if (five == "") {
      Alert.alert("Number 5 is empty.");
      return;
    }
    if (five < 0 || five > 31) {
      Alert.alert("Number 5 needs to be between 0 and 31.");
      return;
    }

    setEditable(false);
    props.onConfirmNumbers([one, two, three, four, five]);
  };

  const abortHandler = () => {
    setOne("");
    setTwo("");
    setThree("");
    setFour("");
    setFive("");
    setEditable(true);
    props.onAbort();
  };

  if (
    props.numbers != null &&
    one === "" &&
    two === "" &&
    three === "" &&
    four === "" &&
    five === ""
  ) {
    const numberArray = props.numbers;
    setOne(numberArray[0].toString(10));
    setTwo(numberArray[1].toString(10));
    setThree(numberArray[2].toString(10));
    setFour(numberArray[3].toString(10));
    setFive(numberArray[4].toString(10));
    setEditable(false);
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <SafeAreaView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={updateOne}
            value={one}
            keyboardType="number-pad"
            placeholder="1"
            editable={editable}
            maxLength={2}
          />
          <TextInput
            style={styles.input}
            onChangeText={updateTwo}
            value={two}
            keyboardType="number-pad"
            placeholder="2"
            editable={editable}
            maxLength={2}
          />
          <TextInput
            style={styles.input}
            onChangeText={updateThree}
            value={three}
            keyboardType="number-pad"
            placeholder="3"
            editable={editable}
            maxLength={2}
          />
          <TextInput
            style={styles.input}
            onChangeText={updateFour}
            value={four}
            keyboardType="number-pad"
            placeholder="4"
            editable={editable}
            maxLength={2}
          />
          <TextInput
            style={styles.input}
            onChangeText={updateFive}
            value={five}
            keyboardType="number-pad"
            placeholder="5"
            editable={editable}
            maxLength={2}
          />
        </SafeAreaView>
        {editable && (
          <View style={styles.confirmButtonContainer}>
            <Button title="Confirm" onPress={() => validateInputs()} />
          </View>
        )}

        {!editable && (
          <SafeAreaView style={styles.startButtonsContainers}>
            <Button title="Start A" onPress={props.onStartControl} />
            <Button title="Start B" onPress={props.onStartExperimental} />
          </SafeAreaView>
        )}
        <TouchableOpacity style={styles.abort} onPress={abortHandler} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    width: 50,
    height: 50,
    margin: 12,
    textAlign: "center",
    fontSize: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  startButtonsContainers: {
    justifyContent: "center",
    flex: 1,
  },
  confirmButtonContainer: {
    flex: 1,
  },
  abort: {
    width: 50,
    height: 50,
  },
});

export default HomeScreen;
