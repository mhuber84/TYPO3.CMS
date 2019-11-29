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
define(["require","exports","../AbstractInteractableModule","jquery","../../Router","../../Renderable/FlashMessage","../../Renderable/ProgressBar","../../Renderable/InfoBox","TYPO3/CMS/Core/SecurityUtility","../../Renderable/Severity","bootstrap"],(function(t,a,e,s,n,i,o,d,l,c){"use strict";class p extends e.AbstractInteractableModule{constructor(){super(...arguments),this.selectorOutputContainer=".t3js-languagePacks-output",this.selectorContentContainer=".t3js-languagePacks-mainContent",this.selectorActivateLanguage=".t3js-languagePacks-activateLanguage",this.selectorActivateLanguageIcon="#t3js-languagePacks-activate-icon",this.selectorAddLanguageToggle=".t3js-languagePacks-addLanguage-toggle",this.selectorLanguageInactive=".t3js-languagePacks-inactive",this.selectorDeactivateLanguage=".t3js-languagePacks-deactivateLanguage",this.selectorDeactivateLanguageIcon="#t3js-languagePacks-deactivate-icon",this.selectorUpdate=".t3js-languagePacks-update",this.selectorLanguageUpdateIcon="#t3js-languagePacks-languageUpdate-icon",this.selectorExtensionPackMissesIcon="#t3js-languagePacks-extensionPack-misses-icon",this.selectorNotifications=".t3js-languagePacks-notifications",this.activeLanguages=[],this.activeExtensions=[],this.packsUpdateDetails={toHandle:0,handled:0,updated:0,new:0,failed:0},this.notifications=[]}static pluralize(t,a="pack",e="s",s=0){return 1!==t&&1!==s?a+e:a}initialize(t){this.currentModal=t,this.getData(),t.on("click",this.selectorAddLanguageToggle,()=>{t.find(this.selectorContentContainer+" "+this.selectorLanguageInactive).toggle()}),t.on("click",this.selectorActivateLanguage,t=>{const a=s(t.target).closest(this.selectorActivateLanguage).data("iso");t.preventDefault(),this.activateLanguage(a)}),t.on("click",this.selectorDeactivateLanguage,t=>{const a=s(t.target).closest(this.selectorDeactivateLanguage).data("iso");t.preventDefault(),this.deactivateLanguage(a)}),t.on("click",this.selectorUpdate,t=>{const a=s(t.target).closest(this.selectorUpdate).data("iso"),e=s(t.target).closest(this.selectorUpdate).data("extension");t.preventDefault(),this.updatePacks(a,e)})}getData(){const t=this.getModalBody();s.ajax({url:n.getUrl("languagePacksGetData"),cache:!1,success:a=>{if(!0===a.success){this.activeLanguages=a.activeLanguages,this.activeExtensions=a.activeExtensions,t.empty().append(a.html);const e=t.parent().find(this.selectorContentContainer);e.empty(),e.append(this.languageMatrixHtml(a)),e.append(this.extensionMatrixHtml(a)),s('[data-toggle="tooltip"]').tooltip({container:e})}else{const t=d.render(c.error,"Something went wrong","");this.addNotification(t)}this.renderNotifications()},error:a=>{n.handleAjaxError(a,t)}})}activateLanguage(t){const a=this.getModalBody(),e=this.findInModal(this.selectorOutputContainer),l=o.render(c.loading,"Loading...","");e.empty().append(l),s.ajax({url:n.getUrl(),method:"POST",context:this,data:{install:{action:"languagePacksActivateLanguage",token:this.getModuleContent().data("language-packs-activate-language-token"),iso:t}},cache:!1,beforeSend:()=>{this.getNotificationBox().empty()},success:t=>{if(e.empty(),!0===t.success&&Array.isArray(t.status))t.status.forEach(t=>{const a=d.render(t.severity,t.title,t.message);this.addNotification(a)});else{const t=i.render(c.error,"Something went wrong","");this.addNotification(t)}this.getData()},error:t=>{n.handleAjaxError(t,a)}})}deactivateLanguage(t){const a=this.getModalBody(),e=this.findInModal(this.selectorOutputContainer),l=o.render(c.loading,"Loading...","");e.empty().append(l),s.ajax({url:n.getUrl(),method:"POST",context:this,data:{install:{action:"languagePacksDeactivateLanguage",token:this.getModuleContent().data("language-packs-deactivate-language-token"),iso:t}},cache:!1,beforeSend:()=>{this.getNotificationBox().empty()},success:t=>{if(e.empty(),!0===t.success&&Array.isArray(t.status))t.status.forEach(t=>{const a=d.render(t.severity,t.title,t.message);this.addNotification(a)});else{const t=i.render(c.error,"Something went wrong","");this.addNotification(t)}this.getData()},error:t=>{n.handleAjaxError(t,a)}})}updatePacks(t,a){const e=this.findInModal(this.selectorOutputContainer),i=this.findInModal(this.selectorContentContainer),o=void 0===t?this.activeLanguages:[t];let d=!0,l=this.activeExtensions;void 0!==a&&(l=[a],d=!1),this.packsUpdateDetails={toHandle:o.length*l.length,handled:0,updated:0,new:0,failed:0},e.empty().append(s("<div>",{class:"progress"}).append(s("<div>",{class:"progress-bar progress-bar-info",role:"progressbar","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,style:"width: 0;"}).append(s("<span>",{class:"text-nowrap"}).text("0 of "+this.packsUpdateDetails.toHandle+" language "+p.pluralize(this.packsUpdateDetails.toHandle)+" updated")))),i.empty(),o.forEach(t=>{l.forEach(a=>{s.ajax({url:n.getUrl(),method:"POST",context:this,data:{install:{action:"languagePacksUpdatePack",token:this.getModuleContent().data("language-packs-update-pack-token"),iso:t,extension:a}},cache:!1,beforeSend:()=>{this.getNotificationBox().empty()},success:t=>{!0===t.success?(this.packsUpdateDetails.handled++,"new"===t.packResult?this.packsUpdateDetails.new++:"update"===t.packResult?this.packsUpdateDetails.updated++:this.packsUpdateDetails.failed++,this.packUpdateDone(d,o)):(this.packsUpdateDetails.handled++,this.packsUpdateDetails.failed++,this.packUpdateDone(d,o))},error:()=>{this.packsUpdateDetails.handled++,this.packsUpdateDetails.failed++,this.packUpdateDone(d,o)}})})})}packUpdateDone(t,a){const e=this.getModalBody(),o=this.findInModal(this.selectorOutputContainer);if(this.packsUpdateDetails.handled===this.packsUpdateDetails.toHandle){const o=d.render(c.ok,"Language packs updated",this.packsUpdateDetails.new+" new language "+p.pluralize(this.packsUpdateDetails.new)+" downloaded, "+this.packsUpdateDetails.updated+" language "+p.pluralize(this.packsUpdateDetails.updated)+" updated, "+this.packsUpdateDetails.failed+" language "+p.pluralize(this.packsUpdateDetails.failed)+" not available");this.addNotification(o),!0===t?s.ajax({url:n.getUrl(),method:"POST",context:this,data:{install:{action:"languagePacksUpdateIsoTimes",token:this.getModuleContent().data("language-packs-update-iso-times-token"),isos:a}},cache:!1,success:t=>{if(!0===t.success)this.getData();else{const t=i.render(c.error,"Something went wrong","");this.addNotification(t)}},error:t=>{n.handleAjaxError(t,e)}}):this.getData()}else{const t=this.packsUpdateDetails.handled/this.packsUpdateDetails.toHandle*100;o.find(".progress-bar").css("width",t+"%").attr("aria-valuenow",t).find("span").text(this.packsUpdateDetails.handled+" of "+this.packsUpdateDetails.toHandle+" language "+p.pluralize(this.packsUpdateDetails.handled,"pack","s",this.packsUpdateDetails.toHandle)+" updated")}}languageMatrixHtml(t){const a=this.findInModal(this.selectorActivateLanguageIcon).html(),e=this.findInModal(this.selectorDeactivateLanguageIcon).html(),n=this.findInModal(this.selectorLanguageUpdateIcon).html(),i=s("<div>"),o=s("<tbody>");return t.languages.forEach(t=>{const i=t.active,d=s("<tr>");i?o.append(d.append(s("<td>").text(" "+t.name).prepend(s("<div />",{class:"btn-group"}).append(s("<a>",{class:"btn btn-default t3js-languagePacks-deactivateLanguage","data-iso":t.iso,"data-toggle":"tooltip",title:"Deactivate"}).append(e),s("<a>",{class:"btn btn-default t3js-languagePacks-update","data-iso":t.iso,"data-toggle":"tooltip",title:"Download language packs"}).append(n))))):o.append(d.addClass("t3-languagePacks-inactive t3js-languagePacks-inactive").css({display:"none"}).append(s("<td>").text(" "+t.name).prepend(s("<div />",{class:"btn-group"}).append(s("<a>",{class:"btn btn-default t3js-languagePacks-activateLanguage","data-iso":t.iso,"data-toggle":"tooltip",title:"Activate"}).append(a))))),d.append(s("<td>").text(t.iso),s("<td>").text(t.dependencies.join(", ")),s("<td>").text(null===t.lastUpdate?"":t.lastUpdate)),o.append(d)}),i.append(s("<h3>").text("Active languages"),s("<table>",{class:"table table-striped table-bordered"}).append(s("<thead>").append(s("<tr>").append(s("<th>").append(s("<div />",{class:"btn-group"}).append(s("<button>",{class:"btn btn-default t3js-languagePacks-addLanguage-toggle",type:"button"}).append(s("<span>").append(a)," Add language"),s("<button>",{class:"btn btn-default t3js-languagePacks-update",type:"button"}).append(s("<span>").append(n)," Update all"))),s("<th>").text("Locale"),s("<th>").text("Dependencies"),s("<th>").text("Last update"))),o)),i.html()}extensionMatrixHtml(t){const a=new l,e=this.findInModal(this.selectorExtensionPackMissesIcon).html(),n=this.findInModal(this.selectorLanguageUpdateIcon).html();let i,o="",p=!0,r=0;const g=s("<div>"),u=s("<tr>");u.append(s("<th>").text("Extension"),s("<th>").text("Key")),t.activeLanguages.forEach(t=>{u.append(s("<th>").append(s("<a>",{class:"btn btn-default t3js-languagePacks-update","data-iso":t,"data-toggle":"tooltip",title:"Download and update all language packs"}).append(s("<span>").append(n)," "+t)))});const h=s("<tbody>");return t.extensions.forEach(t=>{if(p=!0,t.packs.forEach(t=>{!1===t.exists&&(p=!1)}),!0===p)return;r++,i=""!==t.icon?s("<span>").append(s("<img>",{style:"max-height: 16px; max-width: 16px;",src:"../"+t.icon,alt:t.title}),s("<span>").text(" "+t.title)):s("<span>").text(t.title);const n=s("<tr>");n.append(s("<td>").html(i.html()),s("<td>").text(t.key)),t.packs.forEach(i=>{const d=s("<td>");n.append(d),!0!==i.exists&&(o=null!==i.lastUpdate?"No language pack available for "+i.iso+" when tried at "+i.lastUpdate+". Click to re-try.":"Language pack not downloaded. Click to download",d.append(s("<a>",{class:"btn btn-default t3js-languagePacks-update","data-extension":t.key,"data-iso":i.iso,"data-toggle":"tooltip",title:a.encodeHtml(o)}).append(e)))}),h.append(n)}),g.append(s("<h3>").text("Translation status"),s("<table>",{class:"table table-striped table-bordered"}).append(s("<thead>").append(u),h)),0===r?d.render(c.ok,"Language packs have been found for every installed extension.","To download the latest changes, use the refresh button in the list above."):g.html()}getNotificationBox(){return this.findInModal(this.selectorNotifications)}addNotification(t){this.notifications.push(t)}renderNotifications(){const t=this.getNotificationBox();for(let a of this.notifications)t.append(a);this.notifications=[]}}return new p}));