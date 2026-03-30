import { v4 as uuidv4 } from "uuid";
import db from "../Database/index.js";
import {
  enrollUserInCourse,
  findEnrollmentsForUser,
} from "../enrollments/dao.js";

export const findAllCourses = () => db.courses;

export const findCourseById = (courseId) =>
  db.courses.find((course) => course._id === courseId);

export const findCoursesForEnrolledUser = (userId) => {
  const courseIds = findEnrollmentsForUser(userId).map(
    (enrollment) => enrollment.course
  );
  return db.courses.filter((course) => courseIds.includes(course._id));
};

export const createCourse = (course, userId) => {
  const newCourse = {
    image: "/images/reactjs.jpg",
    ...course,
    _id: uuidv4(),
  };
  db.courses.push(newCourse);
  if (userId) {
    enrollUserInCourse(userId, newCourse._id);
  }
  return newCourse;
};

export const updateCourse = (courseId, updates) => {
  const course = findCourseById(courseId);
  if (!course) {
    return null;
  }
  Object.assign(course, { ...updates, _id: courseId });
  return course;
};

export const deleteCourse = (courseId) => {
  const courseIndex = db.courses.findIndex((course) => course._id === courseId);
  if (courseIndex === -1) {
    return false;
  }
  db.courses.splice(courseIndex, 1);
  db.modules = db.modules.filter((module) => module.course !== courseId);
  db.assignments = db.assignments.filter(
    (assignment) => assignment.course !== courseId
  );
  db.enrollments = db.enrollments.filter(
    (enrollment) => enrollment.course !== courseId
  );
  return true;
};
