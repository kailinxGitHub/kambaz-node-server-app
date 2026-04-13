import ModulesDao from "./dao.js";
import { isStaff } from "../permissions.js";

export default function ModuleRoutes(app) {
  const dao = ModulesDao();

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

  const findModulesForCourse = async (req, res) => {
    const modules = await dao.findModulesForCourse(req.params.courseId);
    res.json(modules);
  };

  const createModuleForCourse = async (req, res) => {
    if (!requireStaffUser(req, res)) return;
    const newModule = await dao.createModule(req.params.courseId, req.body);
    res.status(201).json(newModule);
  };

  const updateModule = async (req, res) => {
    if (!requireStaffUser(req, res)) return;
    const updated = await dao.updateModule(
      req.params.courseId,
      req.params.moduleId,
      req.body
    );
    res.json(updated);
  };

  const deleteModule = async (req, res) => {
    if (!requireStaffUser(req, res)) return;
    const status = await dao.deleteModule(req.params.courseId, req.params.moduleId);
    res.json(status);
  };

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.put("/api/courses/:courseId/modules/:moduleId", updateModule);
  app.delete("/api/courses/:courseId/modules/:moduleId", deleteModule);
}
