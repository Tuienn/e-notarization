# Hướng dẫn cho AI Agent

Chào mừng đến với dự án e-notarization web-frontend. Dưới đây là các chỉ dẫn cốt lõi để bạn có thể đóng góp một cách hiệu quả.

## Kiến trúc & Công nghệ chính

Dự án này được xây dựng trên một cấu trúc hiện đại và có quy tắc rõ ràng:

- **Framework**: React 19 + Vite (`rolldown-vite`).
- **Ngôn ngữ**: TypeScript.
- **UI**: Material-UI (MUI). Luôn ưu tiên sử dụng các component của MUI và system props (`sx`, `p`, `m`,...) thay vì thẻ HTML và CSS thuần.
- **Routing**: TanStack Router với cơ chế định tuyến dựa trên file trong `src/routes`.
- **Quản lý State**:
    - **Global State**: Chỉ sử dụng Zustand (`src/stores`). **Cấm tuyệt đối** dùng React Context cho việc quản lý state.
    - **API/Async State**: Sử dụng TanStack Query. Logic gọi API phải được đặt trong `src/services`.
- **Đa ngôn ngữ (i18n)**: Dùng `i18next` và hook `useTranslation`. File ngôn ngữ được đặt tại `src/i18n/locales/en`.

## Quy trình làm việc

- **Cài đặt**: Chạy `pnpm install`.
- **Chạy môi trường dev**: `pnpm dev`.
- **Tạo route mới**:
    1.  Tạo file component trang trong `src/components/pages/ten-trang`.
    2.  Tạo file route trong `src/routes/_layout/ten-trang.tsx` (nếu dùng layout chung) hoặc `src/routes/ten-trang.tsx` (nếu không).
    3.  Chạy `pnpm tsr generate` để cập nhật cây định tuyến. Lệnh này sẽ được chạy tự động khi dev server đang hoạt động.
- **Linting & Formatting**: Chạy `pnpm lint` và `pnpm format` trước khi commit.

## Quy tắc code quan trọng

- **Style**: **Bắt buộc** sử dụng Arrow Function cho tất cả components và hàm.
- **MUI Imports**: Luôn import sâu để tối ưu bundle.
    - **Đúng**: `import Button from '@mui/material/Button';`
    - **Sai**: `import { Button } from '@mui/material';`
- **Layout**: Sử dụng `<Stack>` cho layout flexbox và `<Box>` thay thế cho `<div>`.
- **API Services**: Logic gọi API trong `src/services` phải được viết dưới dạng `class` với các phương thức `static`.
- **Zustand Stores**: Mỗi store phải có 3 file: `*.store.ts` (định nghĩa store), `*.selector.ts` (tạo selector), và `*.types.ts` (định nghĩa kiểu dữ liệu).

## Cấu trúc thư mục cốt lõi

- `src/components/pages`: Components chỉ dành riêng cho một trang cụ thể.
- `src/components/common`: Components có thể tái sử dụng trên toàn ứng dụng.
- `src/routes`: Định nghĩa cấu trúc URL của ứng dụng.
- `src/services`: Nơi chứa logic giao tiếp với API backend.
- `src/stores`: Nơi quản lý state toàn cục bằng Zustand.

Vui lòng xem lại các hướng dẫn này. Có phần nào chưa rõ ràng hoặc cần bổ sung thêm thông tin để giúp bạn làm việc hiệu quả hơn không?
