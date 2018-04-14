'use strict';

module.exports = class FailGetTokenError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'FailGetTokenError';
  }
}