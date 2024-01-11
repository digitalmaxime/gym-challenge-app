import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import Colors from '../../constants/styles';
import CoursePreview from '../../models/course/CoursePreview';
import AvailableCoursePreviewItem from './AvailableCoursePreviewItem';

type AvailableCoursesPreviewProps = {
  availableCourses: CoursePreview[];
}

function AvailableCoursesPreview({ availableCourses }: AvailableCoursesPreviewProps) {
  function renderCourseItem(itemData: any) {
    const course: CoursePreview = itemData.item;
    return (
      <View style={styles.courseCard}>
        <AvailableCoursePreviewItem coursePreview={course} />
      </View>
    );
  }

  return (
    <View style={[styles.coursesOverview]}>
      <FlatList
        data={availableCourses}
        keyExtractor={(item) => item.id}
        numColumns={2}
        bounces={false}
        renderItem={renderCourseItem}
      />
    </View>
  );
}

export default AvailableCoursesPreview;

const styles = StyleSheet.create({
  coursesOverview: {
    flex: 1,
    width: '90%',
    margin: 8,
    backgroundColor: Colors.littleOpacity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseCard: {
    padding: 3,
    alignItems: 'center',
  },
});
