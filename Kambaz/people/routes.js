import { findEnrollmentsForCourse } from "../enrollments/dao.js";
import { withoutPassword } from "../permissions.js";
import UsersDao from "../users/dao.js";

export default function PeopleRoutes(app) {
  const dao = UsersDao();

  app.get("/api/courses/:courseId/users", async (req, res) => {
    const enrollments = findEnrollmentsForCourse(req.params.courseId);
    const userIds = enrollments.map((enrollment) => enrollment.user);
    const allUsers = await dao.findAllUsers();
    const users = allUsers
      .filter((user) => userIds.includes(String(user._id)))
      .map((user) => withoutPassword(user.toObject()));
    res.json(users);
  });
}
