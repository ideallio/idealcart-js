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
