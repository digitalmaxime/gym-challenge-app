import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { GripModel } from '../../../../models/grip/GripModel';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeadhangChallengeProps {}

type ParamList = {
  deadhang: GripModel;
};

type RootStackParamList = Record<string, Record<string, never>>;

const DeadhangChallenge = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<ParamList>>();

  return (
    <View style={styles.container}>
      <Text>DeadhangChallenge</Text>
    </View>
  );
};

export default DeadhangChallenge;

const styles = StyleSheet.create({
  container: {}
});
