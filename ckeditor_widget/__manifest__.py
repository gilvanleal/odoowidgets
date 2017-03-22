# -*- coding: utf-8 -*-
{
    'name': "CKEditor Widget Alpha",

    'summary': """
   CKEditor Widget""",

    'description': """
================
CKEditor Widget
================

Based on CKEditor 4.6 `Docs in CKEditor
<http://robinherbots.github.io/Inputmask/>`_.
""",

    'author': "Gilvan Leal",
    'website': "https://gilvanleal.github.io/odoowidgets/",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/openerp/addons/base/module/module_data.xml
    # for the full list
    'category': 'Extra Tools',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['web'],

    # always loaded
    "data": ['views/assets_templates.xml'],
    "qweb": ['static/src/xml/editor.xml'],
    'images': ['static/description/main_screenshot.png']
}
