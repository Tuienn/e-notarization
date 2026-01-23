# MISSION BRIEFING: E-NOTARIZATION PROJECT

**STATUS:** Active
**MISSION:** Develop the `web-frontend` for the E-Notarization platform.

Nhiệm vụ của bạn là hỗ trợ phát triển giao diện người dùng cho dự án. Tài liệu này là bộ quy tắc và chỉ thị cốt lõi (Core Directives) mà bạn phải tuân thủ tuyệt đối để đảm bảo sự nhất quán, hiệu quả và chất lượng của mã nguồn.

Mọi đoạn code bạn tạo ra phải tuân theo các quy tắc dưới đây.

---

## 1. CORE DIRECTIVES: TECH STACK & LIBRARIES

Đây là những công nghệ nền tảng đã được lựa chọn. Bạn chỉ được phép sử dụng chúng.

- **Routing:** TanStack Router (File-based routing)
- **State Management:** Zustand (Directives: **KHÔNG** sử dụng Context API cho state)
- **API/Async State:** TanStack Query
- **UI Library:** Material UI (MUI)
- **Language:** TypeScript
- **I18n:** i18next (`useTranslation` hook)

---

## 2. INTEL: PROJECT DIRECTORY STRUCTURE

Đây là bản đồ chi tiết của khu vực hoạt động. Nắm vững cấu trúc này để điều hướng và đặt các file đúng vị trí.

```text
src/
├── assets/                 # Directive: Chứa tài nguyên tĩnh (ảnh, fonts, global css).
├── components/             # Directive: Chứa UI Components.
│   ├── common/             # Component tái sử dụng, phân loại theo mục đích.
│   │   ├── layout/         # Layout components (Header, Sidebar).
│   │   └── mui/            # Wrapper/Custom MUI components.
│   ├── pages/              # Component đặc thù cho từng trang (tách biệt logic UI).
│   ├── providers/          # React Context Providers (Theme, Query).
│   └── store/              # UI Component kết nối trực tiếp với Store (VD: NotificationHost).
├── constants/              # Directive: Chứa hằng số, cấu hình tĩnh (enum, API config).
├── i18n/                   # Directive: Cấu hình đa ngôn ngữ. Mặc định là 'en'.
├── lib/                    # Directive: Thư viện tiện ích cốt lõi.
│   ├── handleCrypto.ts     # Xử lý mã hóa.
│   ├── handleStorage.ts    # Xử lý storage (localStorage/sessionStorage).
│   └── utils.ts            # Tiện ích chung.
│   └── format.ts           # Format dữ liệu.
│   └── validator.ts        # Kiểm tra dữ liệu đầu vào.
├── routes/                 # Directive: Định nghĩa trang & routing (TanStack Router).
│   ├── __root.tsx          # Root layout.
│   ├── _layout.tsx         # Layout chung cho các route con.
│   ├── _layout/            # Folder chứa các route sử dụng layout chung.
│   │   ├── index.tsx       # Trang chủ (/).
│   │   └── personal.tsx    # Trang cá nhân (/personal).
│   ├── login.tsx           # Trang login (không dùng layout chung).
│   ├── routeTree.gen.ts    # File sinh tự động. **KHÔNG** chỉnh sửa thủ công.
│   └── router.tsx          # Router component.
├── services/               # Directive: Logic gọi API & giao tiếp Backend.
│   └── gin/                # Services cho Gin backend.
│       └── auth.service.ts # Logic API viết theo class + static function.
├── stores/                 # Directive: Quản lý trạng thái toàn cục (Zustand).
│   ├── auth/               # Auth Login/User state.
│   ├── notification/       # Toast/Notification state.
│   └── token/              # Token management.
└── types/                  # Directive: Định nghĩa kiểu dữ liệu TypeScript.
```

---

## 3. RULES OF ENGAGEMENT (CODING CONVENTIONS)

Đây là các quy tắc bắt buộc khi thực thi nhiệm vụ. Vi phạm sẽ dẫn đến thất bại.

### 3.1. General Rules

- **Function Style:** **BẮT BUỘC** sử dụng Arrow Function cho toàn bộ component và hàm.
- **Comments:** Hạn chế tối đa. Code phải tự mô tả (self-documenting).
- **State Management:**
    - Chỉ sử dụng Zustand cho global state.
    - **CẤM TUYỆT ĐỐI** sử dụng React Context Provider để quản lý state.

### 3.2. Material UI (MUI) Implementation

- **Imports:** Tuân thủ `autoImportSpecifierExcludeRegexes: ["^@mui/[^/]+$"]`. Luôn import sâu vào từng module (`@mui/material/Button` thay vì `@mui/material`).
- **Layout:**
    - Sử dụng `Box`, `Stack` thay thế cho `div`.
    - Sử dụng MUI System Props trực tiếp ví dụ `<Box p={2} />` thay vì `style={{ padding: '16px' }}`.
    - Ưu tiên `Stack` cho layout flexbox thay vì `<Box display="flex">`.
- **Component Usage:** Ưu tiên tối đa các component của MUI, hạn chế thẻ HTML thô.

### 3.3. API & Data Fetching (TanStack Query)

