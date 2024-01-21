/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { ButtonText } from '../../components/basics/Buttons';
import Colors from '../../constants/styles';
import * as Controller from '../../controller/controller';
import { firebaseFunctions } from '../../utils/firebase';

type RootStackParamList = Record<string, Record<string, never>>;

export function Test() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text>Test</Text>
      <ButtonText
        onPress={async () => {
          try {
            const toto = await Controller.getAllGrips();
            console.log(toto.data);
          } catch (e) {
            console.log(e);
            console.log(':C');
          }
          console.log(':)');
        }}
        textContent="get all grips"
        btnHeight={60}
        btnWidth={300}
        padding={8}
        btnImgBackgroundColor={Colors.transparent}
        disabled={false}
      />
      <ButtonText
        onPress={async () => {
          try {
            const toto = await Controller.getFilteredGrips("crimp");
            console.log(toto.data);
          } catch (e) {
            console.log(e);
            console.log(':C');
          }
          console.log(':)');
        }}
        textContent="get crimp grips"
        btnHeight={60}
        btnWidth={300}
        padding={8}
        btnImgBackgroundColor={Colors.transparent}
        disabled={false}
      />
      <ButtonText
        onPress={async () => {
          try {
            const toto = await Controller.getFilteredGrips("pinch");
            console.log(toto.data);
          } catch (e) {
            console.log(e);
            console.log(':C');
          }
          console.log(':)');
        }}
        textContent="get pinch grips"
        btnHeight={60}
        btnWidth={300}
        padding={8}
        btnImgBackgroundColor={Colors.transparent}
        disabled={false}
      />
    </View>
  );
}
