function apiRes(success, message, code, data = null) {
  return {
    success,
    message,
    code,
    data
  };
}

module.exports = {
  apiRes
};
