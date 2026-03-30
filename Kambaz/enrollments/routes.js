import { findCourseById } from "../courses/dao.js";
import {
  enrollUserInCourse,
  findAllEnrollments,
  findEnrollmentsForCourse,
  findEnrollmentsForUser,
  unenrollUserFromCourse,
} from "./dao.js";

export default function EnrollmentRoutes(app) {
  const requireCurrentUser = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.status(401).json({ message: "No active session" });
      return null;
    }
    return currentUser;
  };

  app.get("/api/enrollments", (req, res) => {
    res.json(findAllEnrollments());
  });

  app.get("/api/users/current/enrollments", (req, res) => {
    const currentUser = requireCurrentUser(req, res);
    if (!currentUser) {
      return;
    }
    res.json(findEnrollmentsForUser(currentUser._id));
  });

  app.get("/api/courses/:courseId/enrollments", (req, res) => {
    res.json(findEnrollmentsForCourse(req.params.courseId));
  });

  app.post("/api/courses/:courseId/enrollments", (req, res) => {
    const currentUser = requireCurrentUser(req, res);
    if (!currentUser) {
      return;
    }
    const course = findCourseById(req.params.courseId);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.json(enrollUserInCourse(currentUser._id, req.params.courseId));
  });

  app.delete("/api/courses/:courseId/enrollments/current", (req, res) => {
    const currentUser = requireCurrentUser(req, res);
    if (!currentUser) {
      return;
    }
    const deleted = unenrollUserFromCourse(currentUser._id, req.params.courseId);
    if (!deleted) {
      res.status(404).json({ message: "Enrollment not found" });
      return;
    }
    res.sendStatus(200);
  });
}
