# Cấu trúc Thư mục Dự án (`src/`)

Tài liệu này mô tả cấu trúc thư mục mã nguồn (`src`) của dự án, bao gồm vai trò của từng thư mục con và các tệp tin quan trọng.

## Tổng quan Cây Thư mục

```text
src/
├── assets/                 # Tài nguyên tĩnh (ảnh, fonts, global css)
├── components/             # UI Components
│   ├── common/             # Component tái sử dụng chia thành nhiều folder nhỏ theo mục đích
│   │   ├── layout/         # Layout components (Header, Sidebar)
│   │   └── mui/            # Wrapper/Custom MUI components
│   ├── pages/              # Component đặc thù của từng trang (tách biệt logic UI)
│   ├── providers/          # React Context Providers (Theme, Query)
│   └── store/              # UI Component kết nối Store (Tham khảo code của NotificationHost)
├── constants/              # Hằng số, cấu hình tĩnh (enum, API config)
├── i18n/                   # Cấu hình đa ngôn ngữ (translations), mặc định là en trong folder locales/en
├── lib/                    # Thư viện tiện ích cốt lõi, mỗi lần tạo file phải hỏi ý kiến tôi
│   ├── handleCrypto.ts     # Xử lý mã hóa
│   ├── handleStorage.ts    # Xử lý storage (localStorage/sessionStorage)
│   └── utils.ts            # Tiện ích chung
├── routes/                 # Định nghĩa trang & routing (TanStack Router)
│   ├── __root.tsx          # Root layout component
│   ├── index.tsx           # Trang chủ (/)
│   ├── personal.tsx        # Trang cá nhân (/personal)
│   └── routeTree.gen.ts    # File sinh tự động bởi TanStack Router
│   └── router.tsx          # Router component
├── services/               # Logic gọi API & giao tiếp Backend
│   └── gin/                # Services gọi đến Gin backend server (Có thể gọi đến nhiều bên API server)
│       └── auth.service.ts # Ví dụ: Service xác thực (follow theo cách viết file)
├── stores/                 # Quản lý trạng thái toàn cục (Zustand)
│   ├── auth/               # Auth Login/User state
│   ├── notification/       # Toast/Notification state
│   └── token/              # Token management
└── types/                  # Định nghĩa kiểu dữ liệu (TypeScript Interfaces/Types)
```
