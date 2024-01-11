import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Colors from '../../../constants/styles';
import CoursePreview from '../../../models/course/CoursePreview';

type RootStackParamList = {
  params: { coursePreview: CoursePreview };
};
type CourseDetailsScreenRouteProp = RouteProp<RootStackParamList, 'params'>;

function CourseDetailsScreen() {
  const route = useRoute<CourseDetailsScreenRouteProp>();
  const { coursePreview } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{coursePreview.courseTitle}</Text>
      <Image style={styles.image} source={{ uri: coursePreview.imageUrl }} />
      <Text style={styles.details}>{coursePreview.details}</Text>
    </View>
  );
}

export default CourseDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackgroundColor,
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    margin: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textColor,
  },
  details: {
    margin: 20,
    fontSize: 18,
    color: Colors.textColor,
  },
  author: {
    margin: 15,
    alignSelf: 'flex-start',
    fontStyle: 'italic',
    fontSize: 18,
  },
});
