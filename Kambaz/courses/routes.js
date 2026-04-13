import CoursesDao from "./dao.js";
import EnrollmentsDao from "../enrollments/dao.js";
import { isStaff } from "../permissions.js";

export default function CourseRoutes(app) {
  const dao = CoursesDao();
  const enrollmentsDao = EnrollmentsDao();

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
    if (!currentUser) return null;
    if (!isStaff(currentUser)) {
      res.status(403).json({ message: "Forbidden" });
      return null;
    }
    return currentUser;
  };

  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };

  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = requireCurrentUser(req, res);
      if (!currentUser) return;
      userId = currentUser._id;
    }
    const courses = await enrollmentsDao.findCoursesForUser(userId);
    res.json(courses);
  };

  const createCourse = async (req, res) => {
    const currentUser = requireStaffUser(req, res);
    if (!currentUser) return;
    const newCourse = await dao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.status(201).json(newCourse);
  };

  const updateCourse = async (req, res) => {
    const currentUser = requireStaffUser(req, res);
    if (!currentUser) return;
    const status = await dao.updateCourse(req.params.courseId, req.body);
    res.json(status);
  };

  const deleteCourse = async (req, res) => {
    const currentUser = requireStaffUser(req, res);
    if (!currentUser) return;
    await enrollmentsDao.unenrollAllUsersFromCourse(req.params.courseId);
    const status = await dao.deleteCourse(req.params.courseId);
    res.json(status);
  };

  const findUsersForCourse = async (req, res) => {
    const users = await enrollmentsDao.findUsersForCourse(req.params.cid);
    res.json(users);
  };

  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = requireCurrentUser(req, res);
      if (!currentUser) return;
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.json(status);
  };

  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = requireCurrentUser(req, res);
      if (!currentUser) return;
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.json(status);
  };

  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.get("/api/courses/:cid/users", findUsersForCourse);
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
}
