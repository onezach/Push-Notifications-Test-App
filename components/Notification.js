import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

const Notification = (props) => {
  return (
    <View style={{ ...styles.container, ...props.data.background }}>
      <View style={styles.iconContainer}>
        <Image
          source={props.data.icon ? props.content.icon : null}
          style={styles.icon}
        />
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text style={{ ...styles.textTitle, ...props.data.font }}>
            {props.content.title}
          </Text>
        </View>
        <View style={styles.text}>
          <Text style={{ ...styles.textBody, ...props.data.font }}>
            {props.content.body}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    flex: 1,
    borderRadius: 20,
    opacity: 0.75,
    flexDirection: "row",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.2,
  },
  textTitle: {
    color: "black",
    fontSize: 15,
    fontWeight: 'bold',
  },
  textBody: {
    color: "black",
    fontSize: 11,
  },
  iconContainer: {
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  textContainer: {
    flexShrink: 1,
  },
  text: {
    justifyContent: "center",
    flex: 1,
  },
});

export default Notification;
