import { findEnrollmentsForCourse } from "../enrollments/dao.js";
import { withoutPassword } from "../permissions.js";
import { findAllUsers } from "../users/dao.js";

export default function PeopleRoutes(app) {
  app.get("/api/courses/:courseId/users", (req, res) => {
    const enrollments = findEnrollmentsForCourse(req.params.courseId);
    const userIds = enrollments.map((enrollment) => enrollment.user);
    const users = findAllUsers()
      .filter((user) => userIds.includes(user._id))
      .map(withoutPassword);
    res.json(users);
  });
}
