import permissions from '../configs/permissions.json' with { type: 'json' };

export type PermissionEntry = {
  route: string;
  methods: string[];
};

export type PermissionsMap = Record<string, PermissionEntry[]>;

type CompiledPermissionEntry = {
  matcher: RegExp;
  methods: Set<string>;
};

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

  const trailingSlash = route === '/' ? '' : '/?';

  return new RegExp(`^${pattern}${trailingSlash}$`, 'i');
};

const normalizeMethod = (method: string): string => {
  const normalized = method.toUpperCase();
  return normalized === 'HEAD' ? 'GET' : normalized;
};

const permissionsMap = Object.fromEntries(
  Object.entries(permissions as PermissionsMap).map(([role, entries]) => [
    role,
    entries.map(
      (entry): CompiledPermissionEntry => ({
        matcher: routeToRegex(entry.route),
        methods: new Set(entry.methods.map(normalizeMethod)),
      }),
    ),
  ]),
) as Record<string, CompiledPermissionEntry[]>;

const findMatchingEntry = (
  path: string,
  method: string,
  entries: CompiledPermissionEntry[],
): CompiledPermissionEntry | undefined => {
  const normalizedMethod = normalizeMethod(method);

  return entries.find(
    (entry) =>
      entry.methods.has(normalizedMethod) && entry.matcher.test(path),
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
