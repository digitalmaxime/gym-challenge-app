/* eslint-disable arrow-body-style */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Colors from '../../../constants/styles';

type RootStackParamList = {
    params: { hintText: string };
  };
  type HintScreenRouteProp = RouteProp<RootStackParamList, 'params'>;

function HintScreen() {
  const route = useRoute<HintScreenRouteProp>();
  const { hintText } = route.params;

  return (
    <View style={styles.screenContainer}>
      <View style={styles.courseContainer}>
        <View style={{
          width: '100%', justifyContent: 'center', alignItems: 'center', margin: 30,
        }}
        >
          <Text style={{ color: Colors.textColor, fontSize: 26 }}>{hintText}</Text>
        </View>
      </View>
    </View>
  );
}

export default HintScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.coursesBackgroundColor,
  },
  courseContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
