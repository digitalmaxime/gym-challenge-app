/* eslint-disable no-unused-expressions */
import React, { useRef, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Animated, Pressable } from 'react-native';
import Colors from '../../constants/styles';

interface ButtonTextProps {
  onPress: () => boolean;
  textContent: string;
  btnHeight: number;
  btnWidth: number;
  btnImgBackgroundColor: string;
  disabled: boolean;
}
function CheckAnswerAnimatedBtn({
  textContent,
  onPress,
  btnHeight,
  btnWidth,
  btnImgBackgroundColor,
  disabled,
}: ButtonTextProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const [btnClicked, setBtnClicked] = useState(false);
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.1,
        useNativeDriver: true,
        duration: 100,
      }),
      Animated.timing(scale, {
        toValue: 1,
        useNativeDriver: true,
        duration: 150,
      }),
      Animated.timing(scale, {
        toValue: 1.05,
        useNativeDriver: true,
        duration: 40,
      }),
      Animated.timing(scale, {
        toValue: 1,
        useNativeDriver: true,
        duration: 60,
      }),
    ]).start();
  }, [btnClicked]);

  return (
    <Pressable
      disabled={disabled}
      android_ripple={{ color: '#ccc' }}
      style={({ pressed }) =>
        pressed ? [styles.btnPressed, styles.btn] : styles.btn
      }
      onPress={() => {
        const answerCorrectlyAnswered = onPress();
        if (answerCorrectlyAnswered) {
          setBtnClicked(!btnClicked);
        }
      }}
    >
      <Animated.View style={[{ transform: [{ scale }] }]}>
        <View
          style={[
            styles.textContainer,
            {
              height: btnHeight,
              width: btnWidth,
              backgroundColor: btnImgBackgroundColor,
              opacity: disabled ? 0.5 : 1,
              borderWidth: disabled ? 0 : 2,
              borderColor: disabled ? '' : Colors.btnCheckBorderColor,
            },
          ]}
        >
          <Text style={styles.text}>{textContent}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

export default CheckAnswerAnimatedBtn;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    overflow: 'hidden',
    padding: 0,
    margin: 8,
    textAlign: 'center',
    alignItem: 'center',
    justifyContent: 'center',
  },
  btn: {
    textAlign: 'center',
    alignItem: 'center',
    justifyContent: 'center',
    elevation: 3,

    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    margin: 0,
  },
  btnPressed: { opacity: 0.5 },
  imageContainer: {
    textAlign: 'center',
    alignItem: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mediumOpacity,
    borderWidth: Colors.btnImgBorderWidth,
    borderColor: Colors.btnImgBorderColor,
    borderRadius: 20,
    overflow: 'hidden',
  },
  iconContainer: {
    textAlign: 'center',
    alignItem: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mediumOpacity,
    borderRadius: 6,
  },
  textContainer: {
    textAlign: 'center',
    alignItem: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.btnTextBackgroundColor,
    borderColor: Colors.btnImgBorderColor,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    textAlign: 'center',
    color: Colors.textColor,
    fontSize: 18,
    fontWeight: 'normal',
  },
});
