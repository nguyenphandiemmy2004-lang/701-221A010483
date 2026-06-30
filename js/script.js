// 1. Khởi tạo mảng dữ liệu ít nhất 5 sản phẩm
const products = [
    { id: 1, name: "Điện thoại iPhone 15 Pro Max", price: "29.990.000đ" },
    { id: 2, name: "Laptop ASUS ROG Strix G16", price: "34.490.000đ" },
    { id: 3, name: "Tai nghe chống ồn Sony WH-1000XM5", price: "6.490.000đ" },
    { id: 4, name: "Bàn phím cơ AKKO 3098B Plus", price: "1.890.000đ" },
    { id: 5, name: "Chuột Gaming Logitech G Pro X Superlight", price: "2.990.000đ" }
];

// 2. Hàm hiển thị sản phẩm lên giao diện
function renderProducts(data) {
    const container = document.getElementById('product-list');
    if (!container) return; // Bảo vệ nếu không ở đúng trang bt01
    
    // Xóa danh sách cũ trước khi render mới
    container.innerHTML = '';
    
    // Nếu mảng trống -> Hiển thị thông báo lỗi
    if (data.length === 0) {
        const errorMsg = document.createElement('p');
        errorMsg.className = 'error-msg';
        errorMsg.textContent = 'Không tìm thấy sản phẩm phù hợp với từ khóa của bạn!';
        container.appendChild(errorMsg);
        return;
    }

    // Duyệt qua từng sản phẩm và tạo layout
    data.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'product-item';
        
        // Tạo các thẻ con
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        p.className = 'price';
        
        /* BẢO MẬT INJECTION: 
           Sử dụng textContent thay vì gán trực tiếp innerHTML từ dữ liệu thô.
           Điều này giúp chặn hoàn toàn việc thực thi các mã script độc hại (XSS).
        */
        h3.textContent = prod.name;
        p.textContent = prod.price;
        
        // Gắn vào thẻ bọc ngoài
        div.appendChild(h3);
        div.appendChild(p);
        container.appendChild(div);
    });
}

// 3. Xử lý sự kiện tìm kiếm tối ưu
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        // Chuyển về chữ thường và loại bỏ khoảng trắng thừa ở 2 đầu để tối ưu tìm kiếm
        const keyword = e.target.value.toLowerCase().trim();
        
        // Lọc không phân biệt hoa thường
        const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
        
        // Render lại danh sách đã lọc
        renderProducts(filtered);
    });
}

// Chạy khởi tạo danh sách ngay khi tải trang bài tập 1
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-list')) {
        renderProducts(products);
    }
});
