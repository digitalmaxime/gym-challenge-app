/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCoursesContext } from '../../../contexts/CoursesContext';
import Colors from '../../../constants/styles';
import AvailableCoursesPreview from '../../../components/courseSearch/AvailableCoursesPreview';
import { ButtonIcon } from '../../../components/basics/Buttons';
import CoursePreview from '../../../models/course/CoursePreview';

function SearchCoursesScreen() {
  const coursesContext = useCoursesContext();

  const [filteredAvailableCourses, setFilteredAvailableCourses] = useState<CoursePreview[]>(coursesContext.allCoursesPreview);
  const [searchInputValue, setSearchInputValue] = useState('');

  useEffect(() => {
    handleNewCourseSearch();
  }, [searchInputValue]);

  function handleNewCourseSearch() {
    if (searchInputValue.length === 0) {
      setFilteredAvailableCourses(coursesContext.allCoursesPreview);
      return;
    }

    const updatedAvailableCourses = coursesContext.allCoursesPreview.filter((coursePreview: CoursePreview) => {
      const { tags } = coursePreview;
      let tagMatches = false;
      tags.forEach((tag: string) => {
        if (tag.toLocaleLowerCase() === searchInputValue.toLowerCase()) {
          tagMatches = true;
        }
      });

      if (tagMatches) return true;

      return (coursePreview.courseNumber.toLowerCase().includes(searchInputValue.toLowerCase()));
    });
    setFilteredAvailableCourses(updatedAvailableCourses);
  }

  function clearSearch() {
    setFilteredAvailableCourses(coursesContext.allCoursesPreview);
    setSearchInputValue('');
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require('../../../../assets/images/poly-bee.png')}
        />

        <View style={styles.searchInputSection}>
          <MaterialCommunityIcons name="magnify" style={styles.searchIcon} size={26} />
          <TextInput
            style={styles.textInput}
            placeholder="rechercher un cours"
            onChangeText={(e) => setSearchInputValue(e)}
            value={searchInputValue}
          />
          <View style={styles.clearSearchInput}>
            <ButtonIcon
              iconName="close"
              iconSize={26}
              onPress={clearSearch}
              btnSize={26}
              btnBackgroundColor={Colors.transparent}
              color={Colors.cardBackgroundColor}
              disabled={false}
            />
          </View>
        </View>

        <AvailableCoursesPreview availableCourses={filteredAvailableCourses} />
      </View>
    </View>
  );
}

export default SearchCoursesScreen;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center', // Along de cross axis
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: Colors.searchBackgroundColor,
  },
  searchInputSection: {
    padding: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  textInput: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: Colors.searchBackgroundColor,
    borderRadius: 4,
    width: '80%',
    marginRight: 8,
    padding: 5,
    color: 'black',
  },
  button: {
    width: '30%',
    marginHorizontal: 20,
    marginTop: 8,
  },
  image: {
    width: 80,
    height: 80,
    marginTop: 10,
    marginBottom: 10,
  },
  searchIcon: {
    color: 'black',
    padding: 5,
  },
  clearSearchInput: {
    position: 'absolute',
    right: 12,
  },
});
