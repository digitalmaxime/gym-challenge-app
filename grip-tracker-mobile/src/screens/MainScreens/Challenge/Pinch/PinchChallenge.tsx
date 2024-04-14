import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import CheckBtnComponent from "../../../../components/basics/btn/CheckBtnComponent";
import * as Controller from "controller";
import { useUserContext } from "../../../../contexts/UserContext";
import NumericInputWeight from "../../../../components/basics/numericInputs/NumericInputWeight";
import { useToast } from "react-native-toast-notifications";
import { ChallengeModel } from "../../../../models/challenge/ChallengeModel";
// import { TextButton } from "../../../../components/basics/btn/TextButton";
import Colors from "../../../../constants/styles";
import { Button } from "react-native-paper";

type pathParam = {
  pinchChallenge: ChallengeModel;
};

type RootStackParamList = {
  ChallengeResultSummary: ChallengeModel;
};

export function PinchChallenge() {
  const user = useUserContext();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<pathParam>>();
  const toast = useToast();

  const [weightInKilos, setWeightInKilos] = React.useState(0);

  const pinchChallenge = route.params;

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.challengeTitle}>{pinchChallenge.name}</Text>

      <NumericInputWeight onChange={setWeightInKilos} />

      <Text>hold {pinchChallenge.duration} seconds</Text>

      <View style ={{flexDirection: 'row-reverse', width: "100%",justifyContent: "space-around"}}>
        <Button
          mode="contained"
          disabled={weightInKilos <= 0}
          onPress={async () => {
            if (user.userData === undefined) {
              toast.show("user disconnected, enable to save your results", {
                type: "warning",
                placement: "top",
                duration: 8000,
                animationType: "zoom-in",
                swipeEnabled: true,
              });
            }
            try {
              const payload = {
                challengeId: pinchChallenge.id,
                duration: pinchChallenge.duration!,
                weight: weightInKilos,
              } as ChallengeProgressModel;

              await Controller.saveChallengeProgress(payload);

              user.SyncUserChallengeProgresses();

              navigation.goBack();

              setTimeout(() => {
                navigation.navigate("ChallengeResultSummary", {
                  ...pinchChallenge,
                  weight: weightInKilos,
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
}

export default PinchChallenge;

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
