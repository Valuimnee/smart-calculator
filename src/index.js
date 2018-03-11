class SmartCalculator {
  constructor(initialValue) {
    // your implementation
    this.init = initialValue;
    this.numbers = new Array(2);
    this.signs = new Array(2);
  }

  add(number) {
    // your implementation
    if (this.signs[2]) {
      this.firePower();
    }
    if (this.signs[1]) {
      this.fireMultiplication();
      this.signs[1] = null;
      this.numbers[1] = null;
    }
    if (this.signs[0]) {
      this.fireAddition();
    }
    this.numbers[0] = number;
    this.signs[0] = '+';
    return this;
  }

  subtract(number) {
    // your implementation
    if (this.signs[2]) {
      this.firePower();
    }
    if (this.signs[1]) {
      this.fireMultiplication();
      this.signs[1] = null;
      this.numbers[1] = null;
    }
    if (this.signs[0]) {
      this.fireAddition();
    }
    this.numbers[0] = number;
    this.signs[0] = '-';
    return this;
  }

  multiply(number) {
    // your implementation
    if (this.signs[2]) {
      this.firePower();
    }
    if (this.signs[1]) {
      this.fireMultiplication();
    }
    this.numbers[1] = number;
    this.signs[1] = '*';
    return this;
  }

  devide(number) {
    // your implementation
    if (this.signs[2]) {
      this.firePower();
    }
    if (this.signs[1]) {
      this.fireMultiplication();
    }
    this.numbers[1] = number;
    this.signs[1] = '/';
    return this;
  }

  pow(number) {
    // your implementation
    if (this.signs[2]) {
      this.numbers.push(number);
    } else {
      this.signs[2] = '^';
      this.numbers.push(number);
    }
    return this;
  }

  fireAddition() {
    if (this.signs[0] === '+') {
      this.init += this.numbers[0];
    } else {
      this.init -= this.numbers[0];
    }
  }

  fireMultiplication() {
    if (this.signs[0]) {
      if (this.signs[1] === '*') {
        this.numbers[0] = this.numbers[0] * this.numbers[1];
      } else {
        this.numbers[0] = this.numbers[0] / this.numbers[1];
      }
    } else {
      if (this.signs[1] === '*') {
        this.init *= this.numbers[1];
      } else {
        this.init /= this.numbers[1];
      }
    }
  }

  firePower() {
    for (var i = this.numbers.length - 1; i > 2; i--) {
      this.numbers[i - 1] = Math.pow(this.numbers[i - 1], this.numbers[i]);
    }
    if (this.signs[1]) {
      this.numbers[1] = Math.pow(this.numbers[1], this.numbers[2]);
    } else if (this.signs[0]) {
      this.numbers[0] = Math.pow(this.numbers[0], this.numbers[2]);
    } else {
      this.init = Math.pow(this.init, this.numbers[2]);
    }
    this.signs[2] = null;
    this.numbers = this.numbers.slice(0, 2);
  }

  calculate() {
    var count = this.init;
    var current = this.numbers.slice(0);
    if (this.signs[2]) {
      for (var i = current.length - 1; i > 2; i--) {
        current[i - 1] = Math.pow(current[i - 1], current[i]);
      }
      if (this.signs[1]) {
        current[1] = Math.pow(current[1], current[2]);
      } else if (this.signs[0]) {
        current[0] = Math.pow(current[0], current[2]);
      } else {
        count = Math.pow(count, current[2]);
      }
    }
    if (this.signs[1]) {
      if (this.signs[0]) {
        if (this.signs[1] === '*') {
          current[0] *= current[1];
        } else {
          current[0] /= current[1];
        }
      } else {
        if (this.signs[1] === '*') {
          count *= current[1];
        } else {
          count /= current[1];
        }
      }
    }
    if (this.signs[0]) {
      if (this.signs[0] === '+') {
        count += current[0];
      } else {
        count -= current[0];
      }
    }
    return count;
  }

  toString() {
    return this.calculate() | 0;
  }
}

module.exports = SmartCalculator;
