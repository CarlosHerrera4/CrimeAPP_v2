define(['dojo/_base/declare', 
  'esri/layers/FeatureLayer',
  //'esri/InfoTemplate',
  'esri/layers/GraphicsLayer',
  'esri/Graphic',
  'esri/PopupTemplate',
  'esri/geometry/Point',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/symbols/SimpleFillSymbol', 
  'esri/Color',
  'esri/widgets/Popup',
  //'esri/dijit/PopupTemplate',
  'esri/tasks/support/Query',
  'esri/tasks/QueryTask',
  'jimu/BaseWidget',
  'bootstrap/Dropdown',
  'bootstrap/Tab',
  'bootstrap/Modal',
  'dojo/dom-class', 
  'dojo/dom-construct', 
  'dojo/on',
  'dojox/charting/Chart', 
  'dojox/charting/themes/Dollar',
  'dojo/domReady!'],
  function(declare, FeatureLayer, GraphicsLayer, Graphic, 
    PopupTemplate, Point, SimpleMarkerSymbol, SimpleFillSymbol, Color,
    Popup, Query, QueryTask, BaseWidget, domClass, domConstruct, 
    on, Chart, theme) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-customwidget',

      //this property is set by the framework when widget is loaded.
      name: 'CustomWidget',


      //methods to communication with app container:

      postCreate: function() {
        this.inherited(arguments);
        console.log('postCreate');
      },

      startup: function() {
       this.inherited(arguments);
       //this.mapIdNode.innerHTML = 'map id:' + this.map.id;
       console.log('startup');
      },

      onOpen: function(){
        console.log('onOpen');
      },

      muestraDistritos: function(event){
        // Comprobamos si ya se ha hecho una selección de distrito antes
        // Si la hay borramos la lista de barrios
        var num_options = document.getElementById("selectBarrios").options.length;
        var aea = document.getElementById("selectBarrios");
        debugger
        if (num_options>1){
            for (var i=0; i <  num_options ; i++) {
                aea.removeChild(aea.childNodes[0]);
                debugger
                // var list = document.getElementById("selectBarrios");
                // list.removeChild(list.childNodes[0]); 
            }       
        }

        var target = event.target || event.srcElement;
        //var distrito = event.target.innerHTML;
        var distrito = document.getElementById("distrito").value;
        
        var a = esri.request({
          url: "http://services6.arcgis.com/ISJgswKTd7DKhcLN/ArcGIS/rest/services/DivisionesAdministrativas/FeatureServer/0/query?where=%22NOMDIS%22+%3D+%27" + distrito + "%27&outFields=*",
          content: {
            f: "json"
          },
          handleAs: "json",
          callbackParamName: "callback"
        });

        a.then(function(e) {
          var g = e.features;
          var numbarrios = g.length;
          for (var count = 0; count <= numbarrios -1; count++){
            var new_barrio = document.createElement("option");
            new_barrio.value = g[count].attributes.NOMBRE;
            new_barrio.text = g[count].attributes.NOMBRE;
            document.getElementById("selectBarrios").add(new_barrio);
          
          }
          document.getElementById("selectBarrios").style.display = "block";
          document.getElementById("p_Barrios").style.display = "block";
        })
      },

      muestraPuntos: function() {

        for (i=1 ; i=9; i++) {
          if (document.getElementById(i).checked == true) {
            var delito = document.getElementById(i).value;
          }
        }
        for (i=2013; i=2008; i--) {
          if (document.getElementById(i).checked == true) {
            var anio = document.getElementById(i).value;
            var num_url = delito + anio;
          }
        }

        

        //var delito = document.getElementById("que");
        //var aea = document.getElementById("a_joyerias");

        var fecha_inicial = document.getElementById("fecha_inicial").value +":00";
        var fecha_inicial2 = fecha_inicial.replace("T", " ");
        //var fecha_inicial = "2013-06-28 06:15:17";
        var fecha_final = document.getElementById("fecha_final").valueAsNumber;

        var d = new Date(fecha_inicial);
        var c = d.getUTCHours();
        var f = d.getUTCMonth();
        //var j = d.getUTCTime();
        var l = d.getUTCFullYear();
        var m = d.getUTCDate();
        debugger


        var that = this;

        

        // var template = new PopupTemplate({
        //   title: "Boston Marathon 2013",
        //   description: "{Distrito}"
        // });

        // function queryTaskExecuteCompleteHandler(queryResults){
        //   console.log("complete", queryResults);
        //   var num_points = queryResults.featureSet.features.length;

        //   var graphic_layer = new GraphicsLayer();

        //   for (i=0; i < num_points; i++) {
        //     var point_graphic =  new Point();
        //     point_graphic.x = queryResults.featureSet.features[i].geometry.x;
        //     point_graphic.y = queryResults.featureSet.features[i].geometry.y;
        //     var markerSymbol = new SimpleMarkerSymbol({
        //       color: [226, 119, 40],
        //       outline: {
        //         color: [255, 255, 255],
        //         width: 2
        //       }
        //     });

        //     var template = new PopupTemplate();
        //     template.title = "Ese esss";
        //     template.content = "<p>As of 2015, <b>%</b> of the population in this zip code is married.</p>";

        //     var graphic = new Graphic();
        //     graphic.geometry = point_graphic;
        //     graphic.popupTemplate = template;
        //     graphic.symbol = markerSymbol;

        //     graphic_layer.add(graphic);

            
        //   }
        //  that.map.addLayer(graphic_layer);
        // }

        var queryTask = new QueryTask("http://services6.arcgis.com/ISJgswKTd7DKhcLN/ArcGIS/rest/services/Incidentes_Madrid/FeatureServer/1");
        var query = new Query();
        query.where = "Distrito = 'Centro' AND FECHA > date'" + fecha_inicial2 + "'";
        //query.geometry = "esriGeometryPoint";
        //query.spatialRelationship = query.SPATIAL_REL_CONTAINS;
        query.outFields = ["*"];
        query.returnGeometry = true;
        //queryTask.on("complete", queryTaskExecuteCompleteHandler);
        queryTask.execute(query).then(function(result) {
          debugger
          var num_points = result.features.length;

          var graphic_layer = new GraphicsLayer();

          for (i=0; i < num_points; i++) {
            var point_graphic =  new Point();
            point_graphic.latitude = result.features[i].geometry.latitude;
            point_graphic.longitude = result.features[i].geometry.longitude;
            var markerSymbol = new SimpleMarkerSymbol({
              color: [226, 119, 40],
              outline: {
                color: [255, 255, 255],
                width: 2
              }
            });

            var template = new PopupTemplate();
            template.title = "{Barrio}";
            template.content = "<p>As of 2015, <b>%</b> of the population in this zip code is married.</p>";

            var graphic = new Graphic();
            graphic.geometry = point_graphic;
            graphic.popupTemplate = template;
            graphic.symbol = markerSymbol;

            graphic_layer.add(graphic);

          }
          that.sceneView.map.add(graphic_layer);
        });
      },

        
    

      // onClose: function(){
      //   console.log('onClose');
      // },

      // onMinimize: function(){
      //   console.log('onMinimize');
      // },

      // onMaximize: function(){
      //   console.log('onMaximize');
      // },

      // onSignIn: function(credential){
      //   /* jshint unused:false*/
      //   console.log('onSignIn');
      // },

      // onSignOut: function(){
      //   console.log('onSignOut');
      // }

      // onPositionChange: function(){
      //   console.log('onPositionChange');
      // },

      // resize: function(){
      //   console.log('resize');
      // }

      //methods to communication between widgets:

    });
  });