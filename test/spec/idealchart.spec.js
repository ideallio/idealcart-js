describe('idealchart.item', function() {
    it('should return injected values', function() {


        var option = {id: 1, quantity: 2, price: 10.00};
        var item = new idealCart.orderItem(option);


        expect(item.get('price')).toEqual(option.price);
        expect(item.increment().get('quantity')).toEqual(3);
        expect(item.decrement().decrement().get('quantity')).toEqual(1);


    });
});

describe('idealchart serialize and unserialize', function() {

    var cart = new idealCart();

    cart.addItem({id: 1, quantity: 2, price: 10.00, taxRate: 10});
    cart.addItem({id: 1, quantity: 5, price: 10.00, taxRate: 10});
    cart.addItem({id: 2, quantity: 1, price: 1.00, taxRate: 10});

    var expected = [{"options":{},"discounts":[],"id":1,"quantity":7,"price":10,"taxRate":10},{"options":{},"discounts":[],"id":2,"quantity":1,"price":1,"taxRate":10}];

    it('should serialize order', function() {
        // expect(cart.serialize()).toEqual(expected);
    });
});

describe('idealchart.item serialize and unserialize', function() {
    it('should return injected values', function() {


        var option = {id: 1, quantity: 2, price: 10.00};
        var item = new idealCart.orderItem(option);
        var expected = {"options":{},"discounts":[],"id":1,"quantity":2,"price":10};

        expect(item.serialize()).toEqual(expected);
        expect(item.unserialize(option).serialize()).toEqual(expected);
        expect(item.unserialize(expected).serialize()).toEqual(expected);

    });
});


describe('order totals', function() {
    it('should return order totals', function() {


        var cart = new idealCart();


        cart.addItem({id: 1, quantity: 2, price: 10.00, taxRate: 10});
        cart.addItem({id: 1, quantity: 5, price: 10.00, taxRate: 10});
        cart.addItem({id: 2, quantity: 1, price: 1.00, taxRate: 10});

        expect(cart.getTotalIncludingTax()).toEqual(78.1);
        expect(cart.getTotalExcludingTax()).toEqual(71);
        expect(cart.getTotalDiscounts()).toEqual(0);
        expect(cart.getTotalTax()).toEqual(7.1);

    });
});

describe('adding and removing order items', function() {
    it('should add items by json properties and instance of orderItem', function() {


        var cart = new idealCart();
        cart.bind('beforeAdd', function(item) {
            // console.log("hey");
            // console.log(JSON.stringify(item.serialize()));
        });

        var items = cart.getItems();

        cart.addItem({id: 1, quantity: 2, price: 10.00, extra: 'duh'});
        cart.addItem({id: 1, quantity: 5, price: 10.00, extra: 'duh 2'});
        // console.log(cart.getTotalUniqueItems());


        // console.log(cart.getItems());

        expect(cart.getTotalUniqueItems()).toEqual(1);
        expect(cart.getTotalItems()).toEqual(7);




        cart.bind('beforeAdd', function(item) {
            if(item.get('id') === 2) {
                item.set('quantity', 3);
            }
        });

        cart.addItem({id: 2, quantity: 1, price: 1.00});
        expect(cart.getTotalUniqueItems()).toEqual(2);
        expect(cart.getTotalItems()).toEqual(10);


        cart.removeItem(1);
        expect(cart.getTotalUniqueItems()).toEqual(1);
        expect(cart.getTotalItems()).toEqual(3);

    });
});

describe('item calculations', function() {
    var item = new idealCart.orderItem({id: 1, quantity: 2, price: 10.00, taxRate: 10});

    it('should return total excluding tax', function() {
        expect(item.getTotalExcludingTax()).toEqual(20);
    });

    it('should return total tax', function() {
        expect(item.getTotalTax()).toEqual(2);
    });

    it('should return total including tax', function() {
        expect(item.getTotalIncludingTax()).toEqual(22);
    });

});

describe('idealcart format cart', function() {
    it('should return formatted cart', function() {
        var cart = new idealCart();


        cart.addItem({id: 1, quantity: 2, price: 10.00, taxRate: 10});
        cart.addItem({id: 1, quantity: 5, price: 10.00, taxRate: 10});
        cart.addItem({id: 2, quantity: 1, price: 1.00, taxRate: 10});

        console.log(JSON.stringify(cart.format()));
    });
});

describe('idealcart._utils.methods.ucfirst uppercase first letter', function() {
    it('should return first letter uppercased', function() {
        expect(idealCart._Util.Methods.ucfirst('idealcart')).toEqual('Idealcart');
        expect(idealCart._Util.Methods.ucfirst('price')).toEqual('Price');
    });
});