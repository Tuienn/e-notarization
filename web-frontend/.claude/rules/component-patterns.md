# COMPONENT PATTERNS

**STATUS:** Active
**MISSION:** Standardize React component structure and organization.

Các quy tắc này định nghĩa cách tổ chức và viết React components trong dự án.

---

## 1. FILE ORGANIZATION

### 1.1. Component Directory Structure

**Standard Pattern:**

```text
src/components/pages/user-profile/
├── index.tsx              # Main component export
├── UserProfile.tsx        # Component implementation
├── UserProfileHeader.tsx  # Sub-components
├── UserProfileStats.tsx
└── user-profile.styles.ts # MUI styles (if needed)
```

**Simple Component:**

```text
src/components/common/buttons/
└── ActionButton.tsx       # Single file for simple components
```

### 1.2. Component Location Rules

| Type          | Location                        | Example                      |
| ------------- | ------------------------------- | ---------------------------- |
| Page-specific | `components/pages/[page-name]/` | User profile page components |
| Reusable UI   | `components/common/`            | Buttons, inputs, cards       |
| Layout        | `components/common/layout/`     | Header, Sidebar, Footer      |
| MUI wrappers  | `components/common/mui/`        | Customized MUI components    |

---

## 2. COMPONENT STRUCTURE

### 2.1. Standard Component Template

```typescript
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
```

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

```typescript
// ✅ CORRECT
interface UserCardProps {
  user: User;
  onSelect?: (userId: string) => void;
}

// ❌ WRONG
interface Props { ... }
interface IUserCard { ... }
```

### 3.2. Optional Props

Use `?` for optional props, avoid default values in destructuring:

```typescript
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
```

---

## 4. STATE MANAGEMENT IN COMPONENTS

### 4.1. Local State

Use `useState` only for UI-specific state:

```typescript
// ✅ CORRECT - UI state
const [isOpen, setIsOpen] = useState(false)
const [activeTab, setActiveTab] = useState(0)

// ❌ WRONG - Should use Zustand
const [user, setUser] = useState(null)
const [notifications, setNotifications] = useState([])
```

### 4.2. Global State Access

Use Zustand selectors:

```typescript
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

```typescript
// ✅ CORRECT
const handleClick = () => { ... };
const handleSubmit = (data: FormData) => { ... };
const handleDeleteUser = (userId: string) => { ... };

// ❌ WRONG
const onClick = () => { ... };
const submit = () => { ... };
const deleteUser = () => { ... };
```

### 5.2. Implementation

Always use arrow functions:

```typescript
// ✅ CORRECT
const handleClick = () => {
    console.log('clicked')
}

// ❌ WRONG - Not arrow function
function handleClick() {
    console.log('clicked')
}
```

---

## SUCCESS CRITERIA

✅ Components follow directory structure rules
✅ Props interfaces are properly named
✅ Event handlers use consistent naming
✅ State management is appropriate (local vs global)
✅ Component structure follows the standard order

---

**END OF COMPONENT PATTERNS**
