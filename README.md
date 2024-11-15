
# Song Market Project

## Hướng dẫn Build

### 1. Clone code
Để bắt đầu, clone project từ GitHub về máy tính của bạn:

```bash
git clone https://github.com/ddaapp996/song-market.git
```

### 2. Di chuyển vào thư mục project

```bash
cd song-market
```

### 3. Các bước Build

#### a. Build với Docker (khuyến khích)

1. **Cấu hình `.env` cho server**:
   - Mở file `server/.env` và thiết lập kết nối MongoDB:

     ```env
     MONGO_URI=mongodb://admin:password@mongodb:27017/song-market
     ```

2. **Build và khởi động các service với Docker Compose**:
   - Chạy lệnh sau để build và khởi động các container:

     ```bash
     docker-compose up -d --build
     ```

3. **Kết nối MongoDB**:
   - Host: `localhost`
   - Port: `27017`
   - Username: `admin`
   - Password: `password`
   - Database: `song-market`

4. **Chạy file seed data**:
   - Để thêm dữ liệu mẫu vào MongoDB, chạy lệnh sau:

     ```bash
     docker exec -it song-market-server bash
     ```

   - Sau khi vào container, chạy lệnh:

     ```bash
     node seed.js
     ```

5. **Hoàn thành và truy cập ứng dụng**:
   - Sau khi hoàn tất bước trên, bạn có thể truy cập ứng dụng tại: `http://localhost:3000`

#### b. Build thông thường (Không sử dụng Docker)

1. **Cấu hình `.env` cho server**:
   - Mở file `server/.env` và thiết lập kết nối MongoDB:

     ```env
     MONGO_URI=mongodb://admin:password@localhost:27017/song-market
     ```

2. **Build và khởi động MongoDB container**:
   - Chạy lệnh để build và khởi động chỉ container MongoDB:

     ```bash
     docker-compose build mongodb
     docker-compose up -d mongodb
     ```

3. **Chạy server**:
   - Di chuyển vào thư mục `server` và chạy các lệnh để thêm dữ liệu mẫu và khởi động server:

     ```bash
     cd server
     npm run start:seed  # Chạy để thêm dữ liệu mẫu vào DB
     npm run start       # Chạy server
     ```

4. **Chạy client**:
   - Di chuyển vào thư mục `client` và chạy:

     ```bash
     cd client
     npm run start       # Chạy ứng dụng client (frontend)
     ```

5. **Truy cập ứng dụng**:
   - Sau khi các bước trên hoàn tất, bạn có thể truy cập ứng dụng tại: `http://localhost:3000`

### 4. Các Lệnh Docker Compose

- **Khởi động tất cả các service**:

  ```bash
  docker-compose up -d
  ```

- **Dừng các service**:

  ```bash
  docker-compose down
  ```

- **Build lại các container**:

  ```bash
  docker-compose up -d --build
  ```

- **Xem log của MongoDB container**:

  ```bash
  docker-compose logs mongodb
  ```

- **Xem log của Server container**:

  ```bash
  docker-compose logs song-market-server
  ```

### 5. Các Lệnh NPM

- **Chạy server**:

  ```bash
  npm run start
  ```

- **Chạy seed data**:

  ```bash
  npm run seed
  ```

- **Chạy client**:

  ```bash
  npm run start
  ```

---
