# MUI MCP INTEGRATION RULES

## MISSION: Optimize AI Assistance for Material UI Development

Các quy tắc này đảm bảo AI assistant sử dụng MUI MCP server để truy cập tài liệu chính thống và code examples từ Material UI.

---

## PROTOCOL: Using MUI MCP Server

Khi trả lời bất kỳ câu hỏi nào liên quan đến Material UI, **BẮT BUỘC** tuân thủ quy trình sau:

### Step 1: Fetch MUI Documentation

- **DIRECTIVE:** Sử dụng tool `useMuiDocs` để lấy tài liệu của package/component liên quan đến câu hỏi.
- **Target:** Tài liệu chính thống từ `@mui/material`, `@mui/system`, hoặc các package MUI khác.

### Step 2: Fetch Additional Documentation (If Needed)

- **DIRECTIVE:** Nếu cần thêm thông tin, sử dụng tool `fetchDocs` để lấy tài liệu bổ sung.
- **CRITICAL:** CHỈ sử dụng URLs có trong nội dung đã trả về từ Step 1.
- **FORBIDDEN:** KHÔNG tự tạo hoặc đoán URLs.

### Step 3: Iterate Until Complete

- Lặp lại Step 1-2 cho đến khi đã thu thập đủ tài liệu liên quan.
- Ưu tiên chất lượng thông tin từ nguồn chính thống.

### Step 4: Answer Using Fetched Content

- Sử dụng nội dung đã lấy để trả lời câu hỏi.
- **ALWAYS:** Trích dẫn nguồn và link tài liệu chính thức.
- **FORBIDDEN:** KHÔNG đưa ra thông tin không có trong tài liệu đã fetch.

---

## INTEGRATION WITH CORE DIRECTIVES

### Priority Order

1. **First:** Tuân theo core.md (Tech Stack, Coding Conventions).
2. **Second:** Sử dụng MUI MCP để lấy thông tin chính xác.
3. **Third:** Áp dụng best practices từ tài liệu chính thống.

### Example Workflow

**User asks:** "Làm thế nào để custom theme MUI với dark mode?"

**AI must:**

1. Call `useMuiDocs` cho package `@mui/material` topic `theming`.
2. Call `fetchDocs` nếu cần thêm thông tin về dark mode.
3. Trả lời dựa trên tài liệu chính thống.
4. Đảm bảo code example tuân thủ `core.md` (Arrow functions, TypeScript, etc.).

---

## SPECIAL DIRECTIVES FOR MUI COMPONENTS

### Before Suggesting Any MUI Component:

- **VERIFY:** Component có trong danh sách Section 4 của `core.md`.
- **CHECK:** Component không deprecated hoặc experimental.
- **FETCH:** Documentation từ MUI MCP nếu chưa chắc chắn về API.

### When Implementing MUI Code:

- **Import Style:** Tuân thủ deep imports (`@mui/material/Button` thay vì `@mui/material`).
- **Props Usage:** Ưu tiên System Props (`sx`, spacing props).
- **Layout:** Sử dụng `Box`, `Stack` thay vì HTML elements.

---

## TROUBLESHOOTING PROTOCOL

### If MUI MCP Tools Are Not Available:

1. Thông báo user cần cài đặt MUI MCP server.
2. Hướng dẫn setup theo [official guide](https://mui.com/material-ui/getting-started/mcp/).
3. Tiếp tục trả lời dựa trên kiến thức hiện có nhưng **WARNING** user rằng thông tin có thể không up-to-date.

### If MUI Documentation Conflicts with core.md:

- **PRIORITY:** `core.md` conventions luôn được ưu tiên.
- **ADAPT:** Điều chỉnh code examples từ MUI docs để phù hợp với project rules.
- **EXAMPLE:** Chuyển function declarations thành arrow functions.

---

## SUCCESS CRITERIA

✅ Mọi câu trả lời về MUI đều có nguồn từ tài liệu chính thống.
✅ Không có links bị 404 hoặc hallucination.
✅ Code examples tuân thủ cả MUI best practices và `core.md` rules.
✅ User có thể verify thông tin qua links được cung cấp.

---

**END OF MUI MCP INTEGRATION RULES**
