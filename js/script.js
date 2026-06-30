// ==========================================================================
// 1. LOGIC BÀI TẬP 1: DANH SÁCH SẢN PHẨM & TÌM KIẾM
// ==========================================================================
const products = [
    { id: 1, name: "Điện thoại iPhone 15 Pro Max", price: "29.990.000đ" },
    { id: 2, name: "Laptop ASUS ROG Strix G16", price: "34.490.000đ" },
    { id: 3, name: "Tai nghe chống ồn Sony WH-1000XM5", price: "6.490.000đ" },
    { id: 4, name: "Bàn phím cơ AKKO 3098B Plus", price: "1.890.000đ" },
    { id: 5, name: "Chuột Gaming Logitech G Pro X Superlight", price: "2.990.000đ" }
];

function renderProducts(data) {
    const container = document.getElementById('product-list');
    if (!container) return; // Nếu không ở trang bài 1, thoát ra ngay để không lỗi chéo
    
    container.innerHTML = '';
    if (data.length === 0) {
        container.innerHTML = '<p class="error-msg">Không tìm thấy sản phẩm phù hợp!</p>';
        return;
    }

    data.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'product-item';
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        p.className = 'price';
        
        h3.textContent = prod.name;
        p.textContent = prod.price;
        
        div.appendChild(h3);
        div.appendChild(p);
        container.appendChild(div);
    });
}

// ==========================================================================
// KHỞI CHẠY HỆ THỐNG KHI TRANG TẢI XONG (DOM CONTENT LOADED)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {

    // --- CHẠY BÀI TẬP 1 ---
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search-input');

    if (productList) {
        renderProducts(products); // Tự động hiển thị sản phẩm khi mở bài 1
    }
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const keyword = e.target.value.toLowerCase().trim();
            const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
            renderProducts(filtered);
        });
    }

    // --- CHẠY BÀI TẬP 2 ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const agree = document.getElementById('agree').checked;
            const msgContainer = document.getElementById('form-msg');

            if (!msgContainer) return;
            msgContainer.textContent = ''; msgContainer.className = '';

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

            if (!name) { msgContainer.textContent = 'Vui lòng điền họ và tên!'; msgContainer.className = 'error-msg'; return; }
            if (!emailRegex.test(email)) { msgContainer.textContent = 'Email không hợp lệ!'; msgContainer.className = 'error-msg'; return; }
            if (!passRegex.test(password)) { msgContainer.textContent = 'Mật khẩu yếu!'; msgContainer.className = 'error-msg'; return; }
            if (!agree) { msgContainer.textContent = 'Bạn phải đồng ý với điều khoản!'; msgContainer.className = 'error-msg'; return; }

            const userData = { name, email, password };
            localStorage.setItem('registeredUser', JSON.stringify(userData));
            msgContainer.textContent = 'Đăng ký thành công!';
            msgContainer.className = 'success-msg';
            registerForm.reset();
        });
    }

    // --- CHẠY BÀI TẬP 3 (ĐỒNG HỒ ĐẾM NGƯỢC) ---
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        let timeLeft = 10 * 60; // 10 phút đổi ra giây
        
        const countdownInterval = setInterval(() => {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;

            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            timerElement.textContent = `${minutes}:${seconds}`;

            if (timeLeft <= 60 && timeLeft > 0) {
                timerElement.classList.add('warning-animation');
            }

            if (timeLeft <= 0) {
                clearInterval(countdownInterval); // Dọn dẹp bộ nhớ chống Memory Leak
                timerElement.classList.remove('warning-animation');
                alert("Hết thời gian làm bài!");
            }
            timeLeft--;
        }, 1000);
    }
});
