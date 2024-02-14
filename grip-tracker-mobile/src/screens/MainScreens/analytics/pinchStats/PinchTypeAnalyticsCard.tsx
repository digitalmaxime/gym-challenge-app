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

  

  console.log(challengeProgresses[0]?.weight);

  const timeSortedProgresses = challengeProgresses.sort((a, b) => {
    return new Date(a.timestamp!).getTime() - new Date(b.timestamp!).getTime();
  });

  const weightSortedProgresses = challengeProgresses.sort((a, b) => {
    return new Date(a.weight!).getTime() - new Date(b.weight!).getTime();
  });

  const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

  return (
    <View style={styles.container}>
      <Card
        onPress={() => {
          setModalVisible(true);
        }}
        elevation={1}
      >
        <Card.Title
          title={challenge?.name || "not found.."}
          subtitle="Card Subtitle"
          left={LeftContent}
        />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">
            max weight :{" "}
            {weightSortedProgresses[weightSortedProgresses.length - 1]?.weight}
          </Text>
          <Text variant="bodyMedium">
            last weight :{" "}
            {/* {timeSortedProgresses[timeSortedProgresses.length - 1]?.weight} */}
          </Text>
          <Text variant="bodyMedium">Card content</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
        {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
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
    margin: 10,
    flex: 1,
    // flexDirection: "column",
    // alignItems: "flex-start",
    // width: "100%",
    // justifyContent: "center"
  },
});
