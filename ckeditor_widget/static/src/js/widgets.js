odoo.define('web.ckeditor_widget', function (require) {
    "use strict";
    var core = require('web.core');
    var common = require('web.form_common');
    var formats = require('web.formats');
    var form_widgets = require('web.form_widgets');
    var utils = require('web.utils');
    var QWeb = core.qweb;

    var FieldEditor = common.AbstractField.extend(common.ReinitializeFieldMixin, {
        template: "FieldEditor",
        attributes: {},events: {
            'keyup': function (e) {
                if (e.which === $.ui.keyCode.ENTER) {
                    e.stopPropagation();
                }
            },
            'keypress': function (e) {
                if (e.which === $.ui.keyCode.ENTER) {
                    e.stopPropagation();
                }
            },
            'change': 'store_dom_value',
        },
        init: function (field_manager, node) {
            this._super(field_manager, node);
        },
        initialize_content: function () {
            if (!this.get('effective_readonly') && !this.$input) {
                this.$input = this.$el;
            }
            this.setupFocus(this.$el);
        },
        render_value: function () {
            this._super();
            var show_value = formats.format_value(this.get_value(), this, '');

            if (this.$input != undefined) {
                this.$editor = this.$input.ckeditor().editor;
                this.$input.val(show_value);
            }else {
                this.$editor = this.$el.ckeditor().editor;
                this.$editor.setData(show_value);
            }
        },
        commit_value: function () {
            if (!this.get("effective_readonly")) {
                this.store_dom_value();
            }
            return this._super();
        },
        store_dom_value: function () {
            this.internal_set_value(formats.parse_value(this.$el.val(), this));
        },
        is_syntax_valid: function () {
            if (!this.get("effective_readonly")) {
                try {
                    formats.parse_value(this.$el.val(), this, '');
                } catch (e) {
                    return false;
                }
            }
            return true;
        },
        is_false: function () {
            return this.get('value') === '' || this._super();
        },
        focus: function ($el) {
            if (!this.get("effective_readonly")) {
                return this.$el.focus();
            }
            return false;
        },
        set_dimensions: function (height, width) {
            this.$el.css({
                width: width,
                minHeight: height,
            });
        },
        destroy_content: function() {
            this.$editor.destroy();
            this.$input = undefined;
            this.$editor = undefined;
        },
    });

    core.form_widget_registry.add('ckeditor', FieldEditor);
    return {FieldEditor: FieldEditor};
});
