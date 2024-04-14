/* eslint-disable import/prefer-default-export */
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Colors from "../../../constants/styles";
import { MODE } from "@env";
import { TextButton } from "../../../components/basics/btn/TextButton";
import * as Controller from "controller";
import { GripTypeEnum } from "../../../models/grip/GripTypeEnum";
import { useUserContext } from "../../../contexts/UserContext";
import { ProgressDictionary } from "../../../models/challengeProgress/ProgressDictionary";
import Header from "../../../components/header/Header";
import { DateTimeService } from "../../../services/dateTime/DateTimeService";

type RootStackParamList = Record<string, Record<string, never>>;

export function Test() {
  const user = useUserContext();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      
      {/********* Header *********/}
      <Header></Header>

      <View style={styles.contentContainer}>
        <Text>{MODE}</Text>
        <TextButton
          onPress={async () => {
            /** Initialize dictionary of Progresses */
            try {
              await Controller.setChallengeProgressMockData();
            } catch (e) {
              console.log(e);
              console.log(":C");
            }
            console.log(":)");
          }}
          textContent={MODE}
          padding={8}
          btnBackgroundColor={Colors.transparent}
          disabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "space-evenly",
    padding: 0,
    margin: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    // backgroundColor: 'blue',
  },
});
