# Installation Instructions Calculator

## Tải code về máy

- C1: dùng git clone

  - B1: Tạo một thư mục (vd : CS526)
  - B2: Mở terminal và cd đến thư mục vừa tạo
  - B3: chạy lệnh sau:
    > git clone https://github.com/npk7264/Calculator.git

- C2: Tải code từ github

  - B1: Tạo một thư mục (vd : CS526)
  - B2: Truy cập vào link https://github.com/npk7264/Calculator
  - B3: Click vào code -> download zip

    <!-- ![](image_readme\1.png) -->

  - B4: Giải nén file vừa tải vào thư mục vừa tạo

## Chạy expo với docker

- B1: Bật terminal
- B2: Chạy lệnh sau:

  - `node` là tên image
  - `calculator` là tên container
  - `(dd*)` là đường dẫn thư mục chứa project của bạn

```powershell
docker run -u node -it --rm --name calculator -p 19000-19010:19000-19010 -v (dd\*):/current -w /current node:18-slim bash
```

- B3: cd vào thư mục Calculator
- B4: Chạy lệnh:

```powershell
npm install
```

- B5: Chạy lệnh:

```powershell
npm start
```

- B6: Tải app expo go trên điện thoại
- B7: Mở app expo go trên điện thoại
- B8: Tại mục `Enter URL manually` nhập:

  - Với `ip` là ip địa chỉ ip của máy tính
    > exp://ip:19000

- B9: Connect và sử dụng ứng dụng

---

# THÔNG TIN NHÓM N06

- Nguyễn Phúc Khang - 20520569
- Võ Trung Kiên - 20521492
- Bùi Duy Anh Đức - 20520047
- Hà Văn Linh - 20521529
