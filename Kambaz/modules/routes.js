import { findCourseById } from "../courses/dao.js";
import { isStaff } from "../permissions.js";
import {
  createModule,
  deleteModule,
  findModulesForCourse,
  updateModule,
} from "./dao.js";

export default function ModuleRoutes(app) {
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

  app.get("/api/courses/:courseId/modules", (req, res) => {
    res.json(findModulesForCourse(req.params.courseId));
  });

  app.post("/api/courses/:courseId/modules", (req, res) => {
    if (!requireStaffUser(req, res)) {
      return;
    }
    if (!findCourseById(req.params.courseId)) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.status(201).json(createModule(req.params.courseId, req.body));
  });

  app.put("/api/modules/:moduleId", (req, res) => {
    if (!requireStaffUser(req, res)) {
      return;
    }
    const updatedModule = updateModule(req.params.moduleId, req.body);
    if (!updatedModule) {
      res.status(404).json({ message: "Module not found" });
      return;
    }
    res.json(updatedModule);
  });

  app.delete("/api/modules/:moduleId", (req, res) => {
    if (!requireStaffUser(req, res)) {
      return;
    }
    const deleted = deleteModule(req.params.moduleId);
    if (!deleted) {
      res.status(404).json({ message: "Module not found" });
      return;
    }
    res.json({ moduleId: req.params.moduleId });
  });
}