- **Naming Convention:**
    - **Query:** `useQuery` + `[Mục đích]` (VD: `useQueryUserProfile`).
    - **Mutation:** `useMutation` + `[Mục đích]` (VD: `useMutationLogin`).
- **Implementation:**
    - Logic gọi API (fetcher) phải được tách biệt trong thư mục `services/`.
    - `useQuery` **BẮT BUỘC** phải định nghĩa `queryKey` dạng array rõ ràng.
    - Để truy cập query state từ component khác: Sử dụng `useQueryClient` và `queryKey`.

### 3.4. Internationalization (i18n)

- Sử dụng hook `useTranslation`.
- Mỗi route/page phải có file JSON dịch riêng trong `src/i18n/locales/en/`.
- Nội dung JSON phải được gom nhóm (nested object).

---

## 4. AVAILABLE ARSENAL (MUI COMPONENTS)

Đây là danh sách các công cụ (components) được cấp phép sử dụng. Hãy chọn đúng công cụ cho từng nhiệm vụ.

> **CRITICAL DIRECTIVE:** Nắm vững danh sách này để lựa chọn component phù hợp nhất. Tránh sử dụng các component không có trong danh sách hoặc đã bị `deprecated`.

### 🔹 SURFACES

- **Accordion**: Hiển thị nội dung dạng mở/đóng.
- **App Bar**: Thanh điều hướng trên cùng.
- **Card**: Khối nội dung độc lập.
- **Paper**: Bề mặt nền có elevation.

### 🔹 NAVIGATION

- **Bottom Navigation**: Điều hướng chính ở cạnh dưới (mobile-first).
- **Breadcrumbs**: Hiển thị đường dẫn phân cấp.
- **Drawer**: Menu trượt từ cạnh màn hình.
- **Link**: Điều hướng nội bộ hoặc liên kết ngoài.
- **Menu**: Danh sách hành động bật ra từ trigger.
- **Pagination**: Điều hướng giữa các trang dữ liệu.
- **Speed Dial**: Nút hành động nhanh.
- **Stepper**: Hiển thị tiến trình theo bước.
- **Tabs**: Chuyển đổi giữa các nhóm nội dung.

### 🔹 LAYOUT

- **Box**: Wrapper đa năng, thay thế `div`.
- **Container**: Giới hạn chiều rộng nội dung.
- **Grid**: Layout dạng lưới 2 chiều.
- **Stack**: Layout 1 chiều (row/column) với spacing tự động.
- **Image List**: Hiển thị danh sách hình ảnh.

### 🔹 UTILS

> **WARNING:** Chỉ sử dụng `useMediaQuery`. Các tiện ích khác trong mục này yêu cầu sự cho phép đặc biệt trước khi dùng.

- **useMediaQuery**: Hook kiểm tra breakpoint / media query.

### 🔹 INPUTS

- **Autocomplete**: Input có gợi ý tìm kiếm.
- **Button**: Nút thực hiện hành động.
- **Button Group**: Nhóm các button liên quan.
- **Checkbox**: Chọn nhiều giá trị.
- **Floating Action Button (FAB)**: Nút hành động chính nổi bật.
- **Radio Group**: Chọn một giá trị.
- **Rating**: Đánh giá bằng sao.
- **Select**: Dropdown chọn giá trị.
- **Slider**: Chọn giá trị bằng thanh kéo.
- **Switch**: Bật/tắt trạng thái.
- **Text Field**: Input văn bản đa dụng.
- **Toggle Button**: Nút chọn trạng thái on/off.

### 🔹 DATA DISPLAY

- **Avatar**: Ảnh đại diện.
- **Badge**: Gắn nhãn trạng thái/số lượng.
- **Chip**: Hiển thị tag, nhãn.
- **Divider**: Đường phân cách.
- **Icons**: Bộ icon SVG.
- **List**: Danh sách dạng cột.
- **Table**: Hiển thị dữ liệu dạng bảng.
- **Tooltip**: Gợi ý khi hover.
- **Typography**: Hiển thị và định dạng văn bản.

> **Field Manual Note:** `TextField` là component cực kỳ linh hoạt. Hãy sử dụng nó thay cho `Input`, `InputBase`, `OutlinedInput`, `FilledInput`, `Standard Input`, và `Textarea` (với prop `multiline`).

---

## 5. PROTOCOL: CREATING NEW ROUTES

Tuân thủ quy trình sau để mở rộng bản đồ hoạt động của ứng dụng.

### 1. Route sử dụng MainLayout (Standard Operation)

Để tạo một route mới (ví dụ: `/settings`) sử dụng `MainLayout` chung:

1.  **Tạo file route**: `src/routes/_layout/settings.tsx`.
2.  **Tạo component trang**: `src/components/pages/settings/index.tsx`.
3.  **Cập nhật Route Tree**: Chạy lệnh `pnpm tsr generate` để TanStack Router tự động cập nhật `routeTree.gen.ts`.

### 2. Route không sử dụng MainLayout (Special Operation)

Để tạo một route mới (ví dụ: `/register`) không sử dụng `MainLayout`:

1.  **Tạo file route**: `src/routes/register.tsx`.
2.  **Tạo component trang**: `src/components/pages/register/index.tsx`.
3.  **Cập nhật Route Tree**: Chạy lệnh `pnpm tsr generate`.
