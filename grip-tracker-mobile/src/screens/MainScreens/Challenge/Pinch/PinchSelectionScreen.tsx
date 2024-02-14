import * as React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as Controller from "../../../../api/controller";
import { GripTypeEnum } from "../../../../models/grip/GripTypeEnum";
import { ChallengeModel } from "../../../../models/challenge/ChallengeModel";
import { useState } from "react";
import ChallengeSelectionCard from "../../../../components/challenge/ChallengeSelectionCard";
import { useChallengeContext } from "../../../../contexts/ChallengeContext";

export interface PinchSelectionScreenProps {}

type RootStackParamList = {
  PinchChallenge: ChallengeModel;
};

export function PinchSelectionScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const challengeCtx = useChallengeContext();

  // const [allPinchChallenges, setAllPinchChallenges] = useState<ChallengeModel[]>([]);

  // React.useEffect(() => {
  //   const getPinchChallenges = async () => {
  //     const filteredChallenges = (
  //       await Controller.getFilteredChallenges(GripTypeEnum.Pinch)
  //     ).data as ChallengeModel[];

  //     filteredChallenges.sort((a, b) => a.duration! - b.duration!);

  //     setAllPinchChallenges((_) => filteredChallenges);
  //   };

  //   getPinchChallenges();
  // }, []);


  const navigateToChallenge = (pinchChallenge: ChallengeModel) => {
    navigation.navigate("PinchChallenge", pinchChallenge);
  };

  function renderPinchOptions(itemData: any) {
    const pinchChallenge = itemData.item as ChallengeModel;
    return (
      <ChallengeSelectionCard
        challenge={pinchChallenge}
        onPress={() => navigateToChallenge(pinchChallenge)}
      />
      
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={challengeCtx.challengeDictionary.pinch}
        keyExtractor={(item) => item.id}
        numColumns={1}
        bounces={false}
        renderItem={renderPinchOptions}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    // justifyContent: "space-evenly",

        // backgroundColor: 'yellow',

  },
  // btnContainer: {
  //   justifyContent: "center",
  //   textAlign: "center",
  //   alignItems: "center",
  //   overflow: "hidden",
  //   margin: 15,
  // },
});
