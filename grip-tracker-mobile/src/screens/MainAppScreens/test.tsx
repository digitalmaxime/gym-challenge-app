/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ButtonText } from '../../components/basics/Buttons';
import Colors from '../../constants/styles';
import * as Controller from '../../controller/controller';
import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseFunctions } from '../../utils/firebase';

type RootStackParamList = Record<string, Record<string, never>>;

export function Test() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text>Test</Text>
      <ButtonText
        onPress={() => {
          Controller.addMessageFunction()
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            const message = error instanceof Error ? error.message : String(error);
            console.error({ message });
            console.warn('failed at updateLessonProgress() :(');
          });
        }}
        textContent="click me"
        btnHeight={60}
        btnWidth={300}
        padding={8}
        btnImgBackgroundColor={Colors.transparent}
        disabled={false}
      />
    </View>
  );
}
