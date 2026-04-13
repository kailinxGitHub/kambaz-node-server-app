import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  const dao = EnrollmentsDao();

  const requireCurrentUser = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.status(401).json({ message: "No active session" });
      return null;
    }
    return currentUser;
  };

  const findAllEnrollments = async (req, res) => {
    const enrollments = await dao.findAllEnrollments();
    res.json(enrollments);
  };

  const findEnrollmentsForCurrentUser = async (req, res) => {
    const currentUser = requireCurrentUser(req, res);
    if (!currentUser) return;
    const enrollments = await dao.findEnrollmentsForUser(currentUser._id);
    res.json(enrollments);
  };

  const findEnrollmentsForCourse = async (req, res) => {
    const enrollments = await dao.findEnrollmentsForCourse(req.params.courseId);
    res.json(enrollments);
  };

  const enrollInCourse = async (req, res) => {
    const currentUser = requireCurrentUser(req, res);
    if (!currentUser) return;
    const enrollment = await dao.enrollUserInCourse(
      currentUser._id,
      req.params.courseId
    );
    res.json(enrollment);
  };

  const unenrollFromCourse = async (req, res) => {
    const currentUser = requireCurrentUser(req, res);
    if (!currentUser) return;
    await dao.unenrollUserFromCourse(currentUser._id, req.params.courseId);
    res.sendStatus(200);
  };

  app.get("/api/enrollments", findAllEnrollments);
  app.get("/api/users/current/enrollments", findEnrollmentsForCurrentUser);
  app.get("/api/courses/:courseId/enrollments", findEnrollmentsForCourse);
  app.post("/api/courses/:courseId/enrollments", enrollInCourse);
  app.delete("/api/courses/:courseId/enrollments/current", unenrollFromCourse);
}
