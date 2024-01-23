/* eslint-disable max-len */
import React from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Styles
import Colors from '../../constants/styles';

interface ButtonImagProps {
  onPress: () => void;
  imageUri: string | undefined;
  size: number;
}

export function ButtonImg({ onPress, imageUri, size }: ButtonImagProps) {
  return (
    <>
      {imageUri && (
        <View style={styles.buttonOuterContainer}>
          <Pressable
            android_ripple={{ color: '#ccc', borderless: true }}
            style={({ pressed }) =>
              pressed
                ? [styles.btnPressed, styles.btn]
                : [styles.btn, styles.shadow1]
            }
            onPress={onPress}
          >
            <View
              style={[styles.imageContainer, { width: size, height: size }]}
            >
              <Image style={styles.image} source={{ uri: imageUri }} />
            </View>
          </Pressable>
        </View>
      )}
      {!imageUri && (
        <View style={styles.buttonOuterContainer}>
          <Pressable
            android_ripple={{ color: '#ccc', borderless: true }}
            style={({ pressed }) =>
              pressed ? [styles.btnPressed, styles.btn] : styles.btn
            }
            onPress={onPress}
          >
            <View
              style={[styles.imageContainer, { width: size, height: size }]}
            >
              <Image
                style={[
                  styles.image,
                  { backgroundColor: 'rgba(250, 222, 100, 0.5)' },
                ]}
                source={require('../../../assets/images/blurry4.jpeg')}
              />
            </View>
          </Pressable>
        </View>
      )}
    </>
  );
}

interface ButtonIconProps {
  onPress: () => void;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  iconSize: number;
  btnSize: number;
  color: string;
  btnBackgroundColor: string;
  disabled: boolean;
}

export function ButtonIcon({
  onPress,
  iconName,
  iconSize,
  btnSize,
  color,
  btnBackgroundColor,
  disabled,
}: ButtonIconProps) {
  return (
    <View style={[styles.buttonOuterContainer]}>
      <Pressable
        disabled={disabled}
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) =>
          pressed
            ? [styles.btnPressed, styles.btn]
            : [styles.btn, styles.shadow2]
        }
        onPress={onPress}
      >
        <View
          style={[
            styles.iconContainer,
            {
              width: btnSize,
              height: btnSize,
              backgroundColor: btnBackgroundColor,
            },
          ]}
        >
          <MaterialCommunityIcons
            style={{ alignSelf: 'center' }}
            name={iconName}
            size={iconSize}
            color={color}
          />
        </View>
      </Pressable>
    </View>
  );
}

interface ButtonTextProps {
  onPress: () => void;
  textContent: string;
  btnHeight: number | undefined;
  btnWidth: number;
  btnImgBackgroundColor: string;
  padding: number;
  disabled: boolean;
}

export function ButtonText({
  onPress,
  textContent,
  btnHeight,
  btnWidth,
  btnImgBackgroundColor,
  padding,
  disabled,
}: ButtonTextProps) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        disabled={disabled}
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) =>
          pressed
            ? [styles.btnPressed, styles.btn]
            : [styles.btn, styles.shadow1]
        }
        onPress={onPress}
      >
        <View
          style={[
            styles.textContainer,
            {
              height: btnHeight,
              width: btnWidth,
              backgroundColor: btnImgBackgroundColor,
              padding,
            },
          ]}
        >
          <Text style={[styles.text]}>{textContent}</Text>
        </View>
      </Pressable>
    </View>
  );
}

interface ButtonQuestionTextProps {
  onPress: () => void;
  textContent: string;
  textFontSize: number;
  btnHeight: number | undefined;
  btnWidth: number;
  btnImgBackgroundColor: string;
  padding: number;
  disabled: boolean;
}

export function ButtonQuestionText({
  onPress,
  textContent,
  textFontSize,
  btnHeight,
  btnWidth,
  btnImgBackgroundColor,
  padding,
  disabled,
}: ButtonQuestionTextProps) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        disabled={disabled}
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) =>
          pressed
            ? [styles.btnPressed, styles.btn]
            : [styles.btn, styles.shadow1]
        }
        onPress={onPress}
      >
        <View
          style={[
            styles.textContainer,
            {
              height: btnHeight,
              width: btnWidth,
              backgroundColor: btnImgBackgroundColor,
              padding,
            },
          ]}
        >
          <Text style={[styles.text, { fontSize: textFontSize }]}>
            {textContent}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    overflow: 'hidden',
    textAlign: 'center',
    alignItem: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 8,
    borderRadius: 5,
  },
  btn: {
    borderRadius: 5,
    textAlign: 'center',
    alignItem: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  shadow1: {
    elevation: 3,

    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
  },
  shadow2: {
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  btnPressed: { opacity: 0.5 },
  imageContainer: {
    textAlign: 'center',
    alignItem: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mediumOpacity,
    borderRadius: 22,
    overflow: 'hidden',
  },
  textPossibleAnswer: {
    textAlign: 'center',
    alignItem: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 5,
  },
  btnPressedPossibleAnswer: { opacity: 0.5 },
  iconContainer: {
    textAlign: 'center',
    alignItem: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textContainer: {
    textAlign: 'center',
    alignItem: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.btnTextBackgroundColor,
    borderColor: Colors.btnImgBorderColor,
    // padding: 10,
    overflow: 'hidden',
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderColor: Colors.btnImgBorderColor,
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.textColor,
    fontSize: 18,
    fontWeight: 'normal',
  },
});
