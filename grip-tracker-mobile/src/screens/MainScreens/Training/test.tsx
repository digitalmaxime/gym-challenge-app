/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Colors from '../../../constants/styles';
import { MODE } from '@env';
import { TextButton } from '../../../components/basics/btn/textButton';
import * as Controller from '../../../api/controller';
import { GripTypeEnum } from '../../../models/grip/GripTypeEnum';
import { SubGripTypeEnum } from '../../../models/grip/SubGripTypeEnum';
import { useUserContext } from '../../../contexts/UserContext';

type RootStackParamList = Record<string, Record<string, never>>;

export function Test() {
  const user = useUserContext();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text>{MODE}</Text>
      <TextButton
        onPress={async () => {
          try {
            const toto = await Controller.getChallengeProgress(user.userData.id, GripTypeEnum.Pinch, SubGripTypeEnum.wideDeep);
            console.log("toto", toto.data);
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
