import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function CoursesDao() {
  const findAllCourses = () => model.find();
  const findCourseById = (courseId) => model.findById(courseId);
  const createCourse = (course) => {
    const newCourse = { image: "/images/reactjs.jpg", ...course, _id: uuidv4() };
    return model.create(newCourse);
  };
  const updateCourse = (courseId, courseUpdates) =>
    model.updateOne({ _id: courseId }, { $set: courseUpdates });
  const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });
  return { findAllCourses, findCourseById, createCourse, updateCourse, deleteCourse };
}
