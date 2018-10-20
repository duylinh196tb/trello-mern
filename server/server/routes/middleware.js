const jwt = require('jsonwebtoken');
const CODE = require('../constants/index');
const User = require('../models/user');

const isVerifiedToken = async (req, res, next) => {
  if (req.get('Authorization') === undefined) {
    return res.json({
      code: CODE.INVALID_TOKEN,
      message: 'Request thiếu dữ liệu Authorization & Access Token'
    });
  }

  const accessToken = req.get('Authorization');
  if (accessToken) {
    jwt.verify(accessToken, process.env.SECRET, async (err, decoded) => {
      if (err) {
        return res.json({
          code: CODE.INVALID_TOKEN,
          message: 'Lỗi! Không thể xác thực token',
          error: err.message
        });
      }

      const user = await User.findOne({
        baseToken: decoded.baseToken
      });

      if (user) {
        req.user = user;
        req.token = accessToken;
        next();
      } else {
        return res.json({
          code: CODE.INVALID_TOKEN,
          message: 'User không tồn tại trong hệ thống!'
        });
      }
    });
  } else {
    return res.json({
      code: CODE.INVALID_TOKEN,
      message: 'Access token không được để rỗng!'
    });
  }
};

const fieldValidation = (input, template) => {
  for (let item of template) {
    if (!Object.prototype.hasOwnProperty.call(input, item)) {
      return item;
    }
  }
  return null;
};

const requiredField = async (req, res, body, params, query, next) => {
  const bodyChecked = fieldValidation(req.body, body);
  const paramChecked = fieldValidation(req.params, params);
  const queryChecked = fieldValidation(req.query, query);

  if (bodyChecked) {
    res.json({
      code: CODE.MISSING_BODY,
      message: 'Lỗi thiếu dữ liệu',
      error: `Missing! You are missing body field: [${bodyChecked}]`
    });
  } else if (queryChecked) {
    res.json({
      code: CODE.MISSING_QUERY,
      message: 'Lỗi thiếu dữ liệu',
      error: `Missing! You are missing query field: [${queryChecked}]`
    });
  } else if (paramChecked) {
    res.json({
      code: CODE.MISSING_PARAMS,
      message: 'Lỗi thiếu dữ liệu',
      error: `Missing! You are missing params field: [${paramChecked}]`
    });
  } else {
    next();
  }
};

module.exports = { requiredField, isVerifiedToken };
