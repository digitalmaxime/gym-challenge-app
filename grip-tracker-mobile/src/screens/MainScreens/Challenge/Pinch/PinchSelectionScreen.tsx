import * as React from "react";
import { View, FlatList, StyleSheet, ImageBackground } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as Controller from "../../../../api/controller";
import { GripModel } from "../../../../models/grip/GripModel";
import { ButtonText } from "../../../../components/basics/btn/textButton";

export interface PinchSelectionScreenProps {}

type RootStackParamList = {
  PinchChallenge: GripModel;
};

export function PinchSelectionScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [allPinches, setAllPinches] = React.useState<GripModel[]>([]);

  React.useEffect(() => {
    const getPinchGrips = async () => {
      const allGrips = (await Controller.getFilteredGrips("pinch"))
        .data as GripModel[];
      console.log(allGrips);
      setAllPinches((_) => allGrips);
    };

    getPinchGrips();
  }, []);

  function renderPinchOptions(itemData: any) {
    const pinch = itemData.item as GripModel;
    return (
      <ImageBackground
      source={{ uri: 'https://loremflickr.com/640/360' }} 
        style={styles.btnContainer}
      >
        <ButtonText
          onPress={() => {
            navigation.navigate("PinchChallenge", {
              id: pinch.id,
              gripType: pinch.gripType,
              subGripType: pinch.subGripType,
            });
          }}
          textContent={pinch.subGripType}
          disabled={false}
          btnBackgroundColor="rgba(44, 44, 44, 0.4)"
          height="100%"
          width='100%'
          padding={10}
          textColor="#fff"
        />
      </ImageBackground>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={allPinches}
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
    padding: 35,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    overflow: "hidden",
    margin: 15,
  },
});
