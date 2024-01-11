/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

type Progress = {
  [key: string]: {
    [isCompleted: string]: boolean;
};
}
// This function handles combining the content of the user's progress with the structure of the course
// to ensure the user Progress remains valid after the course content changes
// This takes the form in 2 behaviors:
// When the course content removes an element which was present in the user's progress (i.e The teacher removes a lesson from a unit),
// the associated field in the user progress is removed.
// When the course content adds an element which was not present in the user's progress (i.e The teacher adds a lesson to a unit),
// the field matching the id of the new element is added to the user's progress.
export function validateCourseProgress(userProgress: Progress, courseProgressStructure: Progress): Progress {
  const userProgressKeys: string[] = Object.keys(userProgress);
  const courseProgressKeys: string[] = Object.keys(courseProgressStructure);

  const validatedUserProgress: Progress = {};
  for (const key of courseProgressKeys) {
    // If the key exists in the userProgress, we transfer the value from the original progress to the valid one
    if (userProgressKeys.includes(key)) {
      validatedUserProgress[key] = { isCompleted: userProgress[key].isCompleted };
    } else {
      // If it does not, we set the value to the default, which is false
      validatedUserProgress[key] = { isCompleted: false };
    }
  }
  return validatedUserProgress;
}
