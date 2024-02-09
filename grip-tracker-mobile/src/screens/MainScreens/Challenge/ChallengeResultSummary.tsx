import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TextButton } from "../../../components/basics/btn/textButton";
import Colors from "../../../constants/styles";
import AnimatedIcon from "../../../components/basics/btn/animatedIcon";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useUserContext } from "../../../contexts/UserContext";
import { ChallengeModel } from "../../../models/challenge/ChallengeModel";

const utTensoSicVis = require("../../../../assets/images/ut-tenso-sic-vis.png");

type pathParam = {
  challenge: ChallengeModel
};

function ChallengeResultSummary() {
  const userContext = useUserContext();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<pathParam>>();
  const challenge = route.params;

  function closeChallenge() {
    navigation.goBack();
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.congratsText}>Bravo {userContext.userData?.userName || userContext.userData?.email}!</Text>

      <Text style={styles.congratsText}>Challenge : {challenge.name} kilos</Text>
      <Text style={styles.congratsText}>Weight : {challenge.weight} kilos</Text>
      <Text style={styles.congratsText}>Duration : {challenge.duration} seconds</Text>

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
        <TextButton
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
