const STAFF_ROLES = ["ADMIN", "FACULTY", "INSTRUCTOR", "TA"];

export const normalizeRole = (role) => role?.trim().toUpperCase() ?? "";

export const isStaff = (user) => STAFF_ROLES.includes(normalizeRole(user?.role));

export const withoutPassword = (user) => {
  if (!user) {
    return null;
  }
  const { password, ...safeUser } = user;
  return safeUser;
};
