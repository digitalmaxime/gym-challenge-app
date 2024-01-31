import React, { Dispatch } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { ButtonText } from "../../../components/basics/btn/textButton";
import Colors from "../../../constants/styles";
import AnimatedIcon from "../../../components/basics/btn/animatedIcon";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const utTensoSicVis = require("../../../../assets/images/ut-tenso-sic-vis.png");

type RootStackParamList = Record<string, Record<string, never>>;

function ChallengeResultSummary() {
  // const userContext = useUserContext();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function closeChallenge() {
    navigation.goBack();
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.congratsText}>Bravo!</Text>

      <Text style={styles.congratsText}>You did it!</Text>

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
    fontSize: 18,
    margin: 30,
  },
  animationContainer: {
    margin: 10,
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
