import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ChallengeResultSummaryModal from '../../../components/gripChallenges/ChallengeResultSummaryModal';
import PinchChallengeObsolete from '../../../components/gripChallenges/pinchSelection/PinchChallengeObsolete';
import Colors from '../../../constants/styles';

export interface PinchSelectionScreenProps {}

type RootStackParamList = Record<string, Record<string, never>>;

export function PinchSelectionScreen(props: PinchSelectionScreenProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.buttonOuterContainer}>
        <Pressable
          android_ripple={{ color: '#ccc', borderless: true }}
          style={({ pressed }) =>
            pressed ? [styles.btnPressed, styles.btn] : styles.btn
          }
          onPress={() => navigation.navigate('PinchChallenge', {})}
        >
          <View
            style={[styles.imageContainer, { width: '100%', height: 'auto' }]}
          >
            <ImageBackground
              resizeMode="cover"
              style={styles.pinchBackgroundImage}
              source={require('../../../../assets/images/pinch_wide_shallow.png')}
            >
              <Text style={styles.pinchTitle}>Wide pinch</Text>
            </ImageBackground>
          </View>
        </Pressable>
      </View>
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
