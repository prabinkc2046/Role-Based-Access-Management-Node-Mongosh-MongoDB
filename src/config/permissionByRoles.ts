export enum Roles {
  ADMIN = 'admin',
  PRINCIPAL = 'principal',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export const allowedRoles = new Map<string, string>([
  [Roles.ADMIN, Roles.ADMIN],
  [Roles.PRINCIPAL, Roles.PRINCIPAL],
  [Roles.TEACHER, Roles.TEACHER],
  [Roles.STUDENT, Roles.STUDENT],
]);

export const allowedRoutesByRoles: Record<string, string[]> = {
  '/admin/manage-teachers': [Roles.ADMIN],
  '/principal/manage-students': [Roles.ADMIN, Roles.PRINCIPAL],
  '/teacher/student-progress': [Roles.ADMIN, Roles.PRINCIPAL, Roles.TEACHER],
  '/student/my-progress': [
    Roles.ADMIN,
    Roles.PRINCIPAL,
    Roles.TEACHER,
    Roles.STUDENT,
  ],
};
