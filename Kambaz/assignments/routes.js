import { isStaff } from "../permissions.js";
import {
  createAssignment,
  deleteAssignment,
  findAllAssignments,
  findAssignmentsForCourse,
  updateAssignment,
} from "./dao.js";

export default function AssignmentRoutes(app) {
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

  app.get("/api/assignments", (req, res) => {
    res.json(findAllAssignments());
  });

  app.get("/api/courses/:courseId/assignments", (req, res) => {
    res.json(findAssignmentsForCourse(req.params.courseId));
  });

  app.post("/api/assignments", (req, res) => {
    if (!requireStaffUser(req, res)) {
      return;
    }
    res.status(201).json(createAssignment(req.body));
  });

  app.put("/api/assignments/:assignmentId", (req, res) => {
    if (!requireStaffUser(req, res)) {
      return;
    }
    const updatedAssignment = updateAssignment(req.params.assignmentId, req.body);
    if (!updatedAssignment) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }
    res.json(updatedAssignment);
  });

  app.delete("/api/assignments/:assignmentId", (req, res) => {
    if (!requireStaffUser(req, res)) {
      return;
    }
    const deleted = deleteAssignment(req.params.assignmentId);
    if (!deleted) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }
    res.json({ assignmentId: req.params.assignmentId });
  });
}
