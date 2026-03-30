import { v4 as uuidv4 } from "uuid";
import db from "../Database/index.js";

export const findAllUsers = () => db.users;

export const findUserById = (userId) =>
  db.users.find((user) => user._id === userId);

export const findUserByUsername = (username) =>
  db.users.find((user) => user.username === username);

export const findUserByCredentials = (username, password) =>
  db.users.find(
    (user) => user.username === username && user.password === password
  );

export const createUser = (user) => {
  const newUser = {
    _id: uuidv4(),
    username: user.username,
    password: user.password,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    dob: user.dob || "",
    loginId: user.loginId || user.username,
    section: user.section || "S101",
    role: user.role || "STUDENT",
    lastActivity: user.lastActivity || "",
    totalActivity: user.totalActivity || "",
  };
  db.users.push(newUser);
  return newUser;
};

export const updateUser = (userId, updates) => {
  const user = findUserById(userId);
  if (!user) {
    return null;
  }
  Object.assign(user, { ...updates, _id: userId });
  return user;
};

export const deleteUser = (userId) => {
  const index = db.users.findIndex((user) => user._id === userId);
  if (index === -1) {
    return false;
  }
  db.users.splice(index, 1);
  db.enrollments = db.enrollments.filter((enrollment) => enrollment.user !== userId);
  return true;
};
