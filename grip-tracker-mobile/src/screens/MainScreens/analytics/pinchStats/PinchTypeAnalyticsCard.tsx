import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import DetailedPinchAnalyticsModal from "./DetailedPinchAnalyticsModal";
import { useState } from "react";
import { useChallengeContext } from "../../../../contexts/ChallengeContext";

interface PinchTypeAnalyticsCardProps {
  challengeProgresses: ChallengeProgressModel[];
}
type RootStackParamList = {
  DetailedPinchAnalytics: any;
};

const PinchTypeAnalyticsCard = ({
  challengeProgresses,
}: PinchTypeAnalyticsCardProps) => {
  const challenge = useChallengeContext().allChallenges.filter(
    (x) => x.id === challengeProgresses[0]?.challengeId
  )[0];

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);

  const LeftContent = (props: any) => <Avatar.Icon {...props} icon="fire" />;

  return (
    <View style={styles.container}>
      <Card
        onPress={() => {
          setModalVisible(true);
        }}
        elevation={1}
      >
        <Card.Title
        titleVariant="titleMedium"
          title={challenge?.name || "not found.."}
          subtitle="Card Subtitle"
          left={LeftContent}
        />
        <Card.Content>
          {/* <Text variant="titleLarge">{challenge?.name}</Text> */}
          <Text variant="bodyMedium">
            max weight :{" "}
            {Math.max( ...challengeProgresses.map(x => x.weight) )}
          </Text>
          <Text variant="bodyMedium">
            last weight :{" "}
            {challengeProgresses[challengeProgresses.length - 1].weight}
          </Text>
          <Text variant="bodyMedium">weight / body ratio : </Text>
        </Card.Content>
        <Card.Cover style={{margin: 5, resizeMode: "cover", opacity: 0.2, height: 60, borderRadius: 0}} source={{ uri: challenge.imgUri }} />
        <Card.Actions>
          {/* <Button>Cancel</Button> */}
          <Button onPress={() => console.log("sdf")}>view</Button>
        </Card.Actions>
      </Card>
      <DetailedPinchAnalyticsModal
        toggleModal={toggleModal}
        modalVisible={modalVisible}
        challenge={challenge}
        challengeProgresses={challengeProgresses}
      />
    </View>
  );
};

export default PinchTypeAnalyticsCard;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: "black",
    // backgroundColor: "#F8F",
    margin: 15,
    // flex: 1,
    // flexDirection: "row",
    // alignItems: "flex-start",
    width: "80%",
    // justifyContent: "flex-start"
  },
});
