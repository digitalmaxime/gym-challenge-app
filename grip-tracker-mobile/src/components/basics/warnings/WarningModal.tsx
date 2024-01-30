/* eslint-disable max-len */
import React from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
} from 'react-native';
import { ButtonText } from '../btn/Buttons';
import Colors from '../../../constants/styles';


type WarningModalProps = {
    message: string;
    confirm: () => void;
    cancel: () => void;
}
export default function WarningModal({ message, confirm, cancel }: WarningModalProps) {
  return (
    <Modal
      transparent
      animationType="fade"
    >
      <View style={styles.warningContainer}>
        <View style={styles.warningContent}>
          <Text style={{
            fontSize: 18, marginBottom: 8, textAlign: 'center',
          }}
          >
            {message}
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <ButtonText
              onPress={() => {
                confirm();
              }}
              textContent="confirm"
              btnBackgroundColor={Colors.bottomNavBarColor}
              padding={14}
              disabled={false}
            />
            <ButtonText
              onPress={() => {
                cancel();
              }}
              textContent="cancel"
              btnBackgroundColor={Colors.cancel}
              padding={14}
              disabled={false}
            />

          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({

  warningContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  warningContent: {
    margin: 40,
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
