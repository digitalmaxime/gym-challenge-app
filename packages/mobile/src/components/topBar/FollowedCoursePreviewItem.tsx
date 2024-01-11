/* eslint-disable max-len */
import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Models

// Styles
import Colors from '../../constants/styles';
import { useCoursesContext } from '../../contexts/CoursesContext';
import { ButtonIcon } from '../basics/Buttons';
import CoursePreview from '../../models/course/CoursePreview';

type RootStackParamList = {
  CourseDetailsScreen: { coursePreview: CoursePreview };
};

interface CourseIconItemProps {
  coursePreview: CoursePreview;
  closeCoursesOverview: () => void;
  setShowWarning: Dispatch<SetStateAction<boolean>>;
  setCourseToUnfollow: Dispatch<SetStateAction<CoursePreview | undefined>>;
}

function FollowedCoursePreviewItem({ coursePreview, closeCoursesOverview, setShowWarning, setCourseToUnfollow }: CourseIconItemProps) {
  const coursesContext = useCoursesContext();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Card
      elevation={6}
      style={{
        backgroundColor: Colors.cardBackgroundColor, width: 140, marginRight: 8,
      }}
    >
      <TouchableOpacity
        onPress={async () => {
          coursesContext.selectCourse(coursePreview.id);
          closeCoursesOverview();
        }}
      >
        <Card.Title
          title={coursePreview.courseNumber}
          titleStyle={styles.title}
          subtitle={coursePreview.courseTitle}
          subtitleStyle={styles.detailText}
        />

        <Image
          source={{ uri: coursePreview.imageUrl, cache: 'force-cache' }}
          style={{ height: 64, width: 140 }}
        />

      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <ButtonIcon
          onPress={() => {
            closeCoursesOverview();
            navigation.navigate('CourseDetailsScreen', { coursePreview });
          }}
          iconName="information"
          iconSize={20}
          btnSize={40}
          color={Colors.activeIcon}
          btnBackgroundColor={Colors.littleOpacity}
          disabled={false}
        />
        <ButtonIcon
          onPress={() => {
            setShowWarning(true);
            setCourseToUnfollow(coursePreview);
          }}
          iconName="minus"
          iconSize={20}
          btnSize={40}
          color={Colors.activeIcon}
          btnBackgroundColor={Colors.littleOpacity}
          disabled={false}
        />
      </View>
    </Card>
  );
}

export default FollowedCoursePreviewItem;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    margin: 0,
  },
  detailText: {
    fontSize: 10,
    textAlign: 'center',
  },
  image: { height: 70 },
  iconContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 0,
    margin: 0,
  },
});
