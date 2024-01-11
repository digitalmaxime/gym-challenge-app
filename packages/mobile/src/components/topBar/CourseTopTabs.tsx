/* eslint-disable max-len */
/** dummy comment test */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

// Components
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  ButtonImg,
  ButtonIcon,
} from '../basics/Buttons';
import FollowedCoursesModal from './FollowedCoursesModal';
// Styles
import Colors from '../../constants/styles';
import { Size } from '../../constants/size';
// Context
import { useCoursesContext } from '../../contexts/CoursesContext';
import { useUserContext } from '../../contexts/UserContext';

type RootStackParamList = Record<string, Record<string, never>>;

export default function CourseTopTabs() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const coursesContext = useCoursesContext();
  const userContext = useUserContext();
  const [isCoursesOverviewExpanded, setIsCoursesOverviewExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>

        {/* Top add new class icon */}
        <ButtonIcon
          btnSize={40}
          onPress={async () => {
            await coursesContext.fetchAllCoursesPreview();
            navigation.navigate('SearchCoursesScreen', {});
          }}
          iconName="plus"
          iconSize={35}
          color={Colors.activeIcon}
          btnBackgroundColor={Colors.mediumOpacity}
          disabled={false}
        />

        {/* Top current course icon */}
        {coursesContext.followedCoursesPreview?.length > 0 && (
        <ButtonImg
          onPress={() => setIsCoursesOverviewExpanded(!isCoursesOverviewExpanded)}
          imageUri={coursesContext.followedCoursesPreview.find(c => c.id === coursesContext?.currentCourse?.id)?.imageUrl}
          size={48}
        />
        )}

        <View style={styles.courseTitleAndScoreContainer}>
          {coursesContext.currentCourse?.courseNumber && (
          <View style={styles.courseTitleAndScoreContent}>

            {/* Top Course Number */}
            <View>
              <Text style={styles.courseTitle}>
                {coursesContext.currentCourse?.courseNumber}
              </Text>
            </View>

            {/* Top Score info */}
            {userContext.currentCourseProgress?.userScore !== undefined && (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.scoreGem}>{userContext.currentCourseProgress?.userScore} {'\u{1F48E}'}
              </Text>
            </View>
            )}
          </View>
          )}
        </View>

      </View>

      {/* List of followed courses */}
      <FollowedCoursesModal
        isCoursesOverviewExpanded={isCoursesOverviewExpanded}
        setCoursesOverviewExpanded={setIsCoursesOverviewExpanded}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    marginBottom: 2,
    borderBottomWidth: 2,
    borderColor: Colors.topBorderSeparator,
  },
  topBarContainer: {
    height: Size.topBarHeight,
    flexDirection: 'row',
    backgroundColor: Colors.topNavBarColor,
    width: '100%',
    padding: 3,
    alignItems: 'center',
  },
  coursesOverview: {
    height: 240,
    backgroundColor: Colors.coursesOverviewBackgroundColor,
    justifyContent: 'center',
  },
  courseCard: {
    padding: 2,
    alignItems: 'center',
  },
  courseTitleAndScoreContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  courseTitleAndScoreContent: {
    alignItems: 'center',
    margin: 3,
    padding: 8,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.07)',
    flexDirection: 'row',
  },
  courseTitle: {
    color: Colors.textColor,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  scoreGem: {
    color: Colors.textColor,
    margin: 2,
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
