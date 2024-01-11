/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-len */
import React, { Dispatch, SetStateAction } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import { useCoursesContext } from '../../contexts/CoursesContext';

// Components
import FollowedCoursePreviewItem from './FollowedCoursePreviewItem';
// Style
import Colors from '../../constants/styles';
import CoursePreview from '../../models/course/CoursePreview';

type CourseItemListProps = {
  closeCoursesOverview: () => void;
  setShowWarning: Dispatch<SetStateAction<boolean>>;
  setCourseToUnfollow: Dispatch<SetStateAction<CoursePreview | undefined>>;
}

function FollowedCoursePreviewItemList({ closeCoursesOverview, setShowWarning, setCourseToUnfollow }: CourseItemListProps) {
  const coursesContext = useCoursesContext();
  function renderCourseItem(itemData) {
    const course: CoursePreview = itemData.item;
    return (
      <View style={styles.courseCard}>
        <FollowedCoursePreviewItem
          coursePreview={course}
          closeCoursesOverview={closeCoursesOverview}
          setShowWarning={setShowWarning}
          setCourseToUnfollow={setCourseToUnfollow}
        />
      </View>
    );
  }

  return (
    <View>
      {coursesContext.followedCoursesPreview.length > 0 && (
      <FlatList
        data={coursesContext.followedCoursesPreview}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={renderCourseItem}
      />
      )}
      {coursesContext.followedCoursesPreview.length === 0 && (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{
          color: Colors.textColor, fontSize: 20, fontWeight: 'bold',
        }}
        >Aucun cours suivi
        </Text>
      </View>
      )}
    </View>
  );
}

export default FollowedCoursePreviewItemList;

const styles = StyleSheet.create({
  courseCard: {
    padding: 2,
    alignItems: 'center',
  },
});
