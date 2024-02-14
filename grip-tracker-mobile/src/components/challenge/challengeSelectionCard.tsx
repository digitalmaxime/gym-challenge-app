import * as React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { TextButton } from "../basics/btn/TextButton";
import { ChallengeModel } from "../../models/challenge/ChallengeModel";

interface ChallengeSelectionCardProps {
  challenge: ChallengeModel;
  onPress: () => void;
}

const ChallengeSelectionCard = ({
  challenge,
  onPress,
}: ChallengeSelectionCardProps) => {
    
  return (
    <ImageBackground
      resizeMode="cover" // contain, cover, center
      source={{
        uri: challenge?.imgUri,
      }}
      style={styles.backgroundImage}
    >
      <TextButton
        onPress={onPress}
        textContent={challenge?.name}
        disabled={false}
        btnBackgroundColor="rgba(44, 44, 44, 0.4)"
        height="100%"
        width="100%"
        padding={10}
        textColor="#fff"
      />
    </ImageBackground>
  );
};

export default ChallengeSelectionCard;

const styles = StyleSheet.create({
  backgroundImage: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    overflow: "hidden",
    margin: 15,
    height: 160,
    width: 200,
  },
});
