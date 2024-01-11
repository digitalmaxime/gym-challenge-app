/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import Colors from '../../constants/styles';
import { Size } from '../../constants/size';
import FollowedCoursePreviewItemList from './FollowedCoursePreviewItemList';
import CoursePreview from '../../models/course/CoursePreview';
import { useCoursesContext } from '../../contexts/CoursesContext';
import WarningModal from '../basics/WarningModal';

const topHeight = Size.topBarHeight;

type FollowedCoursesListProps = {
    isCoursesOverviewExpanded: boolean;
    setCoursesOverviewExpanded: (value: boolean) => void;
}

export default function FollowedCoursesModal({ isCoursesOverviewExpanded, setCoursesOverviewExpanded }: FollowedCoursesListProps) {
  const coursesContext = useCoursesContext();

  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [courseToUnfollow, setCourseToUnfollow] = useState<CoursePreview|undefined>(undefined);

  function closeCoursesOverview() {
    setCoursesOverviewExpanded(false);
  }

  return (
    <View>
      <Modal
        transparent
        style={{ position: 'absolute' }}
        visible={isCoursesOverviewExpanded}
        animationType="fade"
      >
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={closeCoursesOverview}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', flex: 1 }}
          >
            <View style={[styles.coursesOverview, { top: topHeight }]}>
              <TouchableOpacity activeOpacity={1}>
                <FollowedCoursePreviewItemList
                  closeCoursesOverview={closeCoursesOverview}
                  setShowWarning={setShowWarning}
                  setCourseToUnfollow={setCourseToUnfollow}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </SafeAreaView>

        {/** Warning Modal if student want's to unfollow a course */}
        {showWarning && (
          <WarningModal
            message="Attention votre progrès sera perdu"
            confirm={() => {
              setShowWarning(!showWarning);
              if (courseToUnfollow) {
                coursesContext.removeCourseFromFollowedCourses(courseToUnfollow.id);
              }
            }}
            cancel={() => {
              setShowWarning(!showWarning);
              setCourseToUnfollow(undefined);
            }}
          />
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({

  warningContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  warningContent: {
    margin: 40,
    backgroundColor: Colors.warningBackground,
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  coursesOverview: {
    height: 210,
    backgroundColor: Colors.coursesOverviewBackgroundColor,
    justifyContent: 'center',
  },
  courseCard: {
    padding: 2,
    alignItems: 'center',
  },
  flatListItemSeparator: {
    width: 5,
    backgroundColor: Colors.coursesOverviewBackgroundColor,
  },
});
