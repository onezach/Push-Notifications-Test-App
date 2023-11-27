import { StyleSheet } from "react-native";

const NotificationData = (input) => {
  let data = {};

  // icon
  if (input[0] == "0") {
    data["icon"] = true;
  } else {
    data["icon"] = false;
  }

  // haptic
  if (input[1] == "0") {
    data["vibration"] = true;
  } else {
    data["vibration"] = false;
  }

  // duration
  if (input[2] == "0") {
    data["duration"] = 4;
  } else {
    data["duration"] = 12;
  }

  // font
  if (input[3] == "0") {
    data["font"] = { ...styles[2] };
  } else {
    data["font"] = { ...styles[3] };
  }

  // background color
  if (input[4] == "0") {
    data["background"] = { ...data.style, ...styles[0] };
  } else {
    data["background"] = { ...data.style, ...styles[1] };
  }

  return data;
};

const styles = StyleSheet.create({
  0: {
    backgroundColor: "red",
  },
  1: {
    backgroundColor: "yellow",
  },
  2: {
    fontFamily: "Chalkduster",
  },
  3: {
    fontFamily: "Times New Roman",
  },
  4: { backgroundColor: "green" },
});

export default NotificationData;
