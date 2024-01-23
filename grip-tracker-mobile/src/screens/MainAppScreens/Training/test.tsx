/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ButtonText } from '../../../components/basics/Buttons';
import Colors from '../../../constants/styles';

type RootStackParamList = Record<string, Record<string, never>>;

export function Test() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text>Test</Text>
      <ButtonText
        onPress={async () => {
          try {
      
            console.log("toto");
          } catch (e) {
            console.log(e);
            console.log(':C');
          }
          console.log(':)');
        }}
        textContent="test"
        btnHeight={60}
        btnWidth={300}
        padding={8}
        btnImgBackgroundColor={Colors.transparent}
        disabled={false}
      />
    </View>
  );
}
