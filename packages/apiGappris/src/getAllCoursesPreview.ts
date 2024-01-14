import { https } from 'firebase-functions';
import { firestore } from 'firebase-admin';

import CoursePreview from './models/course/CoursePreview';


const getAllCoursesPreview = https.onCall(async () => {
  const listOfPreview: CoursePreview[] = [];
  const coursesPreviewList = await firestore().collection('Courses').get();
  coursesPreviewList.docs.forEach(doc => {
    // Only return courses which have a defined publishedSections field
    // And are therefore published
    if (doc.data().publishedSections !== null) {
      const coursePreview : CoursePreview = {
        id: doc.id,
        courseNumber: doc.data().courseNumber,
        courseTitle: doc.data().courseTitle,
        details: doc.data().details,
        imageUrl: doc.data().imageUrl,
        tags: doc.data().tags,
        // A course with no defined password is represented by an empty string
        hasPassword: ((doc.data().password as string).length !== 0),
      };
      listOfPreview.push(coursePreview);
    }
  });
  return listOfPreview;
});

export default getAllCoursesPreview;
