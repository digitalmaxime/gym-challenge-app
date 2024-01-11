/* eslint-disable arrow-body-style */
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import SectionComponent from '../../../components/courseLearning/section/SectionComponent';
import Colors from '../../../constants/styles';
import { useCoursesContext } from '../../../contexts/CoursesContext';
import CourseTopTabs from '../../../components/topBar/CourseTopTabs';
import Section from '../../../models/course/section/Section';

function CourseLearning() {
  const coursesContext = useCoursesContext();
  function renderSectionItem(itemData: any) {
    const section: Section = itemData.item;
    return (
      <View style={{ margin: 5 }}>
        <SectionComponent
          section={section}
          index={itemData.index}
        />
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <CourseTopTabs />
      <View style={styles.courseContainer}>
        <View style={{ width: '100%' }}>
          <FlatList
            data={coursesContext.currentCourse?.sections}
            keyExtractor={(item) => item.id}
            renderItem={renderSectionItem}
          />
        </View>
      </View>
    </View>
  );
}

export default CourseLearning;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.coursesBackgroundColor,
  },
  courseContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 10,
  },
});
