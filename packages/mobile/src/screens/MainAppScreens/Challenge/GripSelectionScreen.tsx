import * as React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import {
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { useUserContext } from '../../../contexts/UserContext';
import { ButtonText } from '../../../components/basics/Buttons';
import Colors from '../../../constants/styles';
import PinchSelectionModal from '../../../components/gripChallenges/pinchSelection/PinchSelection';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PinchScreenProps {}
type RootStackParamList = Record<string, Record<string, never>>;

export function GripSelectionScreen(props: PinchScreenProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.bannerImage}
          source={require('../../../../assets/images/forge.png')}
        />
        <Text style={styles.sectionTitle}>
          C&apos;est en forgeant {'\n'}qu&apos; on devient forgeron
        </Text>
      </View>

      {/* grip types */}
      <View style={styles.practiceButton}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
          }}
        >
          <ButtonText
            onPress={() => {
              // navigation.goBack();
              navigation.navigate('DeadhangSelectionScreen', {});
            }}
            textContent="DeadhangSelectionScreen"
            btnImgBackgroundColor={Colors.bottomNavBarColor}
            btnHeight={undefined}
            btnWidth={150}
            padding={14}
            disabled={false}
          />
        </View>
      </View>

      <ButtonText
        onPress={() => {
          navigation.navigate('PinchSelectionStack', {});
        }}
        textContent="PinchSelectionStack"
        btnImgBackgroundColor={Colors.bottomNavBarColor}
        btnHeight={undefined}
        btnWidth={150}
        padding={14}
        disabled={false}
      />

      <ButtonText
        onPress={() => {
          navigation.navigate('CrimpSelectionScreen', {});
        }}
        textContent="CrimpSelectionScreen"
        btnImgBackgroundColor={Colors.bottomNavBarColor}
        btnHeight={undefined}
        btnWidth={150}
        padding={14}
        disabled={false}
      />
    </View>
  );
}

export default GripSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.coursesBackgroundColor,
  },
  header: {
    height: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    position: 'absolute',
    width: 300,
    top: 175,
    fontSize: 20,
    color: 'rgba(0,0,0,0.7)',
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Papyrus',
    textAlign: 'center',
  },
  bannerImage: {
    width: 100,
    height: 80,
    padding: 0,
    margin: 0,
  },
  practiceButton: {
    margin: 30,
    width: '80%',
    height: 100,
    borderWidth: 4,
    borderColor: Colors.bottomBorderSeparator,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
