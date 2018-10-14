const CODE = require('../constants/index');

const success = (message, data) => ({ code: CODE.SUCCESS, message, data });
const objectNotFound = message => ({ code: CODE.OBJECT_NOT_FOUND, message });
module.exports = { success, objectNotFound };
