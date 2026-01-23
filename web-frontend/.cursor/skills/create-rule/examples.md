# Complete Rule File Examples

This file provides complete, ready-to-use examples for different types of rule files.

## Example 1: API Service Protocol

**File:** `.claude/rules/api-service-protocol.md`
**Purpose:** Standardize how backend API services are implemented

```markdown
# API SERVICE PROTOCOL

**STATUS:** Active
**MISSION:** Standardize backend communication and service layer implementation.

Các quy tắc này định nghĩa cách tổ chức và triển khai các service layer để giao tiếp với backend APIs. Tuân thủ các quy tắc này đảm bảo tính nhất quán và dễ bảo trì của code.

---

## 1. SERVICE STRUCTURE

### 1.1. File Organization

**DIRECTIVE:** Mọi service phải được đặt trong `src/services/[backend-name]/`:

\`\`\`text
src/services/
├── gin/ # Services cho Gin backend
│ ├── auth.service.ts
│ ├── user.service.ts
│ └── document.service.ts
└── shared/ # Shared utilities
├── http-client.ts
└── error-handler.ts
\`\`\`

### 1.2. Implementation Pattern

**BẮT BUỘC** sử dụng class với static methods:

\`\`\`typescript
// ✅ CORRECT
export class AuthService {
private static readonly BASE_URL = '/api/v1/auth';

static login = async (credentials: LoginDto): Promise<AuthResponse> => {
const response = await httpClient.post(\`\${this.BASE_URL}/login\`, credentials);
return response.data;
};

static logout = async (): Promise<void> => {
await httpClient.post(\`\${this.BASE_URL}/logout\`);
};
}

// ❌ WRONG - Not using class
export const login = async (credentials: LoginDto) => { ... };
export const logout = async () => { ... };
```

---

## 2. INTEGRATION WITH TANSTACK QUERY

### 2.1. Query Naming Convention

**Pattern:** `useQuery[EntityName][Action]`

\`\`\`typescript
// ✅ CORRECT
export const useQueryUserProfile = () => {
return useQuery({
queryKey: ['user', 'profile'],
queryFn: UserService.getProfile,
});
};

// ❌ WRONG - Vague naming
export const useGetUser = () => { ... };
\`\`\`

### 2.2. Mutation Naming Convention

**Pattern:** `useMutation[EntityName][Action]`

\`\`\`typescript
// ✅ CORRECT
export const useMutationUserUpdate = () => {
return useMutation({
mutationFn: UserService.updateProfile,
});
};

```

---

## 3. ERROR HANDLING

### 3.1. Service Layer

Services **KHÔNG** xử lý errors. Để errors bubble up để TanStack Query xử lý:

\`\`\`typescript
// ✅ CORRECT
static getProfile = async (): Promise<UserProfile> => {
  const response = await httpClient.get('/api/users/profile');
  return response.data;
};

// ❌ WRONG - Handling errors in service
static getProfile = async (): Promise<UserProfile | null> => {
  try {
    const response = await httpClient.get('/api/users/profile');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
```

### 3.2. Query/Mutation Level

Xử lý errors trong `onError` callback:

\`\`\`typescript
export const useMutationLogin = () => {
const navigate = useNavigate();

return useMutation({
mutationFn: AuthService.login,
onSuccess: (data) => {
// Handle success
navigate('/dashboard');
},
onError: (error: ApiError) => {
// Handle error
notificationStore.error(error.message);
},
});
};

```

---

## 4. TYPE DEFINITIONS

### 4.1. Request/Response Types

**DIRECTIVE:** Define trong `src/types/[entity].types.ts`:

\`\`\`typescript
// src/types/auth.types.ts
export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  NOTARY = 'notary',
}
```

---

## SUCCESS CRITERIA

✅ All API calls are centralized in service classes
✅ Services use arrow functions for methods
✅ Query keys follow naming conventions
✅ Errors are handled at query/mutation level
✅ Types are properly defined and imported

---

**END OF API SERVICE PROTOCOL**

````

## Example 2: Component Patterns

**File:** `.claude/rules/component-patterns.md`
**Purpose:** Define how to structure React components

