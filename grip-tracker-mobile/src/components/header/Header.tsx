import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Colors from '../../constants/styles';

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Image
          style={styles.logo}
          source={require("../../../assets/Nikita-icon.png")}
        />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.headerStyleBackgroundColor,
  },
  logo: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "yellow",
    width: 90,
    height: 70,
    padding: 0,
    margin: 0,
  },
});
