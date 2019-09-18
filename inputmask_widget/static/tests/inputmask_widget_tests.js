odoo.define('inputmask_widget.tests', function(require) {
"use strict";

var testUtils = require('web.test_utils');
var FormView = require('web.FormView');
var inputMask = require('inputmask_widget.fields');

var createView = testUtils.createView;

QUnit.module('inputmask', {
    beforeEach: function() {
        this.data = {
            partner: {
                fields: {
                    name: { string: "Name", type: "char" }
                },
                records: [{
                    id: 1,
                    name: "",
                }],
                onchanges: {},
            },
        };
    }
});

QUnit.test('mask', function (assert) {
    var done = assert.async();

    assert.expect(4);
    var form = testUtils.createView({
        View: FormView,
        model: 'partner',
        data: this.data,
        arch: '<form string="Partners">' +
                    '<sheet>' +
                        '<group>' +
                            '<field name="name" widget="mask" data-inputmask-mask="99-aa-**-AA-&amp;&amp;-##" />' +
                        '</group>' +
                    '</sheet>' +
                '</form>',
        res_id: 1,
        viewOptions: {
            mode: 'edit',
        },
    });
    assert.ok(form.$('input').first().inputmask);
    form.$('input').val('12aBc3def4FF').trigger('input');
    assert.verifySteps([], "_setValue shouldn't have been called yet");
    assert.ok(form.$('data-inputmask-mask'));
    assert.equal(form.$('input').val(), '12-aB-c3-DE-F4-FF');

    setTimeout(function () {
        form.destroy();
        done();
    }, 0);
});
});