import { createContext } from 'react';

export const RouteContext = createContext({
  routes: [],
  authRoutes: [],
  docTypes: []
});
