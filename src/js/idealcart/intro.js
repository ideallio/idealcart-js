

(function (w) {

    var idealCart = w.idealCart || function() {
            this.items = [];
            this.order = new idealCart.order();
        };

    w.idealCart = idealCart;

