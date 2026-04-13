import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao() {
  const findAllAssignments = () => model.find();
  const findAssignmentsForCourse = (courseId) => model.find({ course: courseId });
  const createAssignment = (assignment) => {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return model.create(newAssignment);
  };
  const updateAssignment = (assignmentId, updates) =>
    model.updateOne({ _id: assignmentId }, { $set: updates });
  const deleteAssignment = (assignmentId) => model.deleteOne({ _id: assignmentId });
  return {
    findAllAssignments, findAssignmentsForCourse,
    createAssignment, updateAssignment, deleteAssignment,
  };
}
