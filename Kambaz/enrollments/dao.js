import model from "./model.js";

export default function EnrollmentsDao() {
  const findAllEnrollments = () => model.find();
  const findEnrollmentsForUser = (userId) => model.find({ user: userId });
  const findEnrollmentsForCourse = (courseId) => model.find({ course: courseId });

  const findCoursesForUser = async (userId) => {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  };

  const findUsersForCourse = async (courseId) => {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  };

  const enrollUserInCourse = (userId, courseId) =>
    model.create({ _id: `${userId}-${courseId}`, user: userId, course: courseId });

  const unenrollUserFromCourse = (userId, courseId) =>
    model.deleteOne({ user: userId, course: courseId });

  const unenrollAllUsersFromCourse = (courseId) =>
    model.deleteMany({ course: courseId });

  return {
    findAllEnrollments, findEnrollmentsForUser, findEnrollmentsForCourse,
    findCoursesForUser, findUsersForCourse,
    enrollUserInCourse, unenrollUserFromCourse, unenrollAllUsersFromCourse,
  };
}
