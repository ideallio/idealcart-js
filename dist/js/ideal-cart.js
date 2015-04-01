

(function (w) {

    var idealCart = w.idealCart || function() {
            this.items = [];
            this.order = new idealCart.order();
        };

    w.idealCart = idealCart;


var _Util;

(function (_Util) {
    var Methods;
    (function (Methods) {
        Methods.ucfirst = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

    })(Methods = _Util.Methods || (_Util.Methods = {}));
})(_Util = idealCart._Util || (idealCart._Util = {}));


var __extends = this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        __.prototype = b.prototype;
        d.prototype = new __();
    };


/**
 * https://github.com/jeromeetienne/microevent.js/blob/master/microevent.js
 * @type {{bind: Function, unbind: Function, trigger: Function}}
 */
idealCart.prototype	= {
    bind	: function(event, fct){
        this._events = this._events || {};
        this._events[event] = this._events[event]	|| [];
        this._events[event].push(fct);
    },
    unbind	: function(event, fct){
        this._events = this._events || {};
        if( event in this._events === false  )	return;
        this._events[event].splice(this._events[event].indexOf(fct), 1);
    },
    trigger	: function(event /* , args... */){
        this._events = this._events || {};
        if( event in this._events === false  )	return;
        for(var i = 0; i < this._events[event].length; i++){
            this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
};


idealCart.prototype.addItem = addItem;
idealCart.prototype.getItem = getItem;
idealCart.prototype.getItems = getItems;
idealCart.prototype.hasItem = hasItem;
idealCart.prototype.getTotalUniqueItems = getTotalUniqueItems;
idealCart.prototype.getTotalItems = getTotalItems;
idealCart.prototype.removeItem = removeItem;
idealCart.prototype.getTotalIncludingTax = getTotalIncludingTax;
idealCart.prototype.getTotalExcludingTax = getTotalExcludingTax;
idealCart.prototype.getTotalDiscounts = getTotalDiscounts;
idealCart.prototype.getTotalTax = getTotalTax;
idealCart.prototype.serialize = serialize;
idealCart.prototype.unserialize = unserialize;
idealCart.prototype.format = format;


function getTotalIncludingTax() {
    var $return = 0;
    for (var i = 0; i < this.items.length; i++) {
        $return += this.items[i].getTotalIncludingTax();
    }
    return $return;
}


function getTotalExcludingTax() {
    var $return = 0;
    for (var i = 0; i < this.items.length; i++) {
        $return += this.items[i].getTotalExcludingTax();
    }
    return $return;
}

function getTotalDiscounts() {
    var $return = 0;
    for (var i = 0; i < this.items.length; i++) {
        $return += this.items[i].getTotalDiscounts();
    }
    return $return;
}

function getTotalTax() {
    var $return = 0;
    for (var i = 0; i < this.items.length; i++) {
        $return += this.items[i].getTotalTax();
    }
    return $return;
}

function addItem(item) {
    var _this = this;
    if(typeof item === "undefined" || item === null) {
        throw ("invalid item passed");
    }

   if(item instanceof idealCart.orderItem) {
       if(this.hasItem(item.get('id'))) {
           var i = this.getItem(item.get('id'));
           i.increment(item.get('quantity'));
       } else {
           _this.trigger('beforeAdd', item);
           _this.items.push(item);
           _this.trigger('afterAdd', item);
       }
   } else if(typeof item === 'object') {
       item = new idealCart.orderItem(item);
       if(this.hasItem(item.get('id'))) {
           var i = this.getItem(item.get('id'));
           i.increment(item.get('quantity'));
       } else {
           _this.trigger('beforeAdd', item);
           _this.items.push(item);
           _this.trigger('afterAdd', item);
       }
   }
    return this;
}


function hasItem(id) {
    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].get('id') === id) {
            return true;
        }
    }
    return false;
}

function getItem(id) {
    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].get('id') === id) {
            return this.items[i];
        }
    }
    throw new Error("Item not found");
}

function removeItem(id) {
    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].get('id') === id) {
            this.items.splice(i, 1);
            return true;
        }
    }
    return false;
}

function toCurrency(price, symbol) {

}

/**
 *
 * @returns the total number of unique items
 */
function getTotalUniqueItems() {
    return this.items.length;
}

/**
 *
 * @returns {*}
 */
function getTotalItems() {
    var total = 0;
    for (var i = 0; i < this.items.length; i++) {
        total += this.items[i].get('quantity');
    }
    return total;
}

function getItems() {

    return this.items;
}

function save() {
    this.trigger('beforeSave', this);

    this.trigger('afterSave', this);
}

function serialize() {
    var $return = {};
    $return.items = [];
    for (var i = 0; i < this.items.length; i++) {
        $return.items.push(this.items[i].serialize());
    }
    return $return;
}

function format(type) {
    var format = this.order;
    format.totalIncludingTax = this.getTotalIncludingTax();
    format.totalExcludingTax = this.getTotalExcludingTax();
    format.totalDiscounts = this.getTotalDiscounts();
    format.totalTax = this.getTotalTax();
    format.totalItems = this.getTotalItems();
    format.totalUniqueItems = this.getTotalUniqueItems();

    format.items = [];
    for (var i = 0; i < this.items.length; i++) {
        format.items.push(this.items[i].format());
    }
    return format;
}

function unserialize(order) {
    if(typeof order.items !== 'undefined') {
        for (var i = 0; i < order.items.length; i++) {
            this.addItem(order.items[i]);
        }
    }
}


idealCart.money = function (_value) {
    var value;
    /**
     *
     * @returns {*}
     */
    this.get = function() {
        return value;
    }

    /**
     *
     * @param _value
     */
    this.set = function(_value) {
        value = _value;
    }

    /**
     * return equivalence in lowest denominator
     *
     * @returns {number}
     *
     */

    this.getMoney = function() {
        var num = Number(_value);
        if(isNan(num)) {
            throw "Invalid number";
        } else {
            return parseInt(number*100);
        }
    }

    this.set(_value);
}

var discount = function(discount) {
    var id, value, description;


}


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


idealCart.order = function () {
    "use strict";
    this.startDate = new Date();
    this.type = 'order';
}






var shipping = function shipping(){
    var code, rate, description;
}
}(window));