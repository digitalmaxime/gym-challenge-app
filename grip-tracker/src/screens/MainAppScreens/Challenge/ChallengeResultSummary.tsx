import React, { Dispatch, useState } from 'react';
import { StyleSheet, View, Modal, Text, Image, SafeAreaView } from 'react-native';
import { ButtonText } from '../../../components/basics/Buttons';
import Colors from '../../../constants/styles';
import AnimatedIcon from '../../../components/basics/IconAnimated';
import { useUserContext } from '../../../contexts/UserContext';

const utTensoSicVis = require('../../../../assets/images/ut-tenso-sic-vis.png');

interface FinishedLessonModalProps {
  resetChallenge: Dispatch<React.SetStateAction<void>>;
}

function ChallengeResultSummary() {
  // const userContext = useUserContext();
  // const [isClosingLesson, setIsClosingLesson] = useState(false);

  function closeChallenge() {
    console.log('Close challenge');
  }

  return (
    <View>
      <View style={styles.mainContainer}>
        <Text style={styles.congratsText}>
          Bravo!
        </Text>

        <Text style={styles.congratsText}>Vous avez réussi!</Text>

        <View style={styles.animationContainer}>
          <View style={styles.beeContainer}>
            <AnimatedIcon
              iconName="bee"
              iconSize={50}
              iconColor={Colors.polyOrange}
            />
          </View>
          <Image style={styles.utTensoSicVis} source={utTensoSicVis} />
        </View>

        <View style={styles.btnTextContainer}>
          <ButtonText
            onPress={closeChallenge}
            textContent="Terminer"
            btnHeight={60}
            btnWidth={200}
            btnImgBackgroundColor={Colors.success}
            padding={0}
            disabled={false}
          />
        </View>
      </View>
    </View>
  );
}

export default ChallengeResultSummary;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.lessonBackgroundColor,
  },
  congratsText: {
    color: Colors.darkTextColor,
    fontSize: 18,
    marginTop: 50,
  },
  animationContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  beeContainer: {
    marginTop: 52,
    position: 'absolute',
  },
  utTensoSicVis: {},
  btnTextContainer: { marginTop: 10 },
});
