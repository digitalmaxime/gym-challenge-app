/* eslint-disable no-unused-expressions */
import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface animatedIconProps {
    iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'],
  iconSize: number,
  iconColor: string
}
function AnimatedIcon({
  iconName,
  iconSize,
  iconColor,
}: animatedIconProps) {
  const progress = useRef(new Animated.Value(0.5)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(progress, { toValue: 0.5, useNativeDriver: true }),
          Animated.timing(progress, { toValue: 1, useNativeDriver: true }),
          Animated.timing(progress, { toValue: 0.5, useNativeDriver: true }),
          Animated.timing(progress, { toValue: 1, useNativeDriver: true }),
          Animated.timing(progress, { toValue: 0.5, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.spring(scale, { toValue: 1.1, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
        ]),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View style={
              [
                {
                  transform: [
                    { scale },
                    {
                      rotate: progress.interpolate(
                        {
                          inputRange: [0.5, 1],
                          outputRange: [`${1.7 * Math.PI}rad`, `${1.8 * Math.PI}rad`],
                        },
                      ),
                    },
                  ],
                },
              ]
          }
    >
      <View>
        <MaterialCommunityIcons
          style={{ alignSelf: 'center' }}
          name={iconName}
          size={iconSize}
          color={iconColor}
        />
      </View>
    </Animated.View>
  );
}

export default AnimatedIcon;