```markdown
# COMPONENT PATTERNS

**STATUS:** Active
**MISSION:** Standardize React component structure and organization.

Các quy tắc này định nghĩa cách tổ chức và viết React components trong dự án.

---

## 1. FILE ORGANIZATION

### 1.1. Component Directory Structure

**Standard Pattern:**

\`\`\`text
src/components/pages/user-profile/
├── index.tsx              # Main component export
├── UserProfile.tsx        # Component implementation
├── UserProfileHeader.tsx  # Sub-components
├── UserProfileStats.tsx
└── user-profile.styles.ts # MUI styles (if needed)
\`\`\`

**Simple Component:**

\`\`\`text
src/components/common/buttons/
└── ActionButton.tsx       # Single file for simple components
\`\`\`

### 1.2. Component Location Rules

| Type | Location | Example |
|------|----------|---------|
| Page-specific | `components/pages/[page-name]/` | User profile page components |
| Reusable UI | `components/common/` | Buttons, inputs, cards |
| Layout | `components/common/layout/` | Header, Sidebar, Footer |
| MUI wrappers | `components/common/mui/` | Customized MUI components |

---

## 2. COMPONENT STRUCTURE

### 2.1. Standard Component Template

\`\`\`typescript
import { FC } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface UserProfileProps {
  userId: string;
  onEdit?: () => void;
}

export const UserProfile: FC<UserProfileProps> = ({ userId, onEdit }) => {
  // 1. Hooks first
  const { data, isLoading } = useQueryUserProfile(userId);
  const { t } = useTranslation();

  // 2. Event handlers
  const handleEdit = () => {
    onEdit?.();
  };

  // 3. Early returns for loading/error states
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // 4. Main render
  return (
    <Stack spacing={2}>
      <Typography variant="h4">{data?.name}</Typography>
      <Button onClick={handleEdit}>
        {t('profile.edit')}
      </Button>
    </Stack>
  );
};
````

### 2.2. Component Order Rules

**DIRECTIVE:** Order sections in this sequence:

1. Imports (external → internal → types)
2. Type definitions (Props, State)
3. Component definition
4. Hooks (useState, useQuery, custom hooks)
5. Event handlers (arrow functions)
6. Helper functions
7. Early returns (loading, error states)
8. Main render logic

---

## 3. PROPS PATTERNS

### 3.1. Props Interface Naming

**Pattern:** `[ComponentName]Props`

\`\`\`typescript
// ✅ CORRECT
interface UserCardProps {
user: User;
onSelect?: (userId: string) => void;
}

// ❌ WRONG
interface Props { ... }
interface IUserCard { ... }
\`\`\`

### 3.2. Optional Props

Use `?` for optional props, avoid default values in destructuring:

\`\`\`typescript
// ✅ CORRECT
interface ButtonProps {
variant?: 'primary' | 'secondary';
disabled?: boolean;
}

export const CustomButton: FC<ButtonProps> = ({ variant = 'primary', disabled = false }) => {
...
};

// ❌ WRONG - Default in interface
interface ButtonProps {
variant: 'primary' | 'secondary'; // No default here
}
\`\`\`

---

## 4. STATE MANAGEMENT IN COMPONENTS

### 4.1. Local State

Use `useState` only for UI-specific state:

\`\`\`typescript
// ✅ CORRECT - UI state
const [isOpen, setIsOpen] = useState(false);
const [activeTab, setActiveTab] = useState(0);

// ❌ WRONG - Should use Zustand
const [user, setUser] = useState(null);
const [notifications, setNotifications] = useState([]);
\`\`\`

### 4.2. Global State Access

Use Zustand selectors:

\`\`\`typescript
// ✅ CORRECT
import { useAuthStore } from '@/stores/auth/auth.store';
import { selectUser } from '@/stores/auth/auth.selector';

export const UserMenu: FC = () => {
const user = useAuthStore(selectUser);
...
};

```

---

## 5. EVENT HANDLERS

### 5.1. Naming Convention

**Pattern:** `handle[Event][Target?]`

\`\`\`typescript
// ✅ CORRECT
const handleClick = () => { ... };
const handleSubmit = (data: FormData) => { ... };
const handleDeleteUser = (userId: string) => { ... };

// ❌ WRONG
const onClick = () => { ... };
const submit = () => { ... };
const deleteUser = () => { ... };
\`\`\`

### 5.2. Implementation

Always use arrow functions:

\`\`\`typescript
// ✅ CORRECT
const handleClick = () => {
  console.log('clicked');
};

// ❌ WRONG - Not arrow function
function handleClick() {
  console.log('clicked');
}
\`\`\`

---

## SUCCESS CRITERIA

✅ Components follow directory structure rules
✅ Props interfaces are properly named
✅ Event handlers use consistent naming
✅ State management is appropriate (local vs global)
✅ Component structure follows the standard order

---

**END OF COMPONENT PATTERNS**
```

## Example 3: State Management Protocol

**File:** `.claude/rules/state-management-protocol.md`
**Purpose:** Define Zustand store patterns

```markdown
# STATE MANAGEMENT PROTOCOL

**STATUS:** Active
**MISSION:** Standardize global state management with Zustand.

Các quy tắc này đảm bảo tính nhất quán trong cách tổ chức và sử dụng Zustand stores.

---

## 1. STORE STRUCTURE

### 1.1. Three-File Pattern

**MANDATORY:** Mỗi store phải có 3 files:

\`\`\`text
src/stores/[feature]/
├── [feature].store.ts # Store definition
├── [feature].selector.ts # Selectors
└── [feature].types.ts # TypeScript types
\`\`\`

**Example:**

\`\`\`text
src/stores/auth/
├── auth.store.ts
├── auth.selector.ts
└── auth.types.ts
\`\`\`

---

## 2. STORE IMPLEMENTATION

### 2.1. Store Definition Template

\`\`\`typescript
// auth.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, AuthActions } from './auth.types';

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
persist(
(set) => ({
// State
user: null,
isAuthenticated: false,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      clearAuth: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }

)
);
```

### 2.2. Types Definition

\`\`\`typescript
// auth.types.ts
export interface User {
id: string;
email: string;
name: string;
role: UserRole;
}

export interface AuthState {
user: User | null;
isAuthenticated: boolean;
}

export interface AuthActions {
setUser: (user: User | null) => void;
clearAuth: () => void;
}

```

### 2.3. Selectors Definition

\`\`\`typescript
// auth.selector.ts
import type { AuthStore } from './auth.types';

export const selectUser = (state: AuthStore) => state.user;
export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated;
export const selectUserRole = (state: AuthStore) => state.user?.role;
```

---

## 3. USING STORES IN COMPONENTS

### 3.1. Import Pattern

\`\`\`typescript
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

\`\`\`typescript
// ✅ CORRECT
const setUser = useAuthStore((state) => state.setUser);
const clearAuth = useAuthStore((state) => state.clearAuth);

const handleLogin = async () => {
  const user = await AuthService.login(credentials);
  setUser(user);
};
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

````

## Example 4: Testing Standards (Future)

**File:** `.claude/rules/testing-standards.md`
**Purpose:** Testing requirements and patterns (when needed)

```markdown
# TESTING STANDARDS

**STATUS:** Planned
**MISSION:** Ensure code quality through comprehensive testing.

[To be implemented when project reaches testing phase]

---

## 1. TEST ORGANIZATION

[Content here]

---

## 2. UNIT TESTING

[Content here]

---

## 3. INTEGRATION TESTING

[Content here]
````

---

## Quick Reference: When to Use Each Template

| Need                    | Template        | Filename Pattern               |
| ----------------------- | --------------- | ------------------------------ |
| Core architecture rules | Example 1 style | `core.md`                      |
| Library integration     | MUI-MCP style   | `[library]-integration.md`     |
| API patterns            | Example 1       | `api-service-protocol.md`      |
| Component structure     | Example 2       | `component-patterns.md`        |
| State management        | Example 3       | `state-management-protocol.md` |
| File organization       | Simple format   | `[area]-organization.md`       |
| Workflow process        | Protocol format | `[workflow]-protocol.md`       |
