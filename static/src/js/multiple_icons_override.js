// static/src/js/multiple_icons_override.js
// Odoo 18 compatible JavaScript approach for multiple module icon replacement

/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, onMounted } from "@odoo/owl";

// Configuration object for multiple module icons
const MODULE_ICONS = {
    'stock.stock_menu_root': '/custom_stock_icon/static/description/icons/stock_icon.png',
    'sale.sale_menu_root': '/custom_stock_icon/static/description/icons/sale_icon.png',
    'purchase.menu_purchase_root': '/custom_stock_icon/static/description/icons/purchase_icon.png',
    'mrp.menu_mrp_root': '/custom_stock_icon/static/description/icons/mrp_icon.png',
    'account.menu_finance': '/custom_stock_icon/static/description/icons/account_icon.png',
    'crm.crm_menu_root': '/custom_stock_icon/static/description/icons/crm_icon.png',
    'project.menu_main_pm': '/custom_stock_icon/static/description/icons/project_icon.png',
};

export class MultipleIconsOverride extends Component {
    setup() {
        onMounted(() => {
            this.overrideMultipleIcons();
        });
    }

    overrideMultipleIcons() {
        // Wait for DOM to be ready
        setTimeout(() => {
            Object.entries(MODULE_ICONS).forEach(([menuXmlId, iconPath]) => {
                this.overrideModuleIcon(menuXmlId, iconPath);
            });
        }, 500);
    }

    overrideModuleIcon(menuXmlId, iconPath) {
        // Override in navigation menus
        const menuElements = document.querySelectorAll(`[data-menu-xmlid="${menuXmlId}"]`);
        menuElements.forEach(menu => {
            const iconElement = menu.querySelector('.o_app_icon');
            if (iconElement) {
                iconElement.style.backgroundImage = `url(${iconPath})`;
                iconElement.style.backgroundSize = 'contain';
                iconElement.style.backgroundRepeat = 'no-repeat';
                iconElement.style.backgroundPosition = 'center';
            }
        });

        // Override in app drawer
        const appIcons = document.querySelectorAll(`.o_app[data-menu-xmlid="${menuXmlId}"] .o_app_icon`);
        appIcons.forEach(icon => {
            icon.style.backgroundImage = `url(${iconPath})`;
            icon.style.backgroundSize = 'contain';
            icon.style.backgroundRepeat = 'no-repeat';
            icon.style.backgroundPosition = 'center';
        });
    }
}

MultipleIconsOverride.template = "web.EmptyComponent";

// Register the component
registry.category("main_components").add("multiple_icons_override", {
    Component: MultipleIconsOverride,
});

// Method 2: Using web client ready hook for multiple modules
registry.category("web_client_ready").add("multiple_icons_override", async function() {
    const overrideAllIcons = () => {
        Object.entries(MODULE_ICONS).forEach(([menuXmlId, iconPath]) => {
            const apps = document.querySelectorAll(`.o_app[data-menu-xmlid="${menuXmlId}"]`);
            apps.forEach(app => {
                const icon = app.querySelector('.o_app_icon');
                if (icon) {
                    icon.style.backgroundImage = `url(${iconPath})`;
                    icon.style.backgroundSize = 'contain';
                    icon.style.backgroundRepeat = 'no-repeat';
                    icon.style.backgroundPosition = 'center';
                }
            });
        });
    };

    // Initial override
    overrideAllIcons();

    // Monitor for dynamic menu changes
    const observer = new MutationObserver(() => {
        overrideAllIcons();
    });

    const appMenu = document.querySelector('.o_app_drawer');
    if (appMenu) {
        observer.observe(appMenu, { childList: true, subtree: true });
    }
});

// Method 3: Batch CSS-in-JS approach for multiple modules
const addMultipleCustomStyles = () => {
    const styles = Object.entries(MODULE_ICONS)
        .map(([menuXmlId, iconPath]) => `
            .o_app[data-menu-xmlid="${menuXmlId}"] .o_app_icon {
                background-image: url(${iconPath}) !important;
                background-size: contain !important;
                background-repeat: no-repeat !important;
                background-position: center !important;
            }
        `)
        .join('\n');

    const style = document.createElement('style');
    style.textContent = styles;
    document.head.appendChild(style);
};

// Apply styles when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addMultipleCustomStyles);
} else {
    addMultipleCustomStyles();
}

// Utility function to add new module icons dynamically
export function addModuleIcon(menuXmlId, iconPath) {
    MODULE_ICONS[menuXmlId] = iconPath;
    
    // Apply the new icon immediately if DOM is ready
    if (document.readyState === 'complete') {
        const apps = document.querySelectorAll(`.o_app[data-menu-xmlid="${menuXmlId}"]`);
        apps.forEach(app => {
            const icon = app.querySelector('.o_app_icon');
            if (icon) {
                icon.style.backgroundImage = `url(${iconPath})`;
                icon.style.backgroundSize = 'contain';
                icon.style.backgroundRepeat = 'no-repeat';
                icon.style.backgroundPosition = 'center';
            }
        });
    }
}