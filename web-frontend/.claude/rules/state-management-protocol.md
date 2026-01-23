# STATE MANAGEMENT PROTOCOL

**STATUS:** Active
**MISSION:** Standardize global state management with Zustand.

Các quy tắc này đảm bảo tính nhất quán trong cách tổ chức và sử dụng Zustand stores.

---

## 1. STORE STRUCTURE

### 1.1. Three-File Pattern

**MANDATORY:** Mỗi store phải có 3 files:

```text
src/stores/[feature]/
├── [feature].store.ts       # Store definition
├── [feature].selector.ts    # Selectors
└── [feature].types.ts       # TypeScript types
```

**Example:**

```text
src/stores/auth/
├── auth.store.ts
├── auth.selector.ts
└── auth.types.ts
```

---

## 2. STORE IMPLEMENTATION

### 2.1. Store Definition Template

```typescript
// auth.store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthState, AuthActions } from './auth.types'

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            // State
            user: null,
            isAuthenticated: false,

            // Actions
            setUser: (user) => set({ user, isAuthenticated: !!user }),
            clearAuth: () => set({ user: null, isAuthenticated: false })
        }),
        {
            name: 'auth-storage'
        }
    )
)
```

### 2.2. Types Definition

```typescript
// auth.types.ts
export interface User {
    id: string
    email: string
    name: string
    role: UserRole
}

export interface AuthState {
    user: User | null
    isAuthenticated: boolean
}

export interface AuthActions {
    setUser: (user: User | null) => void
    clearAuth: () => void
}
```

### 2.3. Selectors Definition

```typescript
// auth.selector.ts
import type { AuthStore } from './auth.types'

export const selectUser = (state: AuthStore) => state.user
export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated
export const selectUserRole = (state: AuthStore) => state.user?.role
```

---

## 3. USING STORES IN COMPONENTS

### 3.1. Import Pattern

```typescript
// ✅ CORRECT - Import store and selectors separately
import { useAuthStore } from '@/stores/auth/auth.store';
import { selectUser, selectIsAuthenticated } from '@/stores/auth/auth.selector';

export const UserMenu: FC = () => {
  const user = useAuthStore(selectUser);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  ...
};

// ❌ WRONG - Accessing entire store
const { user, isAuthenticated } = useAuthStore();
```

### 3.2. Actions Usage

```typescript
// ✅ CORRECT
const setUser = useAuthStore((state) => state.setUser)
const clearAuth = useAuthStore((state) => state.clearAuth)

const handleLogin = async () => {
    const user = await AuthService.login(credentials)
    setUser(user)
}
```

---

## 4. WHEN TO USE CONTEXT VS ZUSTAND

### 4.1. Use Zustand For:

- ✅ User authentication state
- ✅ Application-wide settings
- ✅ Notification/toast state
- ✅ Shopping cart, favorites
- ✅ Any state shared across multiple pages

### 4.2. Use Local State For:

- ✅ Form input values
- ✅ UI toggle states (modals, dropdowns)
- ✅ Temporary/ephemeral state
- ✅ Component-specific state

### 4.3. NEVER Use Context For:

- ❌ Global state management (use Zustand instead)
- ❌ Sharing data between unrelated components

---

## SUCCESS CRITERIA

✅ Every store has 3 files (store, selector, types)
✅ Components use selectors instead of direct access
✅ Actions are properly typed
✅ Persist middleware used when appropriate
✅ Context is NOT used for state management

---

**END OF STATE MANAGEMENT PROTOCOL**
