import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../../constants/styles";

interface IconBtnProps {
  onPress: () => void;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  iconSize?: number;
  iconColor?: string;
  btnBackgroundColor?: string;
  margin?: number;
  padding?: number;
  disabled: boolean;
}

export function IconBtn({
  onPress,
  iconName,
  iconSize = 30,
  iconColor = "black",
  btnBackgroundColor = Colors.transparent,
  margin = 0,
  padding = 0,
  disabled,
}: IconBtnProps) {
  return (
    <Pressable
      disabled={disabled}
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        pressed ? styles.btnPressed : styles.shadow1,
        {
          backgroundColor: btnBackgroundColor,
          margin: margin,
          padding: padding,
        },
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={iconName}
        color={iconColor}
        size={iconSize}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
});
