# API SERVICE PROTOCOL

**STATUS:** Active
**MISSION:** Standardize backend communication and service layer implementation.

Các quy tắc này định nghĩa cách tổ chức và triển khai các service layer để giao tiếp với backend APIs. Tuân thủ các quy tắc này đảm bảo tính nhất quán và dễ bảo trì của code.

---

## 1. SERVICE STRUCTURE

### 1.1. File Organization

**DIRECTIVE:** Mọi service phải được đặt trong `src/services/[backend-name]/`:

```text
src/services/
├── gin/                    # Services cho Gin backend
│   ├── auth.service.ts
│   ├── user.service.ts
│   └── document.service.ts
└── shared/                 # Shared utilities
    ├── http-client.ts
    └── error-handler.ts
```

### 1.2. Implementation Pattern

**BẮT BUỘC** sử dụng class với static methods:

```typescript
// ✅ CORRECT
export class AuthService {
  private static readonly BASE_URL = '/api/v1/auth';

  static login = async (credentials: LoginDto): Promise<AuthResponse> => {
    const response = await httpClient.post(`${this.BASE_URL}/login`, credentials);
    return response.data;
  };

  static logout = async (): Promise<void> => {
    await httpClient.post(`${this.BASE_URL}/logout`);
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

```typescript
// ✅ CORRECT
export const useQueryUserProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: UserService.getProfile,
  });
};

// ❌ WRONG - Vague naming
export const useGetUser = () => { ... };
```

### 2.2. Mutation Naming Convention

**Pattern:** `useMutation[EntityName][Action]`

```typescript
// ✅ CORRECT
export const useMutationUserUpdate = () => {
    return useMutation({
        mutationFn: UserService.updateProfile
    })
}
```

---

## 3. ERROR HANDLING

### 3.1. Service Layer

Services **KHÔNG** xử lý errors. Để errors bubble up để TanStack Query xử lý:

```typescript
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

```typescript
export const useMutationLogin = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: AuthService.login,
        onSuccess: (data) => {
            // Handle success
            navigate('/dashboard')
        },
        onError: (error: ApiError) => {
            // Handle error
            notificationStore.error(error.message)
        }
    })
}
```

---

## 4. TYPE DEFINITIONS

### 4.1. Request/Response Types

**DIRECTIVE:** Define trong `src/types/[entity].types.ts`:

```typescript
// src/types/auth.types.ts
export interface LoginDto {
    email: string
    password: string
}

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: UserProfile
}

export interface UserProfile {
    id: string
    email: string
    name: string
    role: UserRole
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    NOTARY = 'notary'
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
