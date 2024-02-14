import * as React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import * as Controller from "../../../../api/controller";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ChallengeModel } from "../../../../models/challenge/ChallengeModel";
import { GripTypeEnum } from "../../../../models/grip/GripTypeEnum";
import ChallengeSelectionCard from "../../../../components/challenge/ChallengeSelectionCard";
import { useState } from "react";

export interface DeadhangSelectionProps {}

type RootStackParamList = {
  DeadhangChallenge: ChallengeModel;
};

export function DeadhangSelectionScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [allDeadhangChallenges, setAllDeadhangChallenges] = useState<any[]>([]);

  React.useEffect(() => {
    const getDeadhangChallenges = async () => {
      const filteredChallenges = (
        await Controller.getFilteredChallenges(GripTypeEnum.Deadhang)
      ).data as ChallengeModel[];
      filteredChallenges.sort((a, b) => a.weight! - b.weight!);
      setAllDeadhangChallenges((_) => filteredChallenges);
    };

    getDeadhangChallenges();
  }, []);

  const navigateToChallenge = (deadhangChallenge: ChallengeModel) => {
    navigation.navigate("DeadhangChallenge", deadhangChallenge);
  };

  function renderDeadhangOptions(itemData: any) {
    const deadhangChallenge = itemData.item as ChallengeModel;
    return (
      <ChallengeSelectionCard
        challenge={deadhangChallenge}
        onPress={() => navigateToChallenge(deadhangChallenge)}
      />
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={allDeadhangChallenges}
        keyExtractor={(item) => item.id}
        numColumns={1}
        bounces={false}
        renderItem={renderDeadhangOptions}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'yellow',
  },
});
