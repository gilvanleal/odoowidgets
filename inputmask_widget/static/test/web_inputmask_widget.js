odoo.define_section('web.inputmask_widget', ['web.inputmask_widget', 'web.form_common'], function(test) {
"use strict";
    test("basic", function (assert, input_mask, common) {
        var attrs_mask = {'data-inputmask-mask': '99/99/9999'};
        var field_manger = new (common.DefaultFieldManager.extend({}))(null, {});
        var node = {'attrs': attrs_mask, 'name': 'mask'};
        var mask = new (input_mask.FieldMask.extend({}))(field_manger, node);

        // Check attrs is attributed
        assert.deepEqual(mask.attrsMask, attrs_mask);

        mask.renderElement();
        mask.start();

        assert.ok(mask.$input);
        assert.ok(mask.$input[0].inputmask);

        mask.set_value('19101990');
        assert.deepEqual(mask.get_value(), '19101990');

        mask.commit_value();
        //Check mask is applied
        assert.deepEqual(mask.get_value(), '19/10/1990');
    });
});