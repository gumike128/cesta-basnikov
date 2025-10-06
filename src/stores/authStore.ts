import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isAuthenticated: false,
      login: (token: string) => {
        set({ token, isAuthenticated: true });
      },
      logout: () => {
        set({ token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      // The onRehydrate callback is removed to fix the TypeScript error.
      // The state is correctly rehydrated by the middleware, and we can derive
      // isAuthenticated from the presence of the token where needed.
      // A simple way to ensure isAuthenticated is correct on load is to check the token
      // after rehydration, which can be done in a component or effect.
      // For simplicity here, we rely on the initial state and login/logout actions
      // to correctly manage isAuthenticated. The persisted token is the source of truth.
    }
  )
);
// This ensures that on initial load, if a token exists, isAuthenticated is true.
useAuthStore.subscribe((state) => {
    if (state.token && !state.isAuthenticated) {
        useAuthStore.setState({ isAuthenticated: true });
    }
});