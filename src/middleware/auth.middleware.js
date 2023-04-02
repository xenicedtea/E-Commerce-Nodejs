const jwt = require('jsonwebtoken');

let checkAuthorization = (req, res, next) => {
  // Lấy token từ header Authorization
  const authHeader = req.headers.Authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Nếu không có token, trả về lỗi 401 Unauthorized
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Giải mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Lưu thông tin user đã xác thực vào request
    req.user = decoded;

    // Gọi hàm next để chuyển tiếp request sang middleware hoặc route kế tiếp
    next();
  } catch (error) {
    // Nếu giải mã không thành công, trả về lỗi 401 Unauthorized
    return res.status(401).json({ message: 'Unauthorized' });
  }
}


module.exports = {
    checkAuthorization
}