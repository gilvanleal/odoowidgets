odoo.define('web.inputmask_widgets', function (require) {
    "use strict";
    var core = require('web.core');
    var translation = require('web.translation');
    var _t = translation._t;
    var form_widgets = require('web.form_widgets');
    var kanban_widgets = require('web_kanban.widgets');
    var list_widget_registry = core.list_widget_registry;
    var QWeb = core.qweb;

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
        init: function (field_manager, node) {
            this._super(field_manager, node);
            this.attrsMask =  _.extend({}, this.attrsMask, mask_attrs(node.attrs));
        },
        render_value: function () {
            this._super();
            const CE = 'contenteditable';
            if (this.$input !== undefined)
                this.$input.inputmask(this.maskType);
            else
                this.$el.val(this.$el.text());
            if (CE in this.node.attrs || CE in this.attrsMask)
                this.$el.inputmask(this.maskType);
        },
    };

    var FieldMask = form_widgets.FieldChar.extend(AbstractFieldMask);

    var FieldIntegerMask = form_widgets.FieldFloat.extend(AbstractFieldMask, {
        attrsMask: {
            'contenteditable': false,
            'data-inputmask-alias': 'integer',
            'data-inputmask-min': -2147483648,
            'data-inputmask-max': 2147483647,
            'data-inputmask-autounmask': true,
            'data-inputmask-autogroup': true,
            'data-inputmask-groupseparator': _t.database.parameters.thousands_sep
        },
    });

    var FieldFloatMask = form_widgets.FieldFloat.extend(AbstractFieldMask, {
        attrsMask: {
            'contenteditable': false,
            'data-inputmask-alias': 'decimal',
            'data-inputmask-autounmask': true,
            'data-inputmask-autogroup': true,
            'data-inputmask-groupseparator': _t.database.parameters.thousands_sep,
            'data-inputmask-radixpoint': _t.database.parameters.decimal_point,
        },
    });

    var FieldRegexMask = FieldMask.extend({
        maskType: "Regex"
    });

    var ColumnMask = list_widget_registry.get('field.char').extend({
        attrsMask: {},
        $mask: undefined,
        init: function (id, tag, attrs) {
            this._super(id, tag, attrs);
            this.attrsMask = mask_attrs(attrs);
            if (this.attrsMask)
                this.$mask = $(jQuery.parseHTML(QWeb.render('Widget.mask', {widget: this}))).inputmask(undefined, {placeholder: '', greedy: false});
        },
        format: function (row_data, options) {
            var value = this._super(row_data, options);
            if(this.$mask) {
                this.$mask.val(value);
                value = this.$mask.val();
            }
            return value;
        }
    });

    var MaskWidget = kanban_widgets.AbstractField.extend({
        tagName: 'span',
        attrsMask: {},
        init: function(parent, field, $node) {
            this._super(parent, field, $node);
            this.attrsMask = mask_attrs(field.__attrs);
            if(this.attrsMask)
                this.$mask = $(jQuery.parseHTML(QWeb.render('Widget.mask', {widget: this}))).inputmask(undefined, {placeholder: '', greedy: false});
        },
        renderElement: function () {
            var value = this.field.raw_value;
            if(this.$mask)
                this.$mask.val(value);
                value = this.$mask.val();
            this.$el.text(value);
        }
    });

    core.form_widget_registry
        .add('mask', FieldMask)
        .add('integer_mask', FieldIntegerMask)
        .add('float_mask', FieldFloatMask)
        .add('mask_regex', FieldRegexMask) //@ Deprecated latest version FOR name conversion!
        .add('regex_mask', FieldRegexMask);
    list_widget_registry.add('field.mask', ColumnMask);
    kanban_widgets.registry.add("mask", MaskWidget);

    return {FieldMask: FieldMask, FieldMaskRegex: FieldRegexMask, MaskWidget: MaskWidget};
});
