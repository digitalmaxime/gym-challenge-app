/* eslint-disable max-len */
import React from "react";
import { StyleSheet, Image, Pressable, Text } from "react-native";

// Styles
import Colors from "../../../constants/styles";

interface ButtonImagProps {
  onPress: () => void;
  imageUri: string | undefined;
  size: number;
}

interface ButtonTextProps {
  onPress: () => void;
  textContent: string;
  disabled: boolean;
  btnBackgroundColor?: string;
  textFontSize?: number;
  textColor?: string;
  width?: number | string;
  height?: number | string;
  margin?: number;
  padding?: number;
}

export function ButtonText({
  onPress,
  textContent,
  disabled,
  btnBackgroundColor = Colors.btnBackgroundColor,
  textFontSize = 30,
  textColor = Colors.textColor,
  width = 300,
  height = 60,
  margin = 10,
  padding = 10,
}: ButtonTextProps) {
  return (
    <Pressable
      disabled={disabled}
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        pressed
          ? styles.btnPressed
          : styles.shadow1,
        styles.btnContainer,
        { backgroundColor: btnBackgroundColor, width: width, height: height, margin: margin, padding: padding },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { fontSize: textFontSize, color: textColor }]}>
        {textContent}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    overflow: "hidden",
    textAlign: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
  shadow1: {
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  btnPressed: {
    opacity: 0.9,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  imageContainer: {
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: Colors.mediumOpacity,
    borderRadius: 22,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "normal",
  },
});
