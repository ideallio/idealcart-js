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