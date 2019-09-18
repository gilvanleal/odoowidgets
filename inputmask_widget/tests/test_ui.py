# -*- coding: utf-8 -*-
# Copyright (c) 2019 Gilvan Leal <gilvan.sleal@gmail.com>
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl.html).

from odoo.tests import HttpCase


class WebSuite(HttpCase):

    def test_ui_web(self):
        self.phantom_js('/web/tests?mod=inputmask_widget&failfast', "", "", login='admin', timeout=1800)
