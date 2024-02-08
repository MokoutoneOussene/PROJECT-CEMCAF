CQ.Ext.ns("PwC.components.chart.widgets");
CQ.Ext.ns("PwC.components.chart.listeners");
CQ.Ext.ns("PwC.rte.plugins.chart");
PwC.components.chart.listeners={dialogBeforeSubmit:function(a){if(!PwC.components.chart.dialog.isValidData(a)){CQ.Ext.Msg.show({title:"Validate Table",msg:"Please validate data before submit",buttons:CQ.Ext.Msg.OK,width:300,animEl:"elId"});
return false
}return true
},loadContent:function(a){PwC.components.chart.dialog.hideAllCustomTabs(a.findByType("tabpanel")[0]);
if(!PwC.components.chart.dialog.isValidData(a)){PwC.components.chart.dialog.enableAllTabs(a,false)
}PwC.components.chart.dialog.fireCheckOnSelectedRadioButtonChartType(a);
var b=a.getField("./chartoptions/showPlotValues");
this.showPlotValuesChanged(b,null,b.getValue()[0]==="true")
},beforeShow:function(a){a.findByType("tabpanel")[0].setActiveTab(0)
},showPlotValuesChanged:function(b,e,f){var d=b.findParentByType("dialog");
var a=["./chartoptions/formatter","./chartoptions/decimals","./chartoptions/decimalPoint","./chartoptions/thousandsSep"];
for(var c=0;
c<a.length;
c++){d.getField(a[c]).setDisabled(!f)
}}};
PwC.components.chart.dialog={isValidData:function(a){var b=a.getField("./datainput/isvalid").getValue()=="true";
this.enableAllTabs(a,b);
return b
},setValidData:function(a,b){a.getField("./datainput/isvalid").setValue(b);
this.enableAllTabs(a,b)
},hideAllCustomTabs:function(a){for(var b=0;
b<a.items.items.length;
b++){var c=a.items.items[b];
if(c.chart_type&&c.chart_type.indexOf("custom_")>=0){a.hideTabStripItem(c)
}}},showCustomTabs:function(a,e){var b=a.findParentByType("tabpanel");
for(var c=0;
c<b.items.items.length;
c++){var d=b.items.items[c];
if(!d.chart_type||d.chart_type.indexOf("custom_")<0){continue
}if(d.name!=undefined&&a.chartObj.tabs.indexOf(d.name)>=0){b.unhideTabStripItem(d)
}else{b.hideTabStripItem(d)
}}},enableAllTabs:function(d,b){var a=d.findByType("tabpanel")[0];
for(var c=1;
c<a.items.items.length;
c++){a.items.items[c].setDisabled(!b)
}},fireCheckOnSelectedRadioButtonChartType:function(b){var a=b.getField("./charttype/type");
a.fireCheckOnSelected()
}};
PwC.rte.plugins.chart.ValidateData={VALIDATE_DATA_CMD:"chartvalidatedata",tableData:null};
PwC.rte.plugins.chart.ValidateData.Plugin=new Class({toString:"ValidateDataPlugin",extend:CUI.rte.plugins.Plugin,P:PwC.rte.plugins.chart.ValidateData,validateDataUI:null,initializeUI:function(a){if(this.isFeatureEnabled(this.P.VALIDATE_DATA_CMD)){this.validateDataUI=a.createElement(this.P.VALIDATE_DATA_CMD,this,false,"Validate Table");
var c=200,b=1;
a.addElement("chartvalidatedata",c,this.validateDataUI,b)
}},updateState:function(e){var b=CQ.Ext.WindowMgr.getActive();
var a=PwC.components.chart.dialog.isValidData(b);
this.validateDataUI.setSelected(a);
var d=e.editContext.doc.body.innerText;
if(this.P.tableData==null){this.P.tableData=d
}var c=this.P.tableData!==d;
if(c&&a){this.P.tableData=d;
this.validateDataUI.setSelected(false);
PwC.components.chart.dialog.setValidData(b,false)
}},execute:function(e,d,b){var a=CQ.Ext.WindowMgr.getActive();
var c=this;
if(c.validateDataUI.isSelected()){return
}$.ajax({url:"/apps/formtest/uy/com/pwc/chart/SlingAllMethodsServlet",type:"GET",data:{table:b.editContext.doc.body.innerHTML},success:function(f){var g=(f=="ok");
c.validateDataUI.setSelected(g);
PwC.components.chart.dialog.setValidData(a,g);
c.P.tableData=b.editContext.doc.body.innerText;
if(!g){CQ.Ext.Msg.show({title:"Validate Table",msg:"Data is not in the expected format",buttons:CQ.Ext.Msg.OK,width:300,animEl:"elId"})
}},error:function(){CQ.Ext.Msg.show("Unexpected error during data validation.");
c.validateDataUI.setSelected(false)
}})
}});
CUI.rte.plugins.PluginRegistry.register("chartvalidatedata",PwC.rte.plugins.chart.ValidateData.Plugin);
PwC.components.chart.widgets.ColorComboBox=CQ.Ext.extend(CQ.Ext.form.ComboBox,{triggerAction:"all",lazyRender:true,mode:"local",queryMode:"local",store:new CQ.Ext.data.ArrayStore({id:0,fields:["id","displayText","image"],data:[[0,"Burgundy","/apps/pwc/components/content/chart/widgets/images/colorthemeicons/charting-colours-aem-burgundy.png"],[1,"Grey","/apps/pwc/components/content/chart/widgets/images/colorthemeicons/charting-colours-aem-grey.png"],[2,"Orange","/apps/pwc/components/content/chart/widgets/images/colorthemeicons/charting-colours-aem-orange.png"],[3,"Maroon","/apps/pwc/components/content/chart/widgets/images/colorthemeicons/charting-colours-aem-maroon.png"],[4,"Red","/apps/pwc/components/content/chart/widgets/images/colorthemeicons/charting-colours-aem-red.png"],[5,"Rose","/apps/pwc/components/content/chart/widgets/images/colorthemeicons/charting-colours-aem-rose.png"]]}),xtype:"combo",defaultValue:"Burgundy",displayField:"displayText",valueField:"id",tpl:new CQ.Ext.XTemplate('<tpl for="."><div  ext:qtip class="x-combo-list-item" ><li >{displayText} <img  src={image} /></li></div></tpl>'),listeners:{select:function(b,a){if(a.data.displayText=="item2"){b.findParentByType("tabpanel").hideTabStripItem(0)
}else{b.findParentByType("tabpanel").unhideTabStripItem(0)
}}}});
CQ.Ext.reg("chartColorComboBox",PwC.components.chart.widgets.ColorComboBox);
PwC.components.chart.widgets.ChartTypeSelector=CQ.Ext.extend(CQ.form.CompositeField,{text:"default text",chartTypes:[{group:"Area",chartType:"area_clustered",name:"Area",icon:"HCArea",tabs:[]},{group:"Area",chartType:"area_stacked",name:"Area Stacked",icon:"HCAreaStacked",tabs:[]},{group:"Area",chartType:"area_percent",name:"Area Percent",icon:"HCAreaPercent",tabs:[]},{group:"Bar",chartType:"bar_clustered",name:"Bar Clustered",icon:"HCBarClustered",tabs:[]},{group:"Bar",chartType:"bar_percent",name:"Bar Percent",icon:"HCBarPercent",tabs:[]},{group:"Bar",chartType:"bar_stacked",name:"Bar Stacked",icon:"HCBarStacked",tabs:[]},{group:"Column",chartType:"column_clustered",name:"Column Clustered",icon:"HCBar_ColumnClustered",tabs:[]},{group:"Column",chartType:"column_percent",name:"Column Percent",icon:"HCBar_ColumnPercent",tabs:[]},{group:"Column",chartType:"column_stacked",name:"Column Stacked",icon:"HCBar_ColumnStacked",tabs:[]},{group:"Doughnut",chartType:"doughnut",name:"Doughnut",icon:"HCDoughnut",tabs:["doughnut"]},{group:"Doughnut",chartType:"doughnut_exploded",name:"Doughnut Exploded",icon:"HCDoughnutExploded",tabs:["doughnut","exploded"]},{group:"Line",chartType:"line",name:"Line",icon:"HCLine",tabs:[]},{group:"Pie",chartType:"pie",name:"Pie",icon:"HCPie",tabs:[]},{group:"Pie",chartType:"pie_exploded",name:"Pie Exploded",icon:"HCPieExploded",tabs:["exploded"]},{group:"Scatter",chartType:"scatter",name:"Scatter",icon:"HCScatter",tabs:["scatter"]},{group:"mock"}],constructor:function(b){PwC.components.chart.widgets.chartDialogAux++;
if(b.text!=null){this.text=b.text
}var c={height:"auto",border:false,layoutConfig:{labelSeparator:CQ.themes.Dialog.LABEL_SEPARATOR},defaults:{msgTarget:CQ.themes.Dialog.MSG_TARGET}};
CQ.Util.applyDefaults(b,c);
PwC.components.chart.widgets.ChartTypeSelector.superclass.constructor.call(this,b);
var g="";
var f=[];
var j=this.findParentByType("dialog").id;
for(var d=0;
d<this.chartTypes.length;
d++){var e=this.chartTypes[d];
if(g==""){g=e.group
}if(g!=e.group){var h=new CQ.Ext.Panel({title:g,layout:"table",defaults:{bodyStyle:"padding:20px;vertical-align:middle;",style:"vertical-align:middle;"},layoutConfig:{columns:3,style:"background-color:#00ff00;"},name:this.name,width:"auto",height:"auto",border:true,items:f});
this.add(h);
g=e.group;
f=[]
}if(e.group=="mock"){continue
}var a=new CQ.Ext.form.Radio({chartObj:e,name:this.name,boxLabel:'<label for="radio'+e.chartType+j+'"  style=height:50px;width:57px;background-image:url("/apps/pwc/components/content/chart/widgets/images/charticons/'+e.icon+'.png")  ></label>',inputValue:e.chartType,id:"radio"+e.chartType+j,autoCreate:{tag:"input",type:"text",size:"20",autocomplete:"off",style:"display:none",cls:"charttype"},listeners:{check:function(i,k){if(k){PwC.components.chart.dialog.showCustomTabs(i,i.chartObj)
}}},checked:e.chartType=="bar_clustered"});
f.push(a)
}},initComponent:function(){PwC.components.chart.widgets.ChartTypeSelector.superclass.initComponent.call(this)
},processRecord:function(c,g){var b=this.findParentByType("dialog").id;
for(var f=0;
f<this.items.items.length;
f++){var a=this.items.items[f];
for(var e=0;
e<a.items.items.length;
e++){var d=a.items.items[e];
if(d.id=="radio"+c.data.charttype.type+b){d.setValue(true);
return
}}}},fireCheckOnSelected:function(){var d=this.items.items[0].items.items[0].getGroupValue();
if(d){for(var e=0;
e<this.items.items.length;
e++){var a=this.items.items[e];
for(var c=0;
c<a.items.items.length;
c++){var b=a.items.items[c];
if(b.inputValue==d){b.fireEvent("check",b,true);
return
}}}}}});
CQ.Ext.reg("chartTypeSelector",PwC.components.chart.widgets.ChartTypeSelector);
ChartTutorial={};
ChartTutorial.Selection=CQ.Ext.extend(CQ.form.CompositeField,{constructor:function(a){if(a.text!=null){this.text=a.text
}var b={height:"auto",width:"auto",border:false,layoutConfig:{labelSeparator:CQ.themes.Dialog.LABEL_SEPARATOR},defaults:{msgTarget:CQ.themes.Dialog.MSG_TARGET}};
CQ.Util.applyDefaults(a,b);
ChartTutorial.Selection.superclass.constructor.call(this,a);
this.selectionPanel=new CQ.Ext.Panel({layout:"table",layoutConfig:{columns:1,style:"background-color:#00ff00;"},name:this.name,width:"auto",height:"auto",border:true,html:'<img src="/apps/pwc/components/content/chart/widgets/images/charticons/charting-instructions.jpg" />'});
this.add(this.selectionPanel)
},initComponent:function(){ChartTutorial.Selection.superclass.initComponent.call(this)
}});
CQ.Ext.reg("chartTutorial",ChartTutorial.Selection);
PwC.components.chart.widgets.CategoriesComboBox=CQ.Ext.extend(CQ.Ext.form.ComboBox,{typeAhead:true,triggerAction:"all",isFormField:true,mode:"local",queryMode:"local",store:new CQ.Ext.data.ArrayStore({fields:["text"],data:[]}),xtype:"combo",displayField:"displayText"});
CQ.Ext.reg("chartCategoriesComboBox",PwC.components.chart.widgets.CategoriesComboBox);