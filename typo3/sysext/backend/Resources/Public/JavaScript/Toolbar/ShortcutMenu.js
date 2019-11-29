/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
define(["require","exports","jquery","../Icons","../Modal","../Notification","../Viewport"],(function(t,e,o,r,c,a,s){"use strict";var n;!function(t){t.containerSelector="#typo3-cms-backend-backend-toolbaritems-shortcuttoolbaritem",t.toolbarIconSelector=".dropdown-toggle span.icon",t.toolbarMenuSelector=".dropdown-menu",t.shortcutItemSelector=".t3js-topbar-shortcut",t.shortcutDeleteSelector=".t3js-shortcut-delete",t.shortcutEditSelector=".t3js-shortcut-edit",t.shortcutFormTitleSelector='input[name="shortcut-title"]',t.shortcutFormGroupSelector='select[name="shortcut-group"]',t.shortcutFormSaveSelector=".shortcut-form-save",t.shortcutFormCancelSelector=".shortcut-form-cancel",t.shortcutFormSelector=".shortcut-form"}(n||(n={}));let l=new class{constructor(){this.initializeEvents=()=>{o(n.containerSelector).on("click",n.shortcutDeleteSelector,t=>{t.preventDefault(),t.stopImmediatePropagation(),this.deleteShortcut(o(t.currentTarget).closest(n.shortcutItemSelector))}).on("click",n.shortcutFormGroupSelector,t=>{t.preventDefault(),t.stopImmediatePropagation()}).on("click",n.shortcutEditSelector,t=>{t.preventDefault(),t.stopImmediatePropagation(),this.editShortcut(o(t.currentTarget).closest(n.shortcutItemSelector))}).on("click",n.shortcutFormSaveSelector,t=>{t.preventDefault(),t.stopImmediatePropagation(),this.saveShortcutForm(o(t.currentTarget).closest(n.shortcutFormSelector))}).on("submit",n.shortcutFormSelector,t=>{t.preventDefault(),t.stopImmediatePropagation(),this.saveShortcutForm(o(t.currentTarget).closest(n.shortcutFormSelector))}).on("click",n.shortcutFormCancelSelector,t=>{t.preventDefault(),t.stopImmediatePropagation(),this.refreshMenu()})},s.Topbar.Toolbar.registerEvent(this.initializeEvents)}createShortcut(t,e,a,s,l,i){void 0!==a&&c.confirm(TYPO3.lang["bookmark.create"],a).on("confirm.button.ok",c=>{const a=o(n.toolbarIconSelector,n.containerSelector),u=a.clone();r.getIcon("spinner-circle-light",r.sizes.small).done(t=>{a.replaceWith(t)}),o.ajax({url:TYPO3.settings.ajaxUrls.shortcut_create,type:"post",data:{module:t,url:e,motherModName:s,displayName:i},cache:!1}).done(()=>{this.refreshMenu(),o(n.toolbarIconSelector,n.containerSelector).replaceWith(u),"object"==typeof l&&(r.getIcon("actions-system-shortcut-active",r.sizes.small).done(t=>{o(l).html(t)}),o(l).addClass("active"),o(l).attr("title",null),o(l).attr("onclick",null))}),o(c.currentTarget).trigger("modal-dismiss")}).on("confirm.button.cancel",t=>{o(t.currentTarget).trigger("modal-dismiss")})}deleteShortcut(t){c.confirm(TYPO3.lang["bookmark.delete"],TYPO3.lang["bookmark.confirmDelete"]).on("confirm.button.ok",e=>{o.ajax({url:TYPO3.settings.ajaxUrls.shortcut_remove,data:{shortcutId:t.data("shortcutid")},type:"post",cache:!1}).done(()=>{this.refreshMenu()}),o(e.currentTarget).trigger("modal-dismiss")}).on("confirm.button.cancel",t=>{o(t.currentTarget).trigger("modal-dismiss")})}editShortcut(t){o.ajax({url:TYPO3.settings.ajaxUrls.shortcut_editform,data:{shortcutId:t.data("shortcutid"),shortcutGroup:t.data("shortcutgroup")},cache:!1}).done(t=>{o(n.containerSelector).find(n.toolbarMenuSelector).html(t)})}saveShortcutForm(t){o.ajax({url:TYPO3.settings.ajaxUrls.shortcut_saveform,data:{shortcutId:t.data("shortcutid"),shortcutTitle:t.find(n.shortcutFormTitleSelector).val(),shortcutGroup:t.find(n.shortcutFormGroupSelector).val()},type:"post",cache:!1}).done(()=>{a.success(TYPO3.lang["bookmark.savedTitle"],TYPO3.lang["bookmark.savedMessage"]),this.refreshMenu()})}refreshMenu(){o.ajax({url:TYPO3.settings.ajaxUrls.shortcut_list,type:"get",cache:!1}).done(t=>{o(n.toolbarMenuSelector,n.containerSelector).html(t)})}};return TYPO3.ShortcutMenu=l,l}));