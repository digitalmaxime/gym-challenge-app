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
import * as Controller from '../../../../api/controller';
import { GripModel } from '../../../../models/grip/GripModel';
import Colors from '../../../../constants/styles';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PinchSelectionScreenProps {}

type RootStackParamList = {
  PinchChallenge: GripModel;
};

export function PinchSelectionScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [allPinches, setAllPinches] = React.useState<any[]>([]);

  React.useEffect(() => {
    const getPinchGrips = async () => {
      const allGrips = (await Controller.getFilteredGrips("pinch")).data as any[];
      console.log(allGrips);
      setAllPinches((_) => allGrips);
    };

    getPinchGrips();
  }, []);

  function renderPinchOptions(itemData: any) {
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
            navigation.navigate('PinchChallenge', {
              id: pinch.id, gripType: pinch.gripType, subGripType: pinch.subGripType,
            });
          }}
        >
          <View
            style={[styles.imageContainer, { width: '100%', height: 'auto' }]}
          >
            <ImageBackground
              resizeMode="cover"
              style={styles.pinchBackgroundImage}
              source={require(`../../../../../assets/images/${imgName}`)}
            >
              <Text style={styles.title}>{pinch.subGripType}</Text>
            </ImageBackground>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={allPinches}
        keyExtractor={item => item.id}
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
  title: {
    color: 'pink',
    fontSize: 46,
  },
});
