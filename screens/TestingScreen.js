import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Vibration,
  TouchableOpacity,
} from "react-native";
import * as Notifications from "expo-notifications";

import NotificationData from "../constants/NotificationData";
import NotificationContent from "../constants/NotificationContent";
import Notification from "../components/Notification";

const SECOND = 1000;
const INTERVAL = 35;
const DELAY = 15;

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const scheduleNotificationHandler = (delay, content) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: content.title,
      body: content.body,
    },
    trigger: {
      seconds: delay,
    },
  });
  setTimeout(() => {
    Vibration.vibrate();
  }, SECOND * delay);
};

const TestingScreen = (props) => {
  const [enteredText, setEnteredText] = useState("");
  const [typingStarted, setTypingStarted] = useState(false);
  const [customNotification, setCustomNotification] = useState(null);

  const textRef = useRef(enteredText);
  textRef.current = enteredText;

  const getSequence = () => {
    let sequence = [];
    for (let s = 0; s < 5; s += 1) {
      let current = props.numbers[s].toString(2);
      while (current.length < 5) {
        current = "0" + current;
      }
      sequence.push(current);
    }
    console.log(
      "\n%s\n%s\n%s\n%s\n%s",
      sequence[0],
      sequence[1],
      sequence[2],
      sequence[3],
      sequence[4]
    );

    return sequence;
  };

  const finish = () => {
    console.log("\n" + textRef.current);
    props.onFinish();
  };

  const updateTextHandler = (text) => {
    if (!typingStarted) {
      setTypingStarted(Date.now());
      initializeNotificationSequence();
    }
    setEnteredText(text);
  };

  const sendCustomNotification = (data, content) => {
    setCustomNotification(<Notification data={data} content={content} />);
    if (data.vibration) {
      Vibration.vibrate([100], true);
    }

    setTimeout(() => {
      setCustomNotification(null);
      Vibration.cancel();
    }, SECOND * data.duration);
  };

  const initializeNotificationSequence = () => {
    const contentList = NotificationContent;

    if (props.first === "control") {
      if (props.mode === "control") {
        for (let i = 0; i < 5; i += 1) {
          scheduleNotificationHandler(DELAY + i * INTERVAL, contentList[i]);
        }
      } else if (props.mode === "experimental") {
        let sequence = getSequence();

        for (let i = 5; i < 10; i += 1) {
          setTimeout(() => {
            const content = contentList[i];
            const data = NotificationData(sequence[i - 5]);
            sendCustomNotification(data, content);
          }, DELAY * SECOND + (i - 5) * SECOND * INTERVAL);
        }
      }
    } else if (props.first === "experimental") {
      if (props.mode === "experimental") {
        let sequence = getSequence();

        for (let i = 0; i < 5; i += 1) {
          setTimeout(() => {
            const content = contentList[i];
            const data = NotificationData(sequence[i]);
            sendCustomNotification(data, content);
          }, DELAY * SECOND + i * SECOND * INTERVAL);
        }
      } else if (props.mode === "control") {
        for (let i = 5; i < 10; i += 1) {
          scheduleNotificationHandler(
            DELAY + (i - 5) * INTERVAL,
            contentList[i]
          );
        }
      }
    }

    setTimeout(() => {
      finish();
    }, 180 * SECOND);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <SafeAreaView style={styles.notificationContainer}>
          <View style={styles.notificationArea}>{customNotification}</View>
        </SafeAreaView>
        <SafeAreaView style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={updateTextHandler}
            value={enteredText}
            // autoCapitalize={false}
            // autoComplete={false}
            autoCorrect={false}
            multiline={true}
            scrollEnabled={true}
          />
        </SafeAreaView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.abort} onPress={props.onAbort} />
        </View>
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
  inputContainer: {
    flex: 6,
    flexDirection: "row",
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  buttonContainer: {
    flex: 6,
    justifyContent: "flex-end",
  },
  textInput: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  notificationArea: {
    flex: 1,
  },
  notificationContainer: {
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 0,
  },
  abort: {
    width: 50,
    height: 50,
  },
});

export default TestingScreen;
