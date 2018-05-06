odoo.define('inputmask_widget.registry', function (require) {
    "use strict";

    var registry = require('web.field_registry');
    var inputmask = require('inputmask_widget.fields');

    registry
        .add('mask', inputmask.FieldMask)
        .add('regex_mask', inputmask.FieldRegexMask);

});