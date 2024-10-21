/*! jQuery DataTables Checkboxes v1.2.13 - www.gyrocode.com/projects/jquery-datatables-checkboxes/ - License: MIT - Author: Gyrocode LLC / www.gyrocode.com */
!function(c){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(e){return c(e,window,document)}):"object"==typeof exports?module.exports=function(e,t){return e=e||window,t&&t.fn.dataTable||(t=require("datatables.net")(e,t).$),c(t,0,e.document)}:c(jQuery,window,document)}(function(k,e,b){"use strict";function x(e){if(!p.versionCheck||!p.versionCheck("1.10.8"))throw"DataTables Checkboxes requires DataTables 1.10.8 or newer";this.s={dt:new p.Api(e),columns:[],data:{},dataDisabled:{},ignoreSelect:!1},this.s.ctx=this.s.dt.settings()[0],this.s.ctx.checkboxes||(e.checkboxes=this)._constructor()}var p=k.fn.dataTable;x.prototype={_constructor:function(){for(var e,t,c,s,o,l,a,n=this,d=n.s.dt,i=n.s.ctx,h=!1,r=!1,u=0;u<i.aoColumns.length;u++){i.aoColumns[u].checkboxes&&(e=k(d.column(u).header()),h=!0,k.isPlainObject(i.aoColumns[u].checkboxes)||(i.aoColumns[u].checkboxes={}),i.aoColumns[u].checkboxes=k.extend({},x.defaults,i.aoColumns[u].checkboxes),t={searchable:!1,orderable:!1},""===i.aoColumns[u].sClass?t.className="dt-checkboxes-cell":t.className=i.aoColumns[u].sClass+" dt-checkboxes-cell",null===i.aoColumns[u].sWidthOrig&&(t.width="1%"),null===i.aoColumns[u].mRender&&(t.render=function(){return'<input type="checkbox" class="dt-checkboxes" autocomplete="off">'}),p.ext.internal._fnColumnOptions(i,u,t),e.removeClass("sorting"),e.off(".dt"),null===i.sAjaxSource&&((c=d.cells("tr",u)).invalidate("data"),k(c.nodes()).addClass(t.className)),n.s.data[u]={},n.s.dataDisabled[u]={},n.s.columns.push(u),i.aoColumns[u].checkboxes.selectRow&&(i._select?r=!0:i.aoColumns[u].checkboxes.selectRow=!1),i.aoColumns[u].checkboxes.selectAll&&(e.data("html",e.html()),null!==i.aoColumns[u].checkboxes.selectAllRender&&(s="",k.isFunction(i.aoColumns[u].checkboxes.selectAllRender)?s=i.aoColumns[u].checkboxes.selectAllRender():"string"==typeof i.aoColumns[u].checkboxes.selectAllRender&&(s=i.aoColumns[u].checkboxes.selectAllRender),e.html(s).addClass("dt-checkboxes-select-all").attr("data-col",u))))}h&&(n.loadState(),o=k(d.table().node()),l=k(d.table().body()),a=k(d.table().container()),r&&(o.addClass("dt-checkboxes-select"),o.on("user-select.dt.dtCheckboxes",function(e,t,c,s,o){n.onDataTablesUserSelect(e,t,c,s,o)}),o.on("select.dt.dtCheckboxes deselect.dt.dtCheckboxes",function(e,t,c,s){n.onDataTablesSelectDeselect(e,c,s)}),i._select.info&&(d.select.info(!1),o.on("draw.dt.dtCheckboxes select.dt.dtCheckboxes deselect.dt.dtCheckboxes",function(){n.showInfoSelected()}))),o.on("draw.dt.dtCheckboxes",function(e){n.onDataTablesDraw(e)}),l.on("click.dtCheckboxes","input.dt-checkboxes",function(e){n.onClick(e,this)}),a.on("click.dtCheckboxes",'thead th.dt-checkboxes-select-all input[type="checkbox"]',function(e){n.onClickSelectAll(e,this)}),a.on("click.dtCheckboxes","thead th.dt-checkboxes-select-all",function(){k('input[type="checkbox"]',this).not(":disabled").trigger("click")}),r||a.on("click.dtCheckboxes","tbody td.dt-checkboxes-cell",function(){k('input[type="checkbox"]',this).not(":disabled").trigger("click")}),a.on("click.dtCheckboxes","thead th.dt-checkboxes-select-all label, tbody td.dt-checkboxes-cell label",function(e){e.preventDefault()}),k(b).on("click.dtCheckboxes",'.fixedHeader-floating thead th.dt-checkboxes-select-all input[type="checkbox"]',function(e){i._fixedHeader&&i._fixedHeader.dom.header.floating&&n.onClickSelectAll(e,this)}),k(b).on("click.dtCheckboxes",".fixedHeader-floating thead th.dt-checkboxes-select-all",function(){i._fixedHeader&&i._fixedHeader.dom.header.floating&&k('input[type="checkbox"]',this).trigger("click")}),o.on("init.dt.dtCheckboxes",function(){setTimeout(function(){n.onDataTablesInit()},0)}),o.on("stateSaveParams.dt.dtCheckboxes",function(e,t,c){n.onDataTablesStateSave(e,t,c)}),o.one("destroy.dt.dtCheckboxes",function(e,t){n.onDataTablesDestroy(e,t)}))},onDataTablesInit:function(){var o=this,e=o.s.dt,t=o.s.ctx;t.oFeatures.bServerSide||(t.oFeatures.bStateSave&&o.updateState(),k(e.table().node()).on("xhr.dt.dtCheckboxes",function(e,t,c,s){o.onDataTablesXhr(e.settings,c,s)}))},onDataTablesUserSelect:function(e,t,c,s){var o=s.index().row,l=this.getSelectRowColIndex(),a=t.cell({row:o,column:l}).data();this.isCellSelectable(l,a)||e.preventDefault()},onDataTablesSelectDeselect:function(e,t,c){var s,o,l=this,a=l.s.dt;l.s.ignoreSelect||"row"!==t||null!==(s=l.getSelectRowColIndex())&&(o=a.cells(c,s),l.updateData(o,s,"select"===e.type),l.updateCheckbox(o,s,"select"===e.type),l.updateSelectAll(s))},onDataTablesStateSave:function(e,t,c){var s=this,o=s.s.ctx;k.each(s.s.columns,function(e,t){o.aoColumns[t].checkboxes.stateSave&&(Object.prototype.hasOwnProperty.call(c,"checkboxes")||(c.checkboxes=[]),c.checkboxes[t]=s.s.data[t])})},onDataTablesDestroy:function(){var e=this.s.dt,t=k(e.table().node()),c=k(e.table().body()),s=k(e.table().container());k(b).off("click.dtCheckboxes"),s.off(".dtCheckboxes"),c.off(".dtCheckboxes"),t.off(".dtCheckboxes"),this.s.data={},this.s.dataDisabled={},k(".dt-checkboxes-select-all",t).each(function(e,t){k(t).html(k(t).data("html")).removeClass("dt-checkboxes-select-all")})},onDataTablesDraw:function(){var c=this,e=c.s.ctx;(e.oFeatures.bServerSide||e.oFeatures.bDeferRender)&&c.updateStateCheckboxes({page:"current",search:"none"}),k.each(c.s.columns,function(e,t){c.updateSelectAll(t)})},onDataTablesXhr:function(){var c=this,e=c.s.dt,t=c.s.ctx,s=k(e.table().node());k.each(c.s.columns,function(e,t){c.s.data[t]={},c.s.dataDisabled[t]={}}),t.oFeatures.bStateSave&&(c.loadState(),s.one("draw.dt.dtCheckboxes",function(){c.updateState()}))},updateData:function(e,t,c){var s=this.s.dt,o=this.s.ctx;o.aoColumns[t].checkboxes&&(e.data().each(function(e){c?o.checkboxes.s.data[t][e]=1:delete o.checkboxes.s.data[t][e]}),o.oFeatures.bStateSave&&o.aoColumns[t].checkboxes.stateSave&&s.state.save())},updateSelect:function(e,t){var c=this.s.dt;this.s.ctx._select&&(this.s.ignoreSelect=!0,t?c.rows(e).select():c.rows(e).deselect(),this.s.ignoreSelect=!1)},updateCheckbox:function(e,t,c){var s=this.s.ctx,o=e.nodes();o.length&&(k("input.dt-checkboxes",o).not(":disabled").prop("checked",c),k.isFunction(s.aoColumns[t].checkboxes.selectCallback)&&s.aoColumns[t].checkboxes.selectCallback(o,c))},updateState:function(){var c=this,e=(c.s.dt,c.s.ctx);c.updateStateCheckboxes({page:"all",search:"none"}),e._oFixedColumns&&setTimeout(function(){k.each(c.s.columns,function(e,t){c.updateSelectAll(t)})},0)},updateStateCheckboxes:function(e){var o=this,t=o.s.dt,l=o.s.ctx;t.cells("tr",o.s.columns,e).every(function(e,t){var c=this.data(),s=o.isCellSelectable(t,c);Object.prototype.hasOwnProperty.call(l.checkboxes.s.data,t)&&Object.prototype.hasOwnProperty.call(l.checkboxes.s.data[t],c)&&(l.aoColumns[t].checkboxes.selectRow&&s&&o.updateSelect(e,!0),o.updateCheckbox(this,t,!0)),s||k("input.dt-checkboxes",this.node()).prop("disabled",!0)})},onClick:function(e,c){var s=this,t=s.s.dt,o=s.s.ctx,l=k(c).closest("td"),a=l.parents(".DTFC_Cloned").length?t.fixedColumns().cellIndex(l):l,n=t.cell(a),d=n.index(),i=d.column;d.row;o.aoColumns[i].checkboxes.selectRow?o._select&&("os"===o._select.style?(e.stopPropagation(),n.checkboxes.select(c.checked)):setTimeout(function(){var e=n.data(),t=Object.prototype.hasOwnProperty.call(s.s.data,i)&&Object.prototype.hasOwnProperty.call(s.s.data[i],e);t!==c.checked&&(s.updateCheckbox(n,i,t),s.updateSelectAll(i))},0)):(n.checkboxes.select(c.checked),e.stopPropagation())},onClickSelectAll:function(e,t){var c=this.s.dt,s=this.s.ctx,o=null,l=k(t).closest("th");o=l.parents(".DTFC_Cloned").length?c.fixedColumns().cellIndex(l).column:c.column(l).index(),k(t).data("is-changed",!0),c.column(o,{page:s.aoColumns[o].checkboxes&&s.aoColumns[o].checkboxes.selectAllPages?"all":"current",search:"applied"}).checkboxes.select(t.checked),e.stopPropagation()},loadState:function(){var c,s=this,e=s.s.dt,o=s.s.ctx;o.oFeatures.bStateSave&&(c=e.state.loaded(),k.each(s.s.columns,function(e,t){c&&c.checkboxes&&c.checkboxes.hasOwnProperty(t)&&o.aoColumns[t].checkboxes.stateSave&&(s.s.data[t]=c.checkboxes[t])}))},updateSelectAll:function(c){var e,t,s,o,l,a,n,d,i,h,r,u=this,b=u.s.dt,x=u.s.ctx;x.aoColumns[c].checkboxes&&x.aoColumns[c].checkboxes.selectAll&&(e=b.cells("tr",c,{page:x.aoColumns[c].checkboxes.selectAllPages?"all":"current",search:"applied"}),t=b.table().container(),s=k('.dt-checkboxes-select-all[data-col="'+c+'"] input[type="checkbox"]',t),l=o=0,a=e.data(),k.each(a,function(e,t){u.isCellSelectable(c,t)?Object.prototype.hasOwnProperty.call(u.s.data,c)&&Object.prototype.hasOwnProperty.call(u.s.data[c],t)&&o++:l++}),x._fixedHeader&&x._fixedHeader.dom.header.floating&&(s=k('.fixedHeader-floating .dt-checkboxes-select-all[data-col="'+c+'"] input[type="checkbox"]')),d=0===o?n=!1:o+l===a.length?!(n=!0):n=!0,i=s.data("is-changed"),h=s.prop("checked"),r=s.prop("indeterminate"),!i&&h===n&&r===d||(s.data("is-changed",!1),s.prop({checked:!d&&n,indeterminate:d}),k.isFunction(x.aoColumns[c].checkboxes.selectAllCallback)&&x.aoColumns[c].checkboxes.selectAllCallback(s.closest("th").get(0),n,d)))},showInfoSelected:function(){var n=this.s.dt,e=this.s.ctx;if(e.aanFeatures.i){var t=this.getSelectRowColIndex();if(null!==t){var d=0;for(var c in e.checkboxes.s.data[t])Object.prototype.hasOwnProperty.call(e.checkboxes.s.data,t)&&Object.prototype.hasOwnProperty.call(e.checkboxes.s.data[t],c)&&d++;k.each(e.aanFeatures.i,function(e,t){var c,s,o=k(t),l=k('<span class="select-info"/>');c="row",s=d,l.append(k('<span class="select-item"/>').append(n.i18n("select."+c+"s",{_:"%d "+c+"s selected",0:"",1:"1 "+c+" selected"},s)));var a=o.children("span.select-info");a.length&&a.remove(),""!==l.text()&&o.append(l)})}}},isCellSelectable:function(e,t){var c=this.s.ctx;return!Object.prototype.hasOwnProperty.call(c.checkboxes.s.dataDisabled,e)||!Object.prototype.hasOwnProperty.call(c.checkboxes.s.dataDisabled[e],t)},getCellIndex:function(e){var t=this.s.dt;return this.s.ctx._oFixedColumns?t.fixedColumns().cellIndex(e):t.cell(e).index()},getSelectRowColIndex:function(){for(var e=this.s.ctx,t=null,c=0;c<e.aoColumns.length;c++)if(e.aoColumns[c].checkboxes&&e.aoColumns[c].checkboxes.selectRow){t=c;break}return t},updateFixedColumn:function(e){var t,c,s=this,o=s.s.dt,l=s.s.ctx;l._oFixedColumns&&(t=l._oFixedColumns.s.iLeftColumns,c=l.aoColumns.length-l._oFixedColumns.s.iRightColumns-1,(e<t||c<e)&&(o.fixedColumns().update(),setTimeout(function(){k.each(s.s.columns,function(e,t){s.updateSelectAll(t)})},0)))}},x.defaults={stateSave:!0,selectRow:!1,selectAll:!0,selectAllPages:!0,selectCallback:null,selectAllCallback:null,selectAllRender:'<input type="checkbox" autocomplete="off">'};var t=k.fn.dataTable.Api;return t.register("checkboxes()",function(){return this}),t.registerPlural("columns().checkboxes.select()","column().checkboxes.select()",function(i){return void 0===i&&(i=!0),this.iterator("column-rows",function(c,s,e,t,o){var l,a,n,d;c.aoColumns[s].checkboxes&&(d=[],k.each(o,function(e,t){d.push({row:t,column:s})}),a=(l=this.cells(d)).data(),n=[],d=[],k.each(a,function(e,t){c.checkboxes.isCellSelectable(s,t)&&(d.push({row:o[e],column:s}),n.push(o[e]))}),l=this.cells(d),c.checkboxes.updateData(l,s,i),c.aoColumns[s].checkboxes.selectRow&&c.checkboxes.updateSelect(n,i),c.checkboxes.updateCheckbox(l,s,i),c.checkboxes.updateSelectAll(s),c.checkboxes.updateFixedColumn(s))},1)}),t.registerPlural("cells().checkboxes.select()","cell().checkboxes.select()",function(l){return void 0===l&&(l=!0),this.iterator("cell",function(e,t,c){var s,o;e.aoColumns[c].checkboxes&&(s=this.cells([{row:t,column:c}]),o=this.cell({row:t,column:c}).data(),e.checkboxes.isCellSelectable(c,o)&&(e.checkboxes.updateData(s,c,l),e.aoColumns[c].checkboxes.selectRow&&e.checkboxes.updateSelect(t,l),e.checkboxes.updateCheckbox(s,c,l),e.checkboxes.updateSelectAll(c),e.checkboxes.updateFixedColumn(c)))},1)}),t.registerPlural("cells().checkboxes.enable()","cell().checkboxes.enable()",function(a){return void 0===a&&(a=!0),this.iterator("cell",function(e,t,c){var s,o,l;e.aoColumns[c].checkboxes&&(o=(s=this.cell({row:t,column:c})).data(),a?delete e.checkboxes.s.dataDisabled[c][o]:e.checkboxes.s.dataDisabled[c][o]=1,(l=s.node())&&k("input.dt-checkboxes",l).prop("disabled",!a),e.aoColumns[c].checkboxes.selectRow&&Object.prototype.hasOwnProperty.call(e.checkboxes.s.data,c)&&Object.prototype.hasOwnProperty.call(e.checkboxes.s.data[c],o)&&e.checkboxes.updateSelect(t,a))},1)}),t.registerPlural("cells().checkboxes.disable()","cell().checkboxes.disable()",function(e){return void 0===e&&(e=!0),this.checkboxes.enable(!e)}),t.registerPlural("columns().checkboxes.deselect()","column().checkboxes.deselect()",function(e){return void 0===e&&(e=!0),this.checkboxes.select(!e)}),t.registerPlural("cells().checkboxes.deselect()","cell().checkboxes.deselect()",function(e){return void 0===e&&(e=!0),this.checkboxes.select(!e)}),t.registerPlural("columns().checkboxes.deselectAll()","column().checkboxes.deselectAll()",function(){return this.iterator("column",function(e,t){e.aoColumns[t].checkboxes&&(e.checkboxes.s.data[t]={},this.column(t).checkboxes.select(!1))},1)}),t.registerPlural("columns().checkboxes.selected()","column().checkboxes.selected()",function(){return this.iterator("column-rows",function(c,s,e,t,o){if(c.aoColumns[s].checkboxes){var l,a,n=[];return c.oFeatures.bServerSide?k.each(c.checkboxes.s.data[s],function(e){c.checkboxes.isCellSelectable(s,e)&&n.push(e)}):(l=[],k.each(o,function(e,t){l.push({row:t,column:s})}),a=this.cells(l).data(),k.each(a,function(e,t){Object.prototype.hasOwnProperty.call(c.checkboxes.s.data,s)&&Object.prototype.hasOwnProperty.call(c.checkboxes.s.data[s],t)&&c.checkboxes.isCellSelectable(s,t)&&n.push(t)})),n}return[]},1)}),x.version="1.2.13",k.fn.DataTable.Checkboxes=x,k.fn.dataTable.Checkboxes=x,k(b).on("preInit.dt.dtCheckboxes",function(e,t){"dt"===e.namespace&&new x(t)}),x});
//# sourceMappingURL=dataTables.checkboxes.min.js.map