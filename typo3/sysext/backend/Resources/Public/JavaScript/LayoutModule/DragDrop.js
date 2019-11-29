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
define(["require","exports","jquery","../AjaxDataHandler","jquery-ui/droppable"],(function(e,t,a,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class n{static initialize(){a(n.contentIdentifier).draggable({handle:n.dragHeaderIdentifier,scope:"tt_content",cursor:"move",distance:20,revert:"invalid",zIndex:100,start:e=>{n.onDragStart(a(e.target))},stop:e=>{n.onDragStop(a(e.target))}}),a(n.dropZoneIdentifier).droppable({accept:this.contentIdentifier,scope:"tt_content",tolerance:"pointer",over:(e,t)=>{n.onDropHoverOver(a(t.draggable),a(e.target))},out:(e,t)=>{n.onDropHoverOut(a(t.draggable),a(e.target))},drop:(e,t)=>{n.onDrop(a(t.draggable),a(e.target),e)}})}static onDragStart(e){n.originalStyles=e.get(0).style.cssText,e.children(n.dragIdentifier).addClass("dragitem-shadow"),e.append('<div class="ui-draggable-copy-message">'+TYPO3.lang["dragdrop.copy.message"]+"</div>"),e.children(n.dropZoneIdentifier).addClass("drag-start"),e.closest(n.columnIdentifier).removeClass("active"),e.find(n.dropZoneIdentifier).hide(),a(n.dropZoneIdentifier).each((e,t)=>{const o=a(t);o.parent().find(".t3js-toggle-new-content-element-wizard").length?o.addClass(n.validDropZoneClass):o.closest(n.contentIdentifier).find("> "+n.addContentIdentifier+", > > "+n.addContentIdentifier).show()})}static onDragStop(e){e.children(n.dragIdentifier).removeClass("dragitem-shadow"),e.children(n.dropZoneIdentifier).removeClass("drag-start"),e.closest(n.columnIdentifier).addClass("active"),e.find(n.dropZoneIdentifier).show(),e.find(".ui-draggable-copy-message").remove(),e.get(0).style.cssText=n.originalStyles,a(n.dropZoneIdentifier+"."+n.validDropZoneClass).removeClass(n.validDropZoneClass)}static onDropHoverOver(e,t){t.hasClass(n.validDropZoneClass)&&t.addClass(n.dropPossibleHoverClass)}static onDropHoverOut(e,t){t.removeClass(n.dropPossibleHoverClass)}static onDrop(e,t,a){const o=n.getColumnPositionForElement(t);t.removeClass(n.dropPossibleHoverClass);const s=parseInt(e.data("uid"),10);if("number"==typeof s&&s>0){let r={};const i=t.closest(n.contentIdentifier).data("uid");let d=0;d=void 0===i?parseInt(a.target.offsetParent.getAttribute("data-page"),10):0-parseInt(i,10);const l=parseInt(t.closest("[data-language-uid]").data("language-uid"),10);let c=0;0!==d&&(c=o),r.cmd={tt_content:{}},r.data={tt_content:{}};const p=a&&a.originalEvent.ctrlKey||t.hasClass("t3js-paste-copy");p?(r.cmd.tt_content[s]={copy:{action:"paste",target:d,update:{colPos:c,sys_language_uid:l}}},n.ajaxAction(t,e,r,p)):(r.data.tt_content[s]={colPos:c,sys_language_uid:l},r.cmd.tt_content[s]={move:d},n.ajaxAction(t,e,r,p))}}static ajaxAction(e,t,a,s){o.process(a).done((function(a){a.hasErrors||(e.parent().hasClass(n.contentIdentifier.substring(1))?t.detach().css({top:0,left:0}).insertAfter(e.closest(n.contentIdentifier)):t.detach().css({top:0,left:0}).insertAfter(e.closest(n.dropZoneIdentifier)),s&&self.location.reload(!0))}))}static getColumnPositionForElement(e){const t=e.closest("[data-colpos]");return!(!t.length||"undefined"===t.data("colpos"))&&t.data("colpos")}}n.contentIdentifier=".t3js-page-ce",n.dragIdentifier=".t3-page-ce-dragitem",n.dragHeaderIdentifier=".t3js-page-ce-draghandle",n.dropZoneIdentifier=".t3js-page-ce-dropzone-available",n.columnIdentifier=".t3js-page-column",n.validDropZoneClass="active",n.dropPossibleHoverClass="t3-page-ce-dropzone-possible",n.addContentIdentifier=".t3js-page-new-ce",n.originalStyles="",t.default=n,a(n.initialize)}));