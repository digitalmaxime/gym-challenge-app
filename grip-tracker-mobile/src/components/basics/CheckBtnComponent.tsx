/* eslint-disable max-len */
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../constants/styles';
import { ButtonText } from './Buttons';

interface CheckBtnComponentProps {
  handleCheckPress: () => boolean;
  saveData: () => void;
}

function CheckBtnComponent({
  handleCheckPress,
  saveData,
}: CheckBtnComponentProps) {
  return (
    <View style={styles.checkContainer}>
      <View style={styles.goToNextQuestionContainer}>
        <ButtonText
          onPress={saveData}
          textContent={'Terminer'}
          btnHeight={60}
          btnWidth={200}
          btnImgBackgroundColor={Colors.success}
          padding={0}
          disabled={false}
        />
      </View>
    </View>
  );
}

export default CheckBtnComponent;

const styles = StyleSheet.create({
  checkContainer: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goToNextQuestionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
