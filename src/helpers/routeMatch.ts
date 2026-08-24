import permissions from '../configs/permissions.json' with { type: 'json' };

export type PermissionEntry = {
  route: string;
  methods: string[];
};

export type PermissionsMap = Record<string, PermissionEntry[]>;

const permissionsMap = permissions as PermissionsMap;

const routeToRegex = (route: string): RegExp => {
  const pattern = route
    .split('/')
    .map((segment) => {
      if (segment.startsWith(':')) {
        return '[^/]+';
      }

      return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('/');

  return new RegExp(`^${pattern}$`);
};

const findMatchingEntry = (
  path: string,
  method: string,
  entries: PermissionEntry[],
): PermissionEntry | undefined => {
  return entries.find(
    (entry) =>
      entry.methods.includes(method) && routeToRegex(entry.route).test(path),
  );
};

export const isProtectedRoute = (path: string, method: string): boolean => {
  return Object.values(permissionsMap).some((entries) =>
    Boolean(findMatchingEntry(path, method, entries)),
  );
};

export const hasPermission = (
  role: string,
  path: string,
  method: string,
): boolean => {
  const entries = permissionsMap[role];

  if (!entries) {
    return false;
  }

  return Boolean(findMatchingEntry(path, method, entries));
};
