import EnrollmentsDao from "../enrollments/dao.js";

export default function PeopleRoutes(app) {
  const enrollmentsDao = EnrollmentsDao();

  app.get("/api/courses/:courseId/users", async (req, res) => {
    const users = await enrollmentsDao.findUsersForCourse(req.params.courseId);
    res.json(users);
  });
}
