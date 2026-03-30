import { v4 as uuidv4 } from "uuid";
import db from "../Database/index.js";

export const findModulesForCourse = (courseId) =>
  db.modules.filter((module) => module.course === courseId);

export const findModuleById = (moduleId) =>
  db.modules.find((module) => module._id === moduleId);

export const createModule = (courseId, module) => {
  const newModule = {
    _id: uuidv4(),
    course: courseId,
    name: module.name || "New Module",
    lessons: module.lessons || [],
  };
  db.modules.push(newModule);
  return newModule;
};

export const updateModule = (moduleId, updates) => {
  const module = findModuleById(moduleId);
  if (!module) {
    return null;
  }
  Object.assign(module, { ...updates, _id: moduleId });
  return module;
};

export const deleteModule = (moduleId) => {
  const index = db.modules.findIndex((module) => module._id === moduleId);
  if (index === -1) {
    return false;
  }
  db.modules.splice(index, 1);
  return true;
};
