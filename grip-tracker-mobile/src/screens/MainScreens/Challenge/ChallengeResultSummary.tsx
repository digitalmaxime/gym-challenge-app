import React, { Dispatch } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { ButtonText } from "../../../components/basics/btn/textButton";
import Colors from "../../../constants/styles";
import AnimatedIcon from "../../../components/basics/btn/animatedIcon";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { GripModel } from "../../../models/grip/GripModel";
import { useUserContext } from "../../../contexts/UserContext";

const utTensoSicVis = require("../../../../assets/images/ut-tenso-sic-vis.png");

type RootStackParamList = Record<string, Record<string, never>>;

type pathParam = {
  param: ChallengeSummaryPathParam
};

export type ChallengeSummaryPathParam = {
  gripType: string;
  subGripType: string;
  weight: number;
  duration: number;
}

function ChallengeResultSummary() {
  const userContext = useUserContext();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<pathParam>>();
  console.log(route.params)
  console.log(route.name)
  const { gripType } = route.params;
  const { subGripType } = route.params;
  const { weight } = route.params;
  const { duration } = route.params;

  function closeChallenge() {
    navigation.goBack();
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.congratsText}>Bravo {userContext.userData?.userName || userContext.userData?.email}!</Text>

      <Text style={styles.congratsText}>Weight : {weight} kilos</Text>
      <Text style={styles.congratsText}>Duration : {duration} seconds</Text>

      <View style={styles.animationContainer}>
        <View style={styles.trophyContainer}>
          <AnimatedIcon
            iconName="trophy"
            iconSize={50}
            iconColor={Colors.success}
          />
        </View>
        <Image style={styles.utTensoSicVis} source={utTensoSicVis} />
      </View>

      <View style={styles.btnTextContainer}>
        <ButtonText
          onPress={closeChallenge}
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

export default ChallengeResultSummary;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  congratsText: {
    color: Colors.darkTextColor,
    fontSize: 22,
    margin: 10,
  },
  animationContainer: {
    margin: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  trophyContainer: {
    marginTop: 52,
    position: "absolute",
  },
  utTensoSicVis: {},
  btnTextContainer: {},
});
