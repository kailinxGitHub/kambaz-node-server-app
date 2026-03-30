import {
  createUser,
  findAllUsers,
  findUserByCredentials,
  findUserById,
  findUserByUsername,
  updateUser,
} from "./dao.js";
import { withoutPassword } from "../permissions.js";

export default function UserRoutes(app) {
  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = findUserByCredentials(username, password);
    if (!currentUser) {
      res.status(401).json({ message: "Unable to find user" });
      return;
    }
    req.session.currentUser = currentUser;
    res.json(withoutPassword(currentUser));
  };

  const signup = (req, res) => {
    const { username } = req.body;
    if (findUserByUsername(username)) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = createUser(req.body);
    req.session.currentUser = currentUser;
    res.json(withoutPassword(currentUser));
  };

  const signout = (req, res) => {
    req.session.destroy(() => {
      res.sendStatus(200);
    });
  };

  const profile = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.status(401).json({ message: "No active session" });
      return;
    }
    const freshUser = findUserById(currentUser._id);
    if (!freshUser) {
      req.session.currentUser = null;
      res.status(404).json({ message: "User not found" });
      return;
    }
    req.session.currentUser = freshUser;
    res.json(withoutPassword(freshUser));
  };

  const updateCurrentUser = (req, res) => {
    const sessionUser = req.session.currentUser;
    if (!sessionUser) {
      res.status(401).json({ message: "No active session" });
      return;
    }
    const userId = req.params.userId === "current" ? sessionUser._id : req.params.userId;
    const updatedUser = updateUser(userId, req.body);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (sessionUser._id === userId) {
      req.session.currentUser = updatedUser;
    }
    res.json(withoutPassword(updatedUser));
  };

  const findAll = (req, res) => {
    res.json(findAllUsers().map(withoutPassword));
  };

  const findById = (req, res) => {
    const user = findUserById(req.params.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(withoutPassword(user));
  };

  app.get("/api/users", findAll);
  app.get("/api/users/:userId", findById);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.post("/api/users/profile", profile);
  app.post("/api/users/signout", signout);
  app.put("/api/users/:userId", updateCurrentUser);
}
