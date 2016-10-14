define([
  'dojo/on',
  'dojo/_base/declare', 
  'dojo/_base/html',
  'dojo/_base/lang',
  'jimu/BaseWidget'],
function(on, declare, html, lang, BaseWidget) {

  var clazz = declare([BaseWidget], {

    name: 'ClearLayers',
  //To create a widget, you need to derive from BaseWidget.
  //return declare([BaseWidget], {
    //Please note that the widget depends on the 4.0 API

    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'jimu-widget-demo',

    postCreate: function() {
      this.inherited(arguments);
      this.iconNode = html.create("div", {
        'class': 'operate-node',
      }, this.domNode);
      console.log('postCreate');
    },

    _onIconNodeClick: function() {

    },

  });

  return clazz;

});