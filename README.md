# Bia Hơi Đất Mỏ · Bản đề xuất giao diện

Bản đề xuất website gửi **Bia Hơi Đất Mỏ**, quán lẩu, nướng và bia hơi có 3 cơ sở ở Hà Nội. Trang tập trung vào thực đơn và đặt bàn.

> **Bật bia sảng khoái, nhậu vui hết mình.**
> Đây là bản đề xuất, **không phải website chính thức** của quán. Đầu trang luôn có dải thông báo này. Form đặt bàn và ship không gửi đơn đi đâu, chỉ hiện màn hình xem trước kèm số hotline thật của cơ sở.

Tên quán, logo, ảnh, thực đơn, giá, combo, địa chỉ, hotline và ưu đãi lấy từ [biahoidatmo.com](https://www.biahoidatmo.com/) và các bảng menu đăng trên đó. Giá tính theo nghìn đồng, đã gồm VAT.

## Tính năng

- **Đầu trang:** ảnh sảnh của quán. Hai tay cầm cốc bia trượt vào cụng nhau, sau đó hiện chữ "2,3 Zô". Nút "Zô lần nữa!" để xem lại hiệu ứng.
- **Món mới ra lò:** dải thẻ cuộn ngang, trên máy tính giữ chuột kéo được và thả ra thì dừng gọn từng thẻ.
- **Thực đơn đầy đủ:** 117 món chia 11 nhóm.
  - Thanh nhóm món dính trên đầu khi cuộn. Trên máy tính có thể giữ chuột kéo ngang, có mép mờ và nút mũi tên khi còn nhóm bị khuất.
  - Ô tìm món, gõ không dấu cũng tìm được (ví dụ "ech" ra các món ếch).
  - Mỗi nhóm có thẻ ảnh món nổi bật và danh sách kiểu bảng menu.
  - Món quay theo lịch trong tuần ghi "Theo lịch quay", không có nút thêm.
- **Combo Đất Mỏ:** 6 combo cho nhóm 4–6 và 6–8 người. Thêm vào phiếu bằng một lần bấm.
- **Món đặt trước:** vịt trời, cá song, ngỗng ngan, gà Đông Tảo, cá lăng cá tầm, hải sản Quảng Ninh, dê, chép sông. Ghi giá theo thời vụ.
- **Ưu đãi dạng lót cốc:** bấm để lật xem điều kiện. Bên dưới có quy định hủy bàn sau 20 phút.
- **3 cơ sở:** địa chỉ, hotline có nút chép số, link chỉ đường Google Maps, nút đặt bàn ở cơ sở đó.
- **Phiếu gọi món:** kiểu giấy order viết tay.
  - Có tạm tính và chia tiền theo đầu người.
  - Trên máy tính, phiếu nằm góc phải dưới. Trên điện thoại, phiếu thành thanh ở đáy màn hình.
  - Phiếu được lưu lại khi tải lại trang (khóa `datmo-phieu` trong `localStorage`).
- **Đặt bàn kèm món:** chọn cơ sở, ngày, giờ, số người, khu vực (sảnh chung, phòng VIP, phòng tiệc) và đánh dấu có sinh nhật hay không. Form tự báo ưu đãi áp dụng được:
  - Giải Phóng (Tương Mai), trên 10 người: giảm 10% bill.
  - Giải Phóng, trên 15 người và có sinh nhật: tặng bánh sinh nhật.
  - Nguyễn Văn Lộc, trên 20 người: tặng món đặc biệt và giảm 5% bill.
- **Ship tận nơi:** địa chỉ, người nhận, cơ sở giao, giờ nhận.
- **Giao diện sáng/tối:** mặc định theo thiết bị. Nút mặt trăng/mặt trời đổi chế độ bằng hiệu ứng lan tròn và nhớ lựa chọn (khóa `datmo-theme`).
- Tôn trọng cài đặt giảm chuyển động của hệ điều hành. Nhắc không phục vụ đồ uống có cồn cho người dưới 18 tuổi và "đã uống rượu bia, không lái xe".

**Cố ý không đưa vào:**
- Nhóm "đồ rừng" (động vật hoang dã), món tiết canh và cá trình.
- Giờ mở cửa và giá bia, vì web của quán chưa công bố. Phần đồ uống ghi "gọi tại bàn, giá niêm yết tại quán".

Trang có thẻ `noindex` để công cụ tìm kiếm không đưa bản đề xuất này lên kết quả tìm kiếm thay cho trang chính thức của quán.

Không dùng framework hay bước build. Chỉ có HTML, CSS và JavaScript thuần. Font lấy từ Google Fonts: Oswald (tiêu đề), Nunito (nội dung), Pangolin (chữ viết tay trên phiếu order).

## Cấu trúc

```
index.html            Nội dung trang
favicon.ico           Biểu tượng tab (16, 32, 48 px), cắt từ huy hiệu trong logo
assets/css/style.css  Giao diện, màu sắc (token ở :root), animation
assets/js/main.js     Dữ liệu thực đơn, phiếu gọi món, đặt bàn, ship, sáng/tối
assets/img/           Logo, favicon, ảnh món và ảnh không gian
```

## Chạy thử trên máy

```bash
python3 -m http.server 8000
# rồi mở http://localhost:8000
```

## Đưa lên Vercel

Import repo này vào Vercel, chọn Framework Preset là **Other**, không cần lệnh build, thư mục output để mặc định. Mỗi lần đẩy lên nhánh `main`, Vercel tự triển khai lại.

## Sửa nội dung

Dữ liệu nằm ở đầu file `assets/js/main.js`:

| Hằng số    | Nội dung                                                                |
|------------|-------------------------------------------------------------------------|
| `CATS`     | 11 nhóm món: tên nhóm, dòng giới thiệu, ảnh nổi bật, danh sách món và giá |
| `BEST`     | Các món gắn nhãn Best                                                   |
| `NEW`      | Món mới ra lò                                                           |
| `COMBOS`   | 6 combo: số người, giá, các món                                         |
| `PRE`      | Món đặt trước                                                           |
| `BRANCHES` | 3 cơ sở: tên, khu vực, địa chỉ, hotline                                 |
| `PROMOS`   | Mặt trước và mặt sau của từng lót cốc ưu đãi                            |

- Món có giá `0` được hiểu là món theo lịch, không có nút thêm vào phiếu.
- Khung giờ đặt bàn sửa trong `SLOTS`, điều kiện ưu đãi sửa trong `promosNow()`.
- Màu và font nằm ở khối `:root` đầu file `assets/css/style.css`.

## Khi quán đồng ý dùng chính thức

1. Xóa khối `<div class="proposal">` đầu `index.html` và câu "Bản đề xuất giao diện…" ở chân trang.
2. Xóa thẻ `<meta name="robots" content="noindex, nofollow">`.
3. Nối phần xử lý `submit` của `#ban-form` và `#ship-form` trong `main.js` với hệ thống đặt bàn của quán, thay cho màn hình xem trước.
4. Bổ sung giờ mở cửa và giá đồ uống nếu quán muốn công bố.
