import AssignmentsDao from "./dao.js";
import { isStaff } from "../permissions.js";

export default function AssignmentRoutes(app) {
  const dao = AssignmentsDao();

  const requireStaffUser = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.status(401).json({ message: "No active session" });
      return null;
    }
    if (!isStaff(currentUser)) {
      res.status(403).json({ message: "Forbidden" });
      return null;
    }
    return currentUser;
  };

  const findAllAssignments = async (req, res) => {
    const assignments = await dao.findAllAssignments();
    res.json(assignments);
  };

  const findAssignmentsForCourse = async (req, res) => {
    const assignments = await dao.findAssignmentsForCourse(req.params.courseId);
    res.json(assignments);
  };

  const createAssignment = async (req, res) => {
    if (!requireStaffUser(req, res)) return;
    const assignment = await dao.createAssignment(req.body);
    res.status(201).json(assignment);
  };

  const updateAssignment = async (req, res) => {
    if (!requireStaffUser(req, res)) return;
    const status = await dao.updateAssignment(req.params.assignmentId, req.body);
    res.json(status);
  };

  const deleteAssignment = async (req, res) => {
    if (!requireStaffUser(req, res)) return;
    const status = await dao.deleteAssignment(req.params.assignmentId);
    res.json(status);
  };

  app.get("/api/assignments", findAllAssignments);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/assignments", createAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
