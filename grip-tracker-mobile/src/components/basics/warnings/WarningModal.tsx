/* eslint-disable max-len */
import React from "react";
import { View, Modal, Text, StyleSheet } from "react-native";
import { TextButton } from "../btn/textButton";
import Colors from "../../../constants/styles";

type WarningModalProps = {
  message: string;
  confirm: () => void;
  cancel: () => void;
};
export default function WarningModal({
  message,
  confirm,
  cancel,
}: WarningModalProps) {
  return (
    <Modal transparent animationType="fade">
      <View style={styles.warningContainer}>
        <View style={styles.warningContent}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 8,
              textAlign: "center",
              color: "white",
            }}
          >
            {message}
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TextButton
              onPress={() => {
                confirm();
              }}
              textContent="confirm"
              btnBackgroundColor={Colors.btnBackgroundColor}
              disabled={false}
              width={"50%"}
                textFontSize={22}
            />
            <TextButton
              onPress={() => {
                cancel();
              }}
              textContent="cancel"
              btnBackgroundColor={Colors.cancel}
              disabled={false}
              textFontSize={22}
              width={"50%"}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  warningContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  warningContent: {
    justifyContent: "center",
    width: '90%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
