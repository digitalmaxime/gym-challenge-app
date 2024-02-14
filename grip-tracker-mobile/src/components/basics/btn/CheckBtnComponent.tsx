/* eslint-disable max-len */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextButton } from './TextButton';
import Colors from '../../../constants/styles';
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
        <TextButton
          onPress={saveData}
          textContent="Done"
          height={60}
          width={200}
          btnBackgroundColor={Colors.success}
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
