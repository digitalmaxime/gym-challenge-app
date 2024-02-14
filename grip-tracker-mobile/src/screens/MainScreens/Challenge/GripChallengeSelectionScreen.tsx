import * as React from "react";
import {
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TextButton } from "../../../components/basics/btn/TextButton";
import { useChallengeContext } from "../../../contexts/ChallengeContext";
import { GripModel } from "../../../models/grip/GripModel";

export interface PinchScreenProps {}

type RootStackParamList = Record<string, Record<string, never>>;

export function GripChallengeSelectionScreen(props: PinchScreenProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const challengeCtx = useChallengeContext();

  const renderGripTypes = (itemData: any) => {
    const grips = itemData.item as [string, GripModel[]];
    const gripType = grips[0];
    const gripModelArray = grips[1];

    const GripName = gripType.charAt(0).toUpperCase() + gripType.slice(1) // TODO: temp
    
    // TODO: create card components and do something like if (type == crimp) content = Jsx.Card
    return (
      <View style={styles.practiceButton}>
          <TextButton
          onPress={() => {
            navigation.navigate(`${GripName}SelectionStack`, {});
          } }
          textContent={gripType}
          disabled={false}    
          />
      </View>
    );
  };

  return (
    <View style={styles.container}>

      {/* grip types */}
      <View style={styles.flatListContainer}>
        <FlatList
          data={Object.entries(challengeCtx.gripDictionary)}
          keyExtractor={(item) => item[0]}
          numColumns={1}
          bounces={false}
          renderItem={renderGripTypes}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

export default GripChallengeSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  flatListContainer: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'green'
  },
  bannerImage: {
    width: 100,
    height: 100,
    padding: 0,
    margin: 0,
  },
  practiceButton: {
    margin: 10,
    height: 100,
  },
});
