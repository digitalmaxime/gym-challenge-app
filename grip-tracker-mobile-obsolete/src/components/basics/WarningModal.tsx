/* eslint-disable max-len */
import React from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
} from 'react-native';

import Colors from '../../constants/styles';
import { ButtonText } from '../basics/Buttons';

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
              textContent="confirmer"
              btnImgBackgroundColor={Colors.bottomNavBarColor}
              btnHeight={undefined}
              btnWidth={150}
              padding={14}
              disabled={false}
            />
            <ButtonText
              onPress={() => {
                cancel();
              }}
              textContent="annuler"
              btnImgBackgroundColor={Colors.cancel}
              btnHeight={undefined}
              btnWidth={150}
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
    backgroundColor: Colors.warningBackground,
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
