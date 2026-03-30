import { v4 as uuidv4 } from "uuid";
import db from "../Database/index.js";

export const findAllAssignments = () => db.assignments;

export const findAssignmentsForCourse = (courseId) =>
  db.assignments.filter((assignment) => assignment.course === courseId);

export const findAssignmentById = (assignmentId) =>
  db.assignments.find((assignment) => assignment._id === assignmentId);

export const createAssignment = (assignment) => {
  const newAssignment = {
    ...assignment,
    _id: uuidv4(),
  };
  db.assignments.push(newAssignment);
  return newAssignment;
};

export const updateAssignment = (assignmentId, updates) => {
  const assignment = findAssignmentById(assignmentId);
  if (!assignment) {
    return null;
  }
  Object.assign(assignment, { ...updates, _id: assignmentId });
  return assignment;
};

export const deleteAssignment = (assignmentId) => {
  const index = db.assignments.findIndex(
    (assignment) => assignment._id === assignmentId
  );
  if (index === -1) {
    return false;
  }
  db.assignments.splice(index, 1);
  return true;
};
