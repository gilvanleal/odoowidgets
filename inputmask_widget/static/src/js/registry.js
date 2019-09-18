odoo.define('inputmask_widget.registry', function (require) {
"use strict";

var registry = require('web.field_registry');
var inputMask = require('inputmask_widget.fields');

registry
    .add('mask', inputMask.FieldMask)
    .add('regex_mask', inputMask.FieldRegexMask);
});