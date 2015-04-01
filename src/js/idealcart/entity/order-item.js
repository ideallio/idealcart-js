idealCart.orderItem = function (options) {
    "use strict";
    var primitives=  ['id', 'code', 'name', 'description', 'price', 'quantity', 'tax', 'taxRate'];
    var data = {};

    var _this = this;


    this.setPrice = function(_price) {
        data['price'] = Number(_price);
        return this;
    }

    this.setQuantity = function(_quantity) {
        data['quantity'] = parseInt(_quantity);
    }

    function setAll(_data) {
        setDefaults();
        if(typeof _data === 'object'  && _data !== null) {
            for (var k in _data) {
                if (_data.hasOwnProperty(k)) {
                    _this.set(k, _data[k]);
                }
            }
        }
    }

    this.set = function(key, value) {
        var idx = primitives.indexOf(key);

        var method = 'set' + idealCart._Util.Methods.ucfirst(key.toLowerCase());
        if (typeof _this[method] !== 'undefined' && typeof _this[method] === 'function') {
            return _this[method](value);
        } else if (idx !== -1) {
            data[key] = value;
            return this;
        } else {
            data.options[key] = value;
            return this;
        }
    };

    this.get = function(key) {
        if(typeof data[key] !== "undefined") {
            return data[key];
        } else {
            throw new Error(key + " does not exist");
        }
    }

    this.increment = function(quantity) {
        if(typeof quantity !== "undefined") {
            data['quantity'] += quantity;
        } else {
            data['quantity']++;
        }

        return this;
    }

    this.decrement = function() {
        data['quantity']--;
        return this;
    }

    this.addDiscount = function(discount) {

    }

    this.serialize = function() {
        return data;
    }

    function setDefaults() {

        data.options = data.options || {};
        data.discounts = data.discounts || [];
    }

    this.unserialize = function(_data) {
        data = _data;
        setDefaults();
        return this;
    }

    this.getTotalIncludingTax = function() {
        return this.getTotalExcludingTax()+this.getTotalTax();
    }

    this.getTotalExcludingTax = function() {
        return ((this.get('quantity')*this.get('price'))-this.getTotalDiscounts());
    }

    this.getTotalDiscounts = function() {
        return 0;
    }

    this.getTotalTax = function() {
        var tax;
        try {
            tax = this.get('tax');
            return tax;
        } catch (err) {
            try {
                var taxRate = this.get('taxRate')/100;
                return (this.getTotalExcludingTax()*taxRate)
            } catch(err) {
                return 0;
            }
        }

    }

    /**
     *
     * @param type
     * @returns {*}
     */
    this.format = function(type) {

        var format = this.serialize();
        format.totalIncludingTax = this.getTotalIncludingTax();
        format.totalExcludingTax = this.getTotalExcludingTax();
        format.totalDiscounts = this.getTotalDiscounts();
        format.totalTax = this.getTotalTax();
        return format;
    }

    setAll(options);

};

