const { Transform } = require('stream');
const cipher = require('./cipher.js');

module.exports = class Transformer extends Transform {
  constructor(shift, action) {
    super();
    this.action = action;
    this.shift = shift;
  }
  _transform(text, coding, callback) {
    try{
      if(!!this.action && !!this.shift) {
        this.push(cipher(text, this.action, this.shift), coding);
        callback();
      } else {
        if(!this.action && !this.shift) {
          throw 'Action and shift do not exist.'
        } 
        if(!this.action) {
          throw 'Action do not exist.'
        }
        if(!!!this.shift) {
          throw 'Shift do not exist.'
        }  
      } 
    } catch (err) {
      callback(err);
    }
  }
};
