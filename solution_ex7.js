/**
 * Môn học: [RL-IT103B-K25] - Xây dựng ứng dụng web với Javascript
 * Bài tập: Bài 3 - Session 4 - Xây dựng Hệ thống Quét Tồn kho & Cảnh báo Hết hàng Tự động
 * Tên file: solution_ex7.js
 */

// Bảng giá chuẩn theo quy định nghiệp vụ
const PRICE_TABLE = {
  'S': 35000,
  'M': 42000,
  'L': 48000,
  'T': 10000,
  'X': 0 // Món hủy
};

// Dữ liệu 3 bàn khách liên tiếp trong ca làm việc
const tablesOrders = [
  { tableId: 1, items: 'MLT' }, // M(42k) + L(48k) + T(10k) = 100k (Không vượt 100k)
  { tableId: 2, items: 'SSX' }, // S(35k) + S(35k) + X(0k) = 70k (Không vượt 100k)
  { tableId: 3, items: 'LLTT' } // L(48k) + L(48k) + T(10k) + T(10k) = 116k (> 100k, được giảm 10%)
];

let totalShiftRevenue = 0;

console.log('=== BAT DAU CA PHUC VU HIGHLANDS COFFEE ===\n');

// Vòng lặp ngoài: Duyệt qua từng bàn
for (let i = 0; i < tablesOrders.length; i++) {
  let currentTable = tablesOrders[i];
  let tableBill = 0;

  console.log('Dang xu ly: Ban so ' + currentTable.tableId + ' (Don hang: ' + currentTable.items + ')');

  // Vòng lặp trong: Duyệt qua từng ký tự món ăn trong chuỗi của bàn
  for (let j = 0; j < currentTable.items.length; j++) {
    let itemCode = currentTable.items[j];

    // Kiểm tra nếu là mã hủy món thì bỏ qua
    if (itemCode === 'X') {
      console.log('  -> Phat hien ma huy X, bo qua mon nay (continue).');
      continue;
    }

    // Kiểm tra mã món hợp lệ trong bảng giá
    if (PRICE_TABLE.hasOwnProperty(itemCode)) {
      let itemPrice = PRICE_TABLE[itemCode];
      tableBill += itemPrice;
      console.log('  -> Mon [' + itemCode + ']: +' + itemPrice.toLocaleString('vi-VN') + ' VNĐ');
    } else {
      console.log('  -> Canh bao: Ma mon [' + itemCode + '] khong hop le!');
    }
  }

  let originalTableBill = tableBill;

  // Quy tắc nghiệp vụ: Hóa đơn trên 100.000 VNĐ được giảm ngay 10%
  if (tableBill > 100000) {
    let discount = tableBill * 0.1;
    tableBill -= discount;
    console.log('  -> Hoa đơn dat ' + originalTableBill.toLocaleString('vi-VN') + ' VNĐ (> 100k), ap dung giam gia 10% (-' + discount.toLocaleString('vi-VN') + ' VNĐ)');
  }

  console.log('=> Thanh tien thuc thu Ban ' + currentTable.tableId + ': ' + tableBill.toLocaleString('vi-VN') + ' VNĐ\n');

  // Cộng dồn vào doanh thu tổng ca làm việc
  totalShiftRevenue += tableBill;
}

console.log('========================================');
console.log('TONG DOANH THU THUC THU CA LAM VIEC: ' + totalShiftRevenue.toLocaleString('vi-VN') + ' VNĐ');
console.log('========================================');