import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/styles';
import AnimatedIcon from './IconAnimated';

interface LoadingOverlayProps {
  message: string;
}

function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <Modal animationType="fade" transparent>
      <View style={styles.container}>
        <AnimatedIcon
          iconName="bee"
          iconColor={Colors.polyOrange}
          iconSize={50}
        />
        <Text style={styles.message}>{message}</Text>
        <Text></Text>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  message: {
    margin: 24,
    fontSize: 24,
    marginBottom: 12,
    color: Colors.textColor,
  },
});
