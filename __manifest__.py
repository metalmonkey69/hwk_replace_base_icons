{
    'name': 'Replace Base Icons',
    'version': '18.0.1.0.0',
    'category': 'Inventory/Inventory',
    'summary': 'Replace default module icons e.g. Stock, Sales, Purchase, and Inventory',
    'description': """
        This module replaces the default icons for multiple Odoo modules:
        - Stock/Inventory Management
        - Sales
        - Purchase
        - Manufacturing (if installed)
        - Accounting (if installed)
        
        It demonstrates how to override multiple module assets in Odoo 18.
    """,
    'author': 'Hawoonku',
    'website': 'https://hawoonku.com',
    'depends': ['base'],
    'data': [
        'views/module_icons_assets.xml',
    ],
    # 'assets': {
        # 'web.assets_backend': [
            # 'custom_stock_icon/static/src/css/module_icons.css',
            # 'custom_stock_icon/static/src/js/module_icons_override.js',
        # ],
        # 'web.assets_frontend': [
            # 'custom_stock_icon/static/src/css/module_icons.css',
            # 'custom_stock_icon/static/src/js/module_icons_override.js',
        # ],
    # },
    'assets': {
        'web.assets_common': [
            'custom_stock_icon/static/src/css/module_icons.css',
            'custom_stock_icon/static/src/js/multiple_icons_override.js',
        ],
    }    
    'installable': True,
    'auto_install': False,
    'application': False,
    'license': 'LGPL-3',
}