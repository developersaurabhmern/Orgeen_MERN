export const validatorsMethods = {
  start(value, field) {
    this.value = value;
    this.field = field;
    return this;
  },

  isRequired() {
    if (!this.value) {
      throw {
        field: this.field,
        message: `enter valid ${this.field}`,
      };
    }
    return this;
  },

  number() {
    if (typeof this.value != "number") {
      throw {
        field: this.field,
        message: `this is not a valid ${this.field}`,
      };
    }
    return this;
  },

  string() {
    if (typeof this.value != "string") {
      throw {
        field: this.field,
        message: `this is not a valid ${this.field}`,
      };
    }
    return this;
  },

  positive() {
    if (this.value < 0) {
      throw {
        field: this.field,
        message: "this is a negative number",
      };
    }
    return this;
  },

  max(range) {
    if (this.value > range) {
      throw {
        field: this.field,
        message: "out of range number",
      };
    }
    return this;
  },

  min(range) {
    if (this.value < range) {
      throw {
        field: this.field,
        message: "enter the greater or equal value of " + range,
      };
    }
    return this;
  },

  email() {
    // before the @gmail.com and accepts everything else)
    var regexp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Converting the email to lowercase
    if (regexp.test(String(this.value).toLowerCase()) == false) {
      throw {
        field: this.field,
        message: `enter valid ${this.field}`,
      };
    }

    return this;
  },

  strMax(range) {
    this.value = this.value.trim();
    if (this.value.length > range) {
      throw {
        field: this.field,
        message: `${this.field} should be less then or equal ${range} words`,
      };
    }
    return this;
  },

  strMin(range) {
    this.value = this.value.trim();
    if (this.value.length < range) {
      throw {
        field: this.field,
        message: `${this.field} should be greater then or equal ${range} words`,
      };
    }
    return this;
  },
};
