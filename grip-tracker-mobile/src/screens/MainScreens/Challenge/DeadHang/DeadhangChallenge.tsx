import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useUserContext } from "../../../../contexts/UserContext";
import * as Controller from "../../../../api/controller";
import Colors from "../../../../constants/styles";
import CheckBtnComponent from "../../../../components/basics/btn/CheckBtnComponent";
import NumericInputDuration from "../../../../components/basics/numericInputs/NumericInputDuration";
import { IconBtn } from "../../../../components/basics/btn/iconButton";
import { ChallengeModel } from "../../../../models/challenge/ChallengeModel";
import { TextButton } from "../../../../components/basics/btn/textButton";
import { POUNDS_KILOS_RATIO } from "../../../../components/basics/numericInputs/NumericInputWeight";

type pathParam = {
  deadhangChallenge: ChallengeModel;
};

type RootStackParamList = {
  ChallengeResultSummary: ChallengeModel;
};

const DeadhangChallenge = () => {
  const user = useUserContext();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<pathParam>>();

  const [durationInSeconds, setDurationInSeconds] = React.useState(0);

  const deadhangChallenge = route.params;

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.challengeTitle}>{deadhangChallenge.name}</Text>

      <NumericInputDuration onChange={setDurationInSeconds} />

      <Text></Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        <View>
          <IconBtn
            iconName="weight-kilogram"
            iconSize={50}
            iconColor={Colors.Kilos}
            onPress={() => {}}
            disabled={false}
          />
          <Text>{deadhangChallenge.weight}</Text>
        </View>
        <View>
          <IconBtn
            iconName="weight-pound"
            iconSize={50}
            iconColor={Colors.Pounds}
            onPress={() => {}}
            disabled={false}
          />
          <Text>{deadhangChallenge.weight! * POUNDS_KILOS_RATIO}</Text>
        </View>
      </View>

      <CheckBtnComponent
        handleCheckPress={() => true}
        saveData={() => {
          Controller.saveChallengeResult(
            user.userData.id,
            deadhangChallenge.id,
            deadhangChallenge.weight!,
            durationInSeconds
          );
          try {
            navigation.goBack();
            setTimeout(() => {
              navigation.navigate("ChallengeResultSummary", {
                ...deadhangChallenge,
                duration: durationInSeconds,
              });
            }, 400);
          } catch (error) {
            console.log(":(");
            console.log(error);
          }
        }}
      />

      <TextButton
        onPress={function (): void {
          navigation.goBack();
        }}
        textContent={"Cancel"}
        disabled={false}
      />
    </View>
  );
};

export default DeadhangChallenge;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
    padding: 30,
    flexDirection: "column",
  },
  challengeTitle: {
    color: Colors.textColor,
    fontSize: 36,
    margin: 30,
  },
});
