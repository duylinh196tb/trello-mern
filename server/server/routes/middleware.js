const { CODE } = require('../constants/index');

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

module.exports = { requiredField };
{
}

[];
