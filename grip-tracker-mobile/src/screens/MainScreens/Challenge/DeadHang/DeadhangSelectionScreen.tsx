import * as React from 'react';
import { View, Text, FlatList, Pressable, ImageBackground, StyleSheet } from 'react-native';
import * as Controller from '../../../../api/controller';
import { GripModel } from '../../../../models/grip/GripModel';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Colors from '../../../../constants/styles';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DeadhangSelectionProps {}

type RootStackParamList = {
  DeadhangChallenge: GripModel;
};
export function DeadhangSelectionScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [allDeadhangs, setAllDeadhangs] = React.useState<any[]>([]);

  React.useEffect(() => {
    const getDeadhangGrips = async () => {
      const allGrips = (await Controller.getFilteredGrips("deadhang")).data as any[];
      console.log(allGrips);
      setAllDeadhangs((_) => allGrips);
    };

    getDeadhangGrips();
  }, []);

  function renderDeadhangOptions(itemData: any) {
    const deadhang = itemData.item as GripModel;
    const imgName2 = `${itemData?.item?.gripType}_${itemData?.item?.subGripType}.png`;
    const imgName = 'deadhang_basic.png';
    return (
      <View style={styles.buttonOuterContainer}>
        <Pressable // TODO: extract
          android_ripple={{ color: '#ccc', borderless: true }}
          style={({ pressed }) =>
            pressed ? [styles.btnPressed, styles.btn] : styles.btn
          }
          onPress={() => {
            navigation.navigate('DeadhangChallenge', {
              id: deadhang.id, gripType: deadhang.gripType, subGripType: deadhang.subGripType,
            });
          }}
        >
          <View
            style={[{ width: '100%', height: 'auto' }]}
          >
            <ImageBackground
              resizeMode="cover"
              style={styles.backgroundImage}
              source={require(`../../../../../assets/images/${imgName}`)}
            >
              <Text style={styles.title}>{deadhang.subGripType}</Text>
            </ImageBackground>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={allDeadhangs}
        keyExtractor={item => item.id}
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
    padding: 45,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
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
