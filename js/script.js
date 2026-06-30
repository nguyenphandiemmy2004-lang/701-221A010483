//***********
//BÀI TẬP 01
//***********
// Khởi tạo mảng dữ liệu gồm 5 sản phẩm mẫu
const products = [
    { id: 1, name: "Điện thoại iPhone 15 Pro Max", price: "29.990.000đ" },
    { id: 2, name: "Laptop ASUS ROG Strix G16", price: "34.490.000đ" },
    { id: 3, name: "Tai nghe chống ồn Sony WH-1000XM5", price: "6.490.000đ" },
    { id: 4, name: "Bàn phím cơ AKKO 3098B Plus", price: "1.890.000đ" },
    { id: 5, name: "Chuột Gaming Logitech G Pro X Superlight", price: "2.990.000đ" }
];

// Hàm render dữ liệu sản phẩm ra giao diện HTML
function renderProducts(data) {
    const container = document.getElementById('product-list');
    if (!container) return; // Bảo vệ code không bị lỗi khi chạy ở các trang HTML khác
    
    // Xóa sạch danh sách cũ trước khi render danh sách mới
    container.innerHTML = '';
    
    // TRƯỜNG HỢP KHÔNG TÌM THẤY: Hiển thị thông báo lỗi
    if (data.length === 0) {
        const errorMsg = document.createElement('p');
        errorMsg.className = 'error-msg';
        errorMsg.textContent = 'Không tìm thấy sản phẩm phù hợp với từ khóa của bạn!';
        container.appendChild(errorMsg);
        return;
    }

    // TRƯỜNG HỢP TÌM THẤY: Duyệt mảng và tạo các thẻ HTML
    data.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'product-item';
        
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        p.className = 'price';
        
        /* BẢO MẬT CHỐNG INJECTION: 
           Sử dụng textContent thay vì innerHTML để trình duyệt hiểu đây hoàn toàn là văn bản thô,
           ngăn chặn tuyệt đối việc hacker chèn các đoạn mã độc <script> phá hoại hệ thống.
        */
        h3.textContent = prod.name;
        p.textContent = prod.price;
        
        div.appendChild(h3);
        div.appendChild(p);
        container.appendChild(div);
    });
}

// Lắng nghe sự kiện người dùng nhập vào ô tìm kiếm
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            // Chuẩn hóa input: Chuyển chữ thường + Cắt bỏ khoảng trắng thừa 2 đầu
            const keyword = e.target.value.toLowerCase().trim();
            
            // Thực hiện lọc mảng không phân biệt hoa thường
            const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
            
            // Đổ lại dữ liệu sau khi lọc lên màn hình
            renderProducts(filtered);
        });
    }

    // Tự động kích hoạt hiển thị toàn bộ sản phẩm ngay khi vừa tải xong trang
    if (document.getElementById('product-list')) {
        renderProducts(products);
    }
});

// ==========================================
//  BÀI TẬP 2: VALIDATE FORM & LOCALSTORAGE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            // 1. Chặn hành vi tải lại trang mặc định của form khi submit
            e.preventDefault();
            
            // 2. Lấy giá trị từ các trường input
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const agree = document.getElementById('agree').checked;
            const msgContainer = document.getElementById('form-msg');

            // Đặt lại thông báo cũ (nếu có)
            msgContainer.textContent = '';
            msgContainer.className = '';

            // 3. Biểu thức chính quy (Regex) để kiểm tra tính hợp lệ
            // Kiểm tra email chuẩn cấu trúc (abc@domain.com)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            // Kiểm tra mật khẩu: tối thiểu 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số
            const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

            // 4. Tiến hành Validate logic đầu vào
            if (name === '') {
                showNotification(msgContainer, 'Vui lòng điền họ và tên!', 'error-msg');
                return;
            }

            if (!emailRegex.test(email)) {
                showNotification(msgContainer, 'Địa chỉ Email không hợp lệ (ví dụ: name@gmail.com)!', 'error-msg');
                return;
            }

            if (!passRegex.test(password)) {
                showNotification(msgContainer, 'Mật khẩu yếu! Cần ít nhất 8 ký tự gồm chữ hoa, chữ thường và số.', 'error-msg');
                return;
            }

            if (!agree) {
                showNotification(msgContainer, 'Bạn phải tích chọn đồng ý với điều khoản dịch vụ!', 'error-msg');
                return;
            }

            // 5. Nếu dữ liệu VALID -> Tiến hành đóng gói và lưu cục bộ (LocalStorage)
            /* LOGIC TƯ DUY BẢO MẬT: 
               LocalStorage lưu thông tin dạng văn bản thuần (Clear-text). Trong thực tế, 
               mật khẩu phải được băm (hash) ở phía server chứ không bao giờ lưu trực tiếp thế này. 
               Tuy nhiên theo yêu cầu đề bài, ta chuyển object sang chuỗi JSON và lưu cục bộ.
            */
            const userData = {
                name: name,
                email: email,
                password: password // Lưu chuỗi thô để đáp ứng yêu cầu của đề bài thực hành
            };

            localStorage.setItem('registeredUser', JSON.stringify(userData));

            // Hiển thị thông báo thành công và reset form
            showNotification(msgContainer, 'Đăng ký thành công! Thông tin đã được lưu vào LocalStorage.', 'success-msg');
            registerForm.reset();
        });
    }
});

// Hàm phụ bổ trợ hiển thị thông báo nhanh
function showNotification(element, message, className) {
    element.textContent = message;
    element.className = className;
}

// ==========================================================================
// BÀI TẬP 3: ĐỒNG HỒ ĐẾM NGƯỢC (COUNTDOWN TIMER)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const timerElement = document.getElementById('timer');
    
    if (timerElement) {
        let timeLeft = 10 * 60; // Thiết lập mốc 10 phút chuyển đổi ra giây (600 giây)
        
        // Quản lý biến Interval toàn cục trong phạm vi trang để dễ dàng xóa bỏ
        const countdownInterval = setInterval(() => {
            // Tính số phút và số giây còn lại từ tổng số giây
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;

            // Chuẩn hóa định dạng hiển thị luôn có 2 chữ số (MM:SS)
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            // Cập nhật text hiển thị ra ngoài màn hình
            timerElement.textContent = `${minutes}:${seconds}`;

            // HIỆU ỨNG CẢNH BÁO: Khi thời gian dưới 1 phút (60 giây), tự động thêm class CSS nhấp nháy đỏ
            if (timeLeft <= 60 && timeLeft > 0) {
                timerElement.classList.add('warning-animation');
            }
            
            // XỬ LÝ KHI HẾT GIỜ
            if (timeLeft <= 0) {
                /* LOGIC TƯ DUY TRÁNH MEMORY LEAK: 
                   Bắt buộc phải gọi clearInterval ngay khi thời gian chạm mốc 0. 
                   Nếu không xóa, trình duyệt sẽ tiếp tục lặp vô hạn hàm chạy ngầm này, 
                   gây tốn tài nguyên RAM và CPU của thiết bị người dùng.
                */
                clearInterval(countdownInterval);
                
                // Loại bỏ hiệu ứng nhấp nháy đỏ khi đã kết thúc
                timerElement.classList.remove('warning-animation');
                
                // Hiển thị modal alert thông báo hết giờ theo yêu cầu đề bài
                alert("Hết thời gian làm bài! Hệ thống tự động khóa.");
            }

            timeLeft--; // Giảm đi 1 giây sau mỗi chu kỳ lặp
        }, 1000); // Chu kỳ lặp 1000ms = 1 giây
    }
});
