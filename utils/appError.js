class appError extends Error {
  constructor() {
    super();
  }
  create(success, message, code) {
    this.success = success;
    this.message = message;
    this.code = code;
    return this;
  }
}

module.exports = new appError();
