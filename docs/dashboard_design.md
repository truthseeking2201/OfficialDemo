# NODO AI Vault - User Dashboard Design

Below is a proposed 4-layer logic structure for the NODO AI Vault user dashboard. The document is written in Vietnamese as originally provided.

## 🧠 Cấu Trúc Logic 4 Tầng Cho Dashboard

| Tầng | Mục tiêu | Loại logic áp dụng | Output trong Dashboard UI |
| --- | --- | --- | --- |
| 1️⃣ | Xác định mục tiêu người dùng | Problem-driven logic: Họ muốn biết gì? | Tổng quan tài sản, lời/lỗ, quyền kiểm soát vốn |
| 2️⃣ | Diễn giải dữ liệu cá nhân hóa | Asset modeling logic: NDLP, cooldown, ROI | Bảng Vault, trạng thái cooldown, PnL từng vault |
| 3️⃣ | Theo dõi diễn biến tác vụ của AI | Causal chain logic: AI đã làm gì với vốn? | Lịch sử AI hoạt động có liên quan đến ví user |
| 4️⃣ | Phân tích tác động + hiệu suất | Impact-focused logic: Người dùng được gì? | APR thực tế, claim reward, referral dashboard |

---

## 🔍 Chi Tiết Theo Từng Tầng Logic

### 1️⃣ Tầng 1 – "Tôi đang ở đâu?"
Người dùng cần một cái nhìn tổng quát tức thì.

| Câu hỏi | Dữ liệu cần hiển thị |
| --- | --- |
| Tổng tài sản của tôi ở NODO là bao nhiêu? | TVL cá nhân (tổng giá trị các NDLP đang nắm giữ) |
| Tôi đã lời/lỗ bao nhiêu? | PnL = Current value – Initial deposit |
| Tôi đang tham gia bao nhiêu vault? | Số vault đang hold NDLP > 0 |
| Tôi có đang bị lock hoặc cooldown không? | Tổng số USDC đang chờ rút / thời gian còn lại |

Giao diện đề xuất: **Your NODO Overview**

### 2️⃣ Tầng 2 – "Tiền của tôi ở đâu?"
Xây dựng mô hình NDLP cho từng vault.

| Thành phần | Ý nghĩa logic | Hiển thị UI |
| --- | --- | --- |
| NDLP balance | NDLP trong ví tương ứng với từng vault | Cột NDLP trong Vault Table |
| Conversion rate | Chuyển đổi NDLP → USDC thời điểm hiện tại | Tính tự động: NDLP * rate = USD |
| APR | APR riêng của vault đó | Cột APR |
| Cooldown status | Trạng thái rút: pending / claimable / none | Icon trạng thái + đếm ngược / nút Claim |
| Withdrawable | Số USDC có thể claim ngay (sau cooldown) | Màu xanh, nút "Claim" bật |

Giao diện đề xuất: **Bảng Vault Holdings**

### 3️⃣ Tầng 3 – "AI đã làm gì với tiền của tôi?"
Theo chuỗi nhân – quả.

| Câu hỏi | Cách hiển thị |
| --- | --- |
| AI đã từng swap hoặc rebalance với NDLP tôi nắm giữ? | Bảng AI Activities lọc theo ví của user |
| Những giao dịch nào đã ảnh hưởng đến tài sản của tôi? | Mỗi dòng hoạt động liên quan đến vault user tham gia |
| Tôi có đang được chia lợi nhuận nào không? | Hiển thị ADD_PROFIT → số USD lợi nhuận ghi nhận |
| Đợt close gần nhất tôi bị IL bao nhiêu? | Panel reasoning AI (mở rộng row) → hiện IL estimate |

Giao diện đề xuất:
- Bảng **AI Vault Activity (your wallet only)**
- Expand-row reasoning logic hiển thị markdown ví dụ:
  > "The position was closed with 0.73% IL but $14 fee was harvested, net positive $9.7."

### 4️⃣ Tầng 4 – "Tôi đã nhận lại gì?"
Tác động thực – phần thưởng thực.

| Thành phần | Dữ liệu |
| --- | --- |
| Profit tổng đã nhận | Tổng PnL ghi nhận được từ các kỳ chốt lời (USDC) |
| APR thực tế của riêng tôi | PnL / Vốn * (365 / số ngày tham gia) |
| Claimable reward (nếu có) | Airdrop / referral / incentive |
| Referral performance | Mã giới thiệu, số người dùng mã, reward được chia |

Giao diện đề xuất:
- Section **My Earnings**
- Section **Referral Program**
- (Tùy chọn) mini leaderboard nội bộ

---

## 🔄 Các Luồng Tương Tác Điển Hình

1. **Sau khi đăng nhập**: người dùng thấy tổng tài sản, lời lãi, vault đang hold, trạng thái rút và hoạt động AI gần đây.
2. **Khi click vào vault**: người dùng thấy từng hành động AI (Add, Remove, Profit…), khoảng giá LP đã dùng và lý do AI chọn.
3. **Khi click vào withdraw**: NDLP được đổi ra USDC; nếu đang cooldown thì hiển thị đếm ngược, nếu claimable thì bật nút Claim.

---

## Kết Luận
Một dashboard tốt gói gọn những gì người dùng cần để ra quyết định:
- "Tôi đang lời hay lỗ?"
- "AI làm gì với tiền của tôi?"
- "Tôi có rút được không?"
- "Tôi có ai dùng referral của tôi không?"

