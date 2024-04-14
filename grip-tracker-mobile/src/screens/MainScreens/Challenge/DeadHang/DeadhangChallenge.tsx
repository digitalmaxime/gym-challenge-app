import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useUserContext } from "../../../../contexts/UserContext";
import * as Controller from "controller";
import Colors from "../../../../constants/styles";
import CheckBtnComponent from "../../../../components/basics/btn/CheckBtnComponent";
import NumericInputDuration from "../../../../components/basics/numericInputs/NumericInputDuration";
import { IconBtn } from "../../../../components/basics/btn/IconButton";
import { ChallengeModel } from "../../../../models/challenge/ChallengeModel";
import { TextButton } from "../../../../components/basics/btn/TextButton";
import { POUNDS_KILOS_RATIO } from "../../../../components/basics/numericInputs/NumericInputWeight";
import { Button } from "react-native-paper";

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

      <View style ={{flexDirection: 'row-reverse', width: "100%",justifyContent: "space-around"}}>
        <Button
          mode="contained"
          disabled={durationInSeconds <= 0}
          onPress={() => {
            try {
              const payload = {
                challengeId: deadhangChallenge.id,
                duration: durationInSeconds,
                weight: deadhangChallenge.weight!,
              } as ChallengeProgressModel;

              Controller.saveChallengeProgress(payload);

              user.SyncUserChallengeProgresses();

              navigation.goBack();

              setTimeout(() => {
                navigation.navigate("ChallengeResultSummary", {
                  ...deadhangChallenge,
                  duration: durationInSeconds,
                });
              }, 300);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Done
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => navigation.goBack()}
          textColor={Colors.cancel}
        >
          cancel
        </Button>
      </View>
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
