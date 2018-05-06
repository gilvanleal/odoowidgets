odoo.define('inputmask_widget.fields', function (require) {
    "use strict";

    var basic_fields = require('web.basic_fields');
    const CE = 'contenteditable';

    function mask_attrs(attrs) {
        var keyMask = 'data-inputmask';
        var attrsMask;
        attrsMask = Object.keys(attrs).reduce(function (filtered, key) {
            if (key.indexOf(keyMask) !== -1)
                filtered[key] = attrs[key];
            return filtered;
        }, {});
        if (!attrsMask)
            console.warn("The widget Mask expects the 'data-inputmask[-attribute]' attrsMask!");
        return attrsMask;
    }

    var AbstractFieldMask = {
        template: "FieldMask",
        attrsMask: {},
        maskType: undefined,
        init: function () {
            this._super.apply(this, arguments);
            if(CE in this.attrs)
                this.attrsMask[CE] = this.attrs[CE];
            this.attrsMask =  _.extend({}, this.attrsMask, mask_attrs(this.attrs));
        },
        _renderReadonly: function () {
            this._super();
            if(CE in this.attrsMask)
                this.$el.inputmask(this.maskType);
        },
        _renderEdit: function () {
            var def = this._super.apply(this, arguments);
            this.$input.inputmask(this.maskType);
            return def;
        }
    };

    var FieldMask = basic_fields.FieldChar.extend(AbstractFieldMask);

     var FieldRegexMask = FieldMask.extend({
        maskType: "Regex"
    });

    return {FieldMask: FieldMask, FieldRegexMask: FieldRegexMask}
});