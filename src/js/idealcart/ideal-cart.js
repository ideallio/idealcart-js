
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