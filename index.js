import "dotenv/config";
import cors from "cors";
import express from "express";
import session from "express-session";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import AssignmentRoutes from "./Kambaz/assignments/routes.js";
import CourseRoutes from "./Kambaz/courses/routes.js";
import EnrollmentRoutes from "./Kambaz/enrollments/routes.js";
import ModuleRoutes from "./Kambaz/modules/routes.js";
import PeopleRoutes from "./Kambaz/people/routes.js";
import UserRoutes from "./Kambaz/users/routes.js";

const app = express();
const isProduction = process.env.SERVER_ENV === "production";
const allowedOrigins = (
  process.env.CLIENT_URL || "http://localhost:3000,http://localhost:3001"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (isProduction) {
  app.set("trust proxy", 1);
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
} else {
  sessionOptions.cookie = {
    sameSite: "lax",
    secure: false,
  };
}
app.use(session(sessionOptions));

app.use(express.json());

Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
PeopleRoutes(app);

app.listen(process.env.PORT || 4000);
