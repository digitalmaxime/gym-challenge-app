import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ChallengeResultSummary from '../ChallengeResultSummary';
import PinchChallengeObsolete from '../../../../components/gripChallenges/pinchSelection/PinchChallengeObsolete';
import Colors from '../../../../constants/styles';
import * as Controller from "../../../../controller/controller";
import { GripModel } from '../../../../models/grip/GripModel';

export interface PinchSelectionScreenProps {}

type RootStackParamList = {
  PinchChallenge: GripModel;
};

export function PinchSelectionScreen(props: PinchSelectionScreenProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [allGrips, setAllGrips] = React.useState<any[]>([]);

  React.useEffect(() => {
    const getAllGrips = async () => {
      let allGrips = (await Controller.getAllGrips()).data as any[];
      console.log(allGrips);
      setAllGrips((_) =>[ allGrips[0]]);
    }
    getAllGrips();
  }, [])

  function renderPinchOption(itemData: any) {
    const pinch = itemData.item as GripModel;
    const imgName2 = `${itemData?.item?.gripType}_${itemData?.item?.subGripType}.png`;
    const imgName = 'pinch_wideDeep.png';
    return (
      <View style={styles.buttonOuterContainer}>
        <Pressable
          android_ripple={{ color: '#ccc', borderless: true }}
          style={({ pressed }) =>
            pressed ? [styles.btnPressed, styles.btn] : styles.btn
          }
          onPress={() => {
            // navigation.navigate('PinchChallenge', {pinch : {id: pinch.id, gripType: pinch.gripType, subGripType: pinch.subGripType)}}
            navigation.navigate('PinchChallenge', {id: pinch.id, gripType: pinch.gripType, subGripType: pinch.subGripType})}}
            >
          <View
            style={[styles.imageContainer, { width: '100%', height: 'auto' }]}
          >
            <ImageBackground
              resizeMode="cover"
              style={styles.pinchBackgroundImage}
              source={require(`../../../../../assets/images/${imgName}`)}
            >
              <Text style={styles.pinchTitle}>{pinch.subGripType}</Text>
            </ImageBackground>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={allGrips}
        keyExtractor={item => item.id}
        numColumns={1}
        bounces={false}
        renderItem={renderPinchOption}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 45,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lessonBackgroundColor,
  },
  pinchBackgroundImage: {
    // opacity: 0.1,
    // zIndex: -1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 3,
    borderRadius: 5,
    height: '100%',
  },
  buttonOuterContainer: {
    overflow: 'hidden',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 0,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: 'turquoise',
    width: '100%',
    height: 180,
  },
  btnPressed: { opacity: 0.5 },
  imageContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mediumOpacity,
    borderRadius: 22,
    overflow: 'hidden',
  },
  btn: {
    borderRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  pinchTitle: {
    color: 'pink',
    fontSize: 46,
  },
});
