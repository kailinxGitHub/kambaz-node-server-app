import {
  createCourse,
  deleteCourse,
  findAllCourses,
  findCourseById,
  findCoursesForEnrolledUser,
  updateCourse,
} from "./dao.js";
import { isStaff } from "../permissions.js";

export default function CourseRoutes(app) {
  const requireCurrentUser = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.status(401).json({ message: "No active session" });
      return null;
    }
    return currentUser;
  };

  const requireStaffUser = (req, res) => {
    const currentUser = requireCurrentUser(req, res);
    if (!currentUser) {
      return null;
    }
    if (!isStaff(currentUser)) {
      res.status(403).json({ message: "Forbidden" });
      return null;
    }
    return currentUser;
  };

  app.get("/api/courses", (req, res) => {
    res.json(findAllCourses());
  });

  app.get("/api/users/:userId/courses", (req, res) => {
    const { userId } = req.params;
    if (userId === "current") {
      const currentUser = requireCurrentUser(req, res);
      if (!currentUser) {
        return;
      }
      res.json(findCoursesForEnrolledUser(currentUser._id));
      return;
    }
    res.json(findCoursesForEnrolledUser(userId));
  });

  app.post("/api/users/current/courses", (req, res) => {
    const currentUser = requireStaffUser(req, res);
    if (!currentUser) {
      return;
    }
    res.status(201).json(createCourse(req.body, currentUser._id));
  });

  app.put("/api/courses/:courseId", (req, res) => {
    const currentUser = requireStaffUser(req, res);
    if (!currentUser) {
      return;
    }
    if (!findCourseById(req.params.courseId)) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.json(updateCourse(req.params.courseId, req.body));
  });

  app.delete("/api/courses/:courseId", (req, res) => {
    const currentUser = requireStaffUser(req, res);
    if (!currentUser) {
      return;
    }
    const deleted = deleteCourse(req.params.courseId);
    if (!deleted) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.json({ courseId: req.params.courseId });
  });
}
