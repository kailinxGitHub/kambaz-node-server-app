import { v4 as uuidv4 } from "uuid";
import db from "../Database/index.js";

export const findAllEnrollments = () => db.enrollments;

export const findEnrollmentsForUser = (userId) =>
  db.enrollments.filter((enrollment) => enrollment.user === userId);

export const findEnrollmentsForCourse = (courseId) =>
  db.enrollments.filter((enrollment) => enrollment.course === courseId);

export const findEnrollment = (userId, courseId) =>
  db.enrollments.find(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );

export const enrollUserInCourse = (userId, courseId) => {
  const existingEnrollment = findEnrollment(userId, courseId);
  if (existingEnrollment) {
    return existingEnrollment;
  }
  const newEnrollment = {
    _id: uuidv4(),
    user: userId,
    course: courseId,
  };
  db.enrollments.push(newEnrollment);
  return newEnrollment;
};

export const unenrollUserFromCourse = (userId, courseId) => {
  const enrollmentIndex = db.enrollments.findIndex(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  if (enrollmentIndex === -1) {
    return false;
  }
  db.enrollments.splice(enrollmentIndex, 1);
  return true;
};
