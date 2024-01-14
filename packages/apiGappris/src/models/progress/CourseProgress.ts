type CourseProgress = {
    userId: string,
    courseId: string,
    userScore: number,
    progress: {[key: string]: {[isCompleted: string]: boolean}};
};

export default CourseProgress;
