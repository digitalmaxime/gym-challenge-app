import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  FlatList,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ButtonText } from "../../../components/basics/Buttons";
import Colors from "../../../constants/styles";
import { GripTypeEnum } from "../../../models/grip/GripTypeEnum";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
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

export function GripSelectionScreen(props: PinchScreenProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const allGripTypes = Object.keys(GripTypeEnum).map(
    (x, index) => new GripTypeModel(x, index)
  );

  const renderGripTypes = (itemData: any) => {
    const gripType = itemData.item as GripTypeModel;
    return (
      <View style={styles.practiceButton}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
          }}
        >
          <ButtonText
            onPress={() => {
              navigation.navigate(`${gripType.name}SelectionStack`, {});
            }}
            textContent={gripType.name}
            btnImgBackgroundColor={Colors.bottomNavBarColor}
            btnHeight={undefined}
            btnWidth={150}
            padding={14}
            disabled={false}
          />
        </View>
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
      <View style={styles.flatlistContainer}>
        <FlatList
          data={allGripTypes}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          bounces={false}
          renderItem={renderGripTypes}
        />
      </View>
    </View>
  );
}

export default GripSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "blue", //Colors.coursesBackgroundColor,
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  sectionTitle: {
    position: "absolute",
    width: 300,
    top: 175,
    fontSize: 20,
    color: "rgba(0,0,0,0.7)",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Papyrus",
    textAlign: "center",
  },
  flatlistContainer: {
    width: '90%',
    backgroundColor: 'green'
  },
  bannerImage: {
    width: 100,
    height: 80,
    padding: 0,
    margin: 0,
  },
  practiceButton: {
    margin: 30,
    width: "80%",
    height: 100,
    borderWidth: 4,
    borderColor: "pink", // Colors.bottomBorderSeparator,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
