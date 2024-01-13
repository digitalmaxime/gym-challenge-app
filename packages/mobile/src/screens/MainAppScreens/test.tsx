/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import {
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ButtonText } from '../../components/basics/Buttons';
import Colors from '../../constants/styles';

type RootStackParamList = Record<string, Record<string, never>>;

export function Test() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text>Test</Text>
      <ButtonText
        onPress={() => {
          navigation.navigate('PinchScreen', {});
        }}
        textContent="PinchScreen"
        btnHeight={60}
        btnWidth={300}
        padding={8}
        btnImgBackgroundColor={Colors.transparent}
        disabled={false}
      />
    </View>
  );
}
