describe('idealchart.item', function() {
    it('should return injected values', function() {


        var option = {id: 1, quantity: 2, price: 10.00};
        var item = new idealCart.orderItem(option);


        expect(item.get('price')).toEqual(option.price);
        expect(item.increment().get('quantity')).toEqual(3);
        expect(item.decrement().decrement().get('quantity')).toEqual(1);


    });
});

describe('adding order items', function() {
    it('should add items by json properties and instance of orderItem', function() {


        var cart = new idealCart();


        cart.addItem({id: 1, quantity: 2, price: 10.00});
        cart.addItem({id: 1, quantity: 5, price: 10.00});

        expect(cart.getTotalUniqueItems()).toEqual(1);
        expect(cart.getTotalItems()).toEqual(7);

        cart.bind('beforeAdd', function(item) {
            if(item.get('id') === 2) {
                item.set('quantity', 3);
            }
        });


        cart.addItem({id: 2, quantity: 1, price: 1.00});
        expect(cart.getTotalItems()).toEqual(10);





    });
});

describe('idealcart._utils.methods.ucfirst uppercase first letter', function() {
    it('should return first letter uppercased', function() {


        expect(idealCart._Util.Methods.ucfirst('idealcart')).toEqual('Idealcart');
        expect(idealCart._Util.Methods.ucfirst('price')).toEqual('Price');
    });
});