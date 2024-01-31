import * as React from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ButtonText } from "../../../components/basics/btn/textButton";
import { GripTypeEnum } from "../../../models/grip/GripTypeEnum";

export interface PinchScreenProps {}
type RootStackParamList = Record<string, Record<string, never>>;

class GripTypeModel {
  constructor(name: string, index: number) {
    this.name = name;
    this.id = index;
  }

  id: number = 0;
  name: string;
}

export function GripChallengeSelectionScreen(props: PinchScreenProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const allGripTypes = Object.keys(GripTypeEnum).map(
    (x, index) => new GripTypeModel(x, index)
  );

  const renderGripTypes = (itemData: any) => {
    const gripType = itemData.item as GripTypeModel;
    return (
      <View style={styles.practiceButton}>
          <ButtonText
          onPress={() => {
            navigation.navigate(`${gripType.name}SelectionStack`, {});
          } }
          textContent={gripType.name}
          disabled={false}    
          />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.bannerImage}
          source={require("../../../../assets/images/forge.png")}
        />
      </View>

      {/* grip types */}
      <View style={styles.flatListContainer}>
        <FlatList
          data={allGripTypes}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          bounces={false}
          renderItem={renderGripTypes}
          showsVerticalScrollIndicator={true}
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
    height: 80,
    padding: 0,
    margin: 0,
  },
  practiceButton: {
    margin: 10,
    height: 100,
  },
});
