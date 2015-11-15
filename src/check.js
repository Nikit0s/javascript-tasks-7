'use strict';

var checkAvailableProto = function (object, prototypes) {
    for (var i = 0; i < prototypes.length; i++) {
        if (Object.getPrototypeOf(object) === prototypes[i]) {
            return true;
        }
    }
    return false;
};

var MyObjectPrototype = {
    checkHasKeys: function (keys) {
        if (!(checkAvailableProto(this, [Array.prototype, Object.prototype]))) {
            return;
        }
        if (keys.length != Object.keys(this).length) {
            return false;
        }
        var result = true;
        keys.forEach(function (key) {
            if (!(this.hasOwnProperty(key))) {
                result = false;
            }
        }, this);
        return result;
    },

    checkHasValueType: function (field, type) {
        if (!(checkAvailableProto(this, [Array.prototype, Object.prototype]))) {
            return;
        }
        var types = [String, Number, Function, Array];
        if (types.indexOf(type) == -1) {
            return false;
        }
        return this[field] === type(this[field]);
    },

    checkContainsKeys: function (keys) {
        if (!(checkAvailableProto(this, [Array.prototype, Object.prototype]))) {
            return;
        }
        var result = true;
        keys.forEach(function (key) {
            if (!(this.hasOwnProperty(key))) {
                result = false;
            }
        }, this);
        return result;
    },

    checkContainsValues: function (values) {
        if (!(checkAvailableProto(this, [Array.prototype, Object.prototype]))) {
            return;
        }
        var thisValues = [];
        Object.keys(this).forEach(function (key) {
            thisValues.push(this[key]);
        }, this);
        var result = true;
        values.forEach(function (value) {
            if (thisValues.indexOf(value) < 0) {
                result = false;
            }
        });
        return result;
    },

    checkHasValues: function (values) {
        if (!(checkAvailableProto(this, [Array.prototype, Object.prototype]))) {
            return;
        }
        var result = true;
        Object.keys.forEach(function (key) {
            if (values.indexOf(this[key]) < 0) {
                result = false;
            }
        }, this);
        return result;
    },

    checkHasLength: function (length) {
        if (!(checkAvailableProto(this, [Array.prototype, String.prototype]))) {
            return;
        }
        return this.length === length;
    },

    checkHasParamsCount: function (count) {
        if (!(checkAvailableProto(this, [Function.prototype]))) {
            return;
        }
        return this.length === count;
    },

    checkHasWordsCount: function (count) {
        if (!(checkAvailableProto(this, [String.prototype]))) {
            return;
        }
        var words;
        if (this.length === 0) {
            words = 0;
        } else {
            words = this.split(' ').length;
        }
        return words === count;
    }
};

exports.init = function () {
    Object.setPrototypeOf(MyObjectPrototype, null);
    Object.setPrototypeOf(Object.prototype, MyObjectPrototype);
};
