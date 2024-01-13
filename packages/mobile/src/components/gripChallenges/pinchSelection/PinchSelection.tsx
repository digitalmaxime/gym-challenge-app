/* eslint-disable max-len */
import React, { Dispatch, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  SafeAreaView,
  StatusBar,
  Alert,
  ImageBackground,
  Pressable,
  Image,
} from 'react-native';
import NumericInput from 'react-native-numeric-input';

import { ButtonIcon, ButtonImg } from '../../basics/Buttons';
import Colors from '../../../constants/styles';
import ChallengeResultSummaryModal from '../ChallengeResultSummaryModal';
import { useUserContext } from '../../../contexts/UserContext';
import Lesson from '../../../models/course/lesson/Lesson';
import PinchChallengeObsolete from './PinchChallengeObsolete';

interface PinchChallengeModalProps {
  toggleVisibility: Dispatch<React.SetStateAction<boolean>>;
  lesson: Lesson;
}

function PinchSelectionModal({
  toggleVisibility,
  lesson,
}: PinchChallengeModalProps) {
  const userContext = useUserContext();
  const [showFinishChallengeSummary, setShowFinishChallengeSummary] =
    React.useState(false);
  const [hasChallengeStarted, setHasChallengeStarted] =
    useState<boolean>(false);
  const [isCurrentChallengeCompleted, setIsCurrentChallengeCompleted] =
    useState(false);

  function handleCheckPress(): boolean {
    /** Prevent users from selecting other answers during animation */
    return true;
  }

  function finishChallenge(): void {
    setShowFinishChallengeSummary(true);
    setIsCurrentChallengeCompleted(true);
  }

  function resetChallenge(): void {
    setHasChallengeStarted(false);
    setIsCurrentChallengeCompleted(false);
    setShowFinishChallengeSummary(false);
  }

  return (
    <Modal
      visible
      animationType="fade"
      presentationStyle="formSheet"
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        toggleVisibility(false);
      }}
    >
      <SafeAreaView />
      <StatusBar barStyle="default" />
      <View style={styles.mainContainer}>
        <View style={styles.buttonOuterContainer}>
          <Pressable
            android_ripple={{ color: '#ccc', borderless: true }}
            style={({ pressed }) =>
              pressed ? [styles.btnPressed, styles.btn] : styles.btn
            }
            onPress={() => setHasChallengeStarted(true)}
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
                {hasChallengeStarted && !isCurrentChallengeCompleted && (
                  <PinchChallengeObsolete finishChallenge={finishChallenge} />
                )}
              </ImageBackground>
            </View>
          </Pressable>
        </View>

        {showFinishChallengeSummary && (
          <ChallengeResultSummaryModal resetChallenge={resetChallenge} />
        )}
      </View>
    </Modal>
  );
}

// https://www.npmjs.com/package/react-native-numeric-input
// yarn add react-native-numeric-input

export default PinchSelectionModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
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
