/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ButtonText } from '../../../components/basics/Buttons';
import Colors from '../../../constants/styles';
import { MODE } from '@env';

type RootStackParamList = Record<string, Record<string, never>>;

export function Test() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text>{MODE}</Text>
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
        textContent={MODE}
        padding={8}
        btnBackgroundColor={Colors.transparent}
        disabled={false}
      />
    </View>
  );
}
