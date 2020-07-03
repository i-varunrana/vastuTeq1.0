import Utility from './helper/utility.class.js';
import Attribute from './handlers/attribute.class.js';
import Model from './helper/model.class.js';
import Modal from './helper/modal.class.js';
import Object from './object.class.js';
import Assist from './helper/assist.class.js';
import ActionBox from './helper/actionbox.class.js';
import StageFirst from './stages/stagefirst.class.js';
import StageSecond from './stages/stagesecond.class.js';
import StageThird from './stages/stagethird.class.js';
import StageFourth from './stages/stagefourth.class.js';

class App {

    constructor() {

        // ?  C L A S S  V A R I A B L E 
        this.fill = '#EF5350';
        this.strokeWidth = 2;
        this.strokeColor = '#6869AB';

        this.imageData = [];
        this.zoomData = {x: 0, y: 0, k: 1};
        this.DISABLE = true;

        this.mapId = localStorage.getItem("selectedMapId") || null;
        this.mapBoundariesCoords = [];
        this.centroid = [];
        this.faceCoords = [];
        this.distanceBetweenTwoPoints = {};
        this.division = 8;
        this.angle = 0;

        // ?  A P P  F U N C T I O N A L I T Y
        this.zoomDisplay = d3.select('.zoom-display');

        // ?  C A N V A S  S I Z E
        this.canvasSize = {
            width: d3.select("#drawArea").node().offsetWidth,
            height: d3.select("#drawArea").node().offsetHeight,
        };

        // ?  Z O O M
        this.zoom = d3.zoom()
        .on("zoom", () => {
            this.canvas.attr("transform", d3.event.transform);
            this.zoomDisplay.text(`${Math.round(d3.event.transform.k * 100)} %`);  
            this.zoomData = d3.event.transform;
        });

        // ?  M A I N  C A N V A S
        this.svg = d3
        .select("#drawArea")
        .append("svg")
        .attr("id", "canvas")
        .attr("width", this.canvasSize.width)
        .attr("height", this.canvasSize.height)

        this.canvas = this.svg
        .append("g")
        .attr("id", "main-group");
    

        // ? O B J E C T 
        this.activeObject;
        this.model = new Model();
        this.assist = new Assist();
        this.actionbox = new ActionBox();
        this.modal = new Modal();

        // ? I M P O R T E D  C L A S S E S
        this.attribute = new Attribute()
        .setX(0).setY(0)
        .setWidth(this.canvasSize.width)
        .setHeight(this.canvasSize.height)
        .setAngle(0);


        // ?  A L L  E V E N T  L I S T E N E R  F U N C T I O N S
        this._menuItemListener();
        this._dropItemEventListener();
        this._objectEventListener();
        this._zoomEventListener();
        this._windowResizeEventListener();
        this._objectPropertiesEventListener();

        // ?  A P P  I N I T I A L I Z E
        this._init();
    }





    // ?  A L L  L O C A L  F U N C T I O N S

    _init() {

        //FIRST LAYER OF GROUP FOR HOUSE MAP IMAGE
        this.firstLayer = this.canvas.append("g").attr("id", "firstLayer").style('pointer-events', 'all');

        //SECOND LAYER OF GROUP FOR BACKGROUND GRID
        this.secondLayer = this.canvas.append("g").attr("id", "secondLayer");

        this.RECT_SIZE = {
          x: Utility.centerOfCanvas(this.canvasSize, 3000).x,
          y: Utility.centerOfCanvas(this.canvasSize, 3000).y,
          width: 3000,
          height: 3000
        }

        this.screenBoundariesCoords = [
          [this.RECT_SIZE.x, this.RECT_SIZE.y],
          [this.RECT_SIZE.width, this.RECT_SIZE.y],
          [this.RECT_SIZE.width, this.RECT_SIZE.height],
          [this.RECT_SIZE.x, this.RECT_SIZE.height]
        ]

        this.rect = this.secondLayer
        .append("rect")
        .attr('data-object','rects')
        .attr("x", this.RECT_SIZE.x)
        .attr("y", this.RECT_SIZE.y)
        .attr("width", this.RECT_SIZE.width)
        .attr("height", this.RECT_SIZE.height)
        .style("fill-opacity", 0)
        .style("stroke-dasharray", 10)
        .style("stroke", "#68b2a1")
        .style("stroke-width", 4);

        // ............................................................


            //  ADD IMAGE DATA TO THE MODEL CLASS
        if(this.mapId != null){

            this.houseMap = this.model.getHouseMap(this.mapId)[0];

            this.mapBoundariesCoords = this.houseMap.customBoundariesCoords;
            this.centroid = this.houseMap.centroid;
            this.faceCoords = this.houseMap.faceCoords;
            this.type = this.houseMap.type;
            this._stage = this.houseMap.stage;

            let data = {
              src: this.houseMap.imageData.src,
              width: Utility.resizeObject(this.canvasSize, this.houseMap.imageData.width, this.houseMap.imageData.height).width,
              height: Utility.resizeObject(this.canvasSize, this.houseMap.imageData.width, this.houseMap.imageData.height).height
            };

            let object = new Object({
              layer: this.firstLayer,
              data: data,
              canvasSize: this.canvasSize,
              objectName: 'map',
              attribute: this.attribute
            });

            this.start();


            console.log(this.mapBoundariesCoords,this.centroid,this.faceCoords,this.type,this._stage);

        } else {

          // this.clearMap();

          // INITIALIZING STAGE
          this._stage = 1;

          //  M O U S E  E V E N T S
          // this.addMouseEvent(this);

        }
        
    }


    // ?  S T A R T

    start () {

        switch(this._stage) {

            // ?   STAGE FOR PIN BOUNDARIES
            case 1:
              {
                // STAGE FIRST
                this.displayMessage("Start pinning by simply clicking on map borders", "danger");
                let stageFirst = new StageFirst({layer: this.secondLayer, className: "map-surface"});
                stageFirst.startDrawing(this);
                
              }
            break;
            // ? STAGE FOR FACING POINT SELECTION
            case 2:
              {
                // STAGE SECOND
                this.displayMessage("Select facing wall", "danger");
                this.assist.drawMask({layer: this.firstLayer, points: this.mapBoundariesCoords, size: this.RECT_SIZE});
                this.assist.drawBoundaries({layer: this.firstLayer, points: this.mapBoundariesCoords});
                this.assist.drawBharamNabhi({layer: this.firstLayer, centroid: this.centroid});
                let stageSecond = new StageSecond();
                stageSecond.startDrawing(this);


              }
              break;
              case 3:
              {
                // STAGE THIRD
                this.displayMessage("Select two point on map", "danger");
                this.assist.drawMask({layer: this.firstLayer, points: this.mapBoundariesCoords, size: this.RECT_SIZE});
                this.assist.drawBoundaries({layer: this.firstLayer, points: this.mapBoundariesCoords});
                this.assist.drawBharamNabhi({layer: this.firstLayer, centroid: this.centroid});
                this.assist.drawDirectionLines(this.firstLayer, this.faceCoords, this.centroid, this.division, this.angle);
                this.assist.drawFacingLine(this.firstLayer, this.centroid, this.faceCoords);
                let stageThird = new StageThird({layer: this.secondLayer, className: "find-distance"});
                stageThird.startDrawing(this);
              }
              break;
              case 4:
              {

                // STAGE FOURTH
                this.hideMessage();
                this.deactiveMouseEvent();
                this.assist.drawBackgroundGrid(this.firstLayer, this.centroid, this.faceCoords, this.division, this.angle);
                this.assist.drawMask({layer: this.firstLayer, points: this.mapBoundariesCoords, size: this.RECT_SIZE});
                this.assist.drawBoundaries({layer: this.firstLayer, points: this.mapBoundariesCoords});
                this.assist.drawBharamNabhi({layer: this.firstLayer, centroid: this.centroid});
                this.assist.drawDirectionLines(this.firstLayer, this.faceCoords, this.centroid, this.division, this.angle);
                this.assist.drawFacingLine(this.firstLayer, this.centroid, this.faceCoords);
                this.assist.drawGrid(this.firstLayer, this.centroid, this.faceCoords, this.screenBoundariesCoords, this.division, this.angle);

                this.screenPolygons = Utility.getIntersectionPoints(this.calNorthAngle(),this.centroid,this.screenBoundariesCoords, this.division);
                this.mapPolygonsArray = Utility.getIntersectionPoints(this.calNorthAngle(),this.centroid,this.mapBoundariesCoords, this.division);
                this.mapPolygonsAreaArray = Utility.getPolygonsArea(this.mapPolygonsArray);

                // ? DRAW BAR CHART
                this.modal.drawMap({areaArr: this.mapPolygonsAreaArray, division: this.division, dimension: this.distanceBetweenTwoPoints});
                
                let stageFourth = new StageFourth(this.attribute);
                stageFourth.startDrawing(this);
                
              }
              default:
              break;     

        }

    }


    end(stage) {
        this.DISABLE = true;
        this._response = false;
        stage.end(this);
    }
    
    // ?  M O U S E   E V E N T S

     
    // ?  A L L  G E T T E R S  A N D  S E T T E R S  ? //

    set activeTool(tool) {
        this.tool = tool;
    }

    set activeStrokeWidth(width) {
        this.strokeWidth = width;
    }

    set activeStrokeColor(color) {
        this.strokeColor = color;
    }

    set activeFill(fill) {
        this.fill = fill;
    }



     
    // ?  A L L  L I S T E N E R  F U N C T I O N  ? //
  

    // ? O B J E C T  C L I C K  E V E N T  L I S T E N E R
    _objectEventListener() {
        // CLASS REFERENCE
        let that = this;

        let x = this.attribute.getXAttribute();
        let y = this.attribute.getYAttribute();
        let width = this.attribute.getWidthAttribute();
        let height = this.attribute.getHeightAttribute();
        let angle = this.attribute.getAngleAttribute();
        let opacity = this.attribute.getOpacityAttribute();

        x.on('change', function(){
          let value = d3.select(this).property('value');
          let string = d3.select('.active[data-map-object]').style('transform')
          let numbers = string.match(/[+-]?\d+/g).map(Number);
          let xValue = numbers[4], yValue = numbers[5];
          d3.select('.active[data-map-object]').attr('transform',`translate(${value},${yValue})`)
          // console.log("x and y: ",xValue,typeof xValue," | ",yValue,typeof yValue);
        })

        y.on('change', function(){
          let value = d3.select(this).property('value');
          let string = d3.select('.active[data-map-object]').style('transform')
          let numbers = string.match(/[+-]?\d+/g).map(Number);
          let xValue = numbers[4], yValue = numbers[5];
          d3.select('.active[data-map-object]').attr('transform',`translate(${xValue},${value})`)
          console.log(string,numbers,"x and y: ",xValue,typeof xValue," | ",yValue,typeof yValue,`translate(${xValue},${value})`);
        })

        opacity.on('change', function(){
          let value = d3.select(this).property('value');
          d3.select('.range-value').text(value);

          d3.select('.active[data-map-object]').style('opacity',value);
        })

    }

    // ? M E N U  I T E M  L I S T E N E R
    _menuItemListener() {
        // CLASS REFERENCE
        let that = this;

        d3.selectAll('[data-menu-item]').on('click', function() {
            let menuItem = d3.select(this).attr('data-menu-item');
            switch(menuItem) {
                case "import map" : {
                    document.querySelector('input.import-map-file').click();
                }
                break;
                default:
                break;    
            }
        })

        document.querySelector("input.import-map-file").addEventListener("change", function() {
            
              var file = document.querySelector("input.import-map-file").files[0];
              var reader = new FileReader();
          
              reader.addEventListener("load", (e) => {
                let imageData = reader.result;
                let img = new Image();
          
                img.onload = function(){
                    // image  has been loaded
                    
                    let data = {
                        src: img.src,
                        width: Utility.resizeObject(that.canvasSize, this.width, this.height).width,
                        height: Utility.resizeObject(that.canvasSize, this.width, this.height).height
                    };
    
                    let object = new Object({
                        layer: that.firstLayer,
                        data: data,
                        canvasSize: that.canvasSize,
                        objectName: 'map',
                        attribute: that.attribute
                    });

                    that.mapId = Math.floor(1000000000 + Math.random() * 9000000000);
                    that.houseMap = that.model.add({id: that.mapId, image: {src: img.src, width: this.width, height: this.height}});
                    that.start();
                    that.DISABLE = false;

                };
          
                img.src = imageData;
          
              }, false);
          
              if(file) {
                reader.readAsDataURL(file);
              }
          
        });
    } 



    // ?  D R O P  O B J E CT   E V E N T  L I S T E N E R
    _dropItemEventListener() {

        document.querySelector("#drawArea").addEventListener("dragover", (e) => {
          e.preventDefault();
        });
    
        document.querySelector("#drawArea").addEventListener("drop", (e) => {
          e.preventDefault();

          let that = this;
          let file = e.dataTransfer.files;
    
          if (file || file[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(file[0]);
            reader.onloadend = function (e) {
              let imageData = e.target.result;
              let img = new Image();
    
              img.onload = function () {
                // image  has been loaded

                let data = {
                  src: img.src,
                  width: Utility.resizeObject(that.canvasSize, this.width, this.height).width,
                  height: Utility.resizeObject(that.canvasSize, this.width, this.height).height
                };

                let object = new Object({
                    layer: that.firstLayer,
                    data: data,
                    canvasSize: that.canvasSize,
                    objectName: 'map',
                    attribute: that.attribute
                });

                that.mapId = Math.floor(1000000000 + Math.random() * 9000000000);
                that.houseMap = that.model.add({id: that.mapId, image: {src: img.src, width: this.width, height: this.height}});
                that.start();
                that.DISABLE = false;

    
              };
              img.src = imageData;
            };
          }
        });
    
      }


    // ?   L I S T E N E R
    _attributeEventListener() {
        // CLASS REFERENCE
        let that = this;

        // console.log(d3.selectAll('g[data-object]'));

        // OBJECT ON CLICK LISTENER
        this.attribute.on('click', function(){
            console.log('object clicked');
            let name = d3.select(this).attr('data-object');
            let property = d3.select(this).node().getBoundingClientRect();
            d3.selectAll('[data-object]').classed('active-object', false);
            d3.select(this).classed('active-object', true);
            that.active = d3.select(this);

            that.attribute.setName(name)
            that.attribute.setX(property.x)
            that.attribute.setY(property.y)
            that.attribute.setWidth(property.width)
            that.attribute.setHeight(property.height)
            that.attribute.setAngle(0)

        })
    }  


    // ?  Z O O M  E V E N T  L I S T E N E R
    _zoomEventListener() {
        // CLASS REFERENCE
        let that = this;

        // ZOOM LISTENER
        d3.select('.zoom-display').on('keyup', function() {
          let zoom = d3.select(this).property('value') / 100;
          that.zoom.transform(that.canvas, d3.zoomIdentity.translate(Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width  * zoom), (that.canvasSize.height * zoom)).x,
          Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width  * zoom), (that.canvasSize.height * zoom)).y).scale(zoom));
          //console.log(zoom);
        })


        d3.selectAll('[data-zoom]').on('click', function() {
            let zoom = d3.select(this).attr('data-zoom');
            console.log(d3.select('#zoom-state'));

            switch(zoom) {
                case "35" : {
                  that.zoom.transform(that.canvas, d3.zoomIdentity.translate(Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width  * 0.35), (that.canvasSize.height * 0.35)).x,
                  Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width  * 0.35), (that.canvasSize.height * 0.35)).y).scale(0.35));
                  d3.select('.zoom-display').attr('value',35);
                }
                break;
                case "50" : {
                  that.zoom.transform(that.canvas, d3.zoomIdentity.translate(Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width  * 0.5), (that.canvasSize.height * 0.5)).x,
                  Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width  * 0.5), (that.canvasSize.height * 0.5)).y).scale(0.5));
                  d3.select('.zoom-display').attr('value',50);
                }
                break;
                case "100" : {
                  that.zoom.transform(that.canvas, d3.zoomIdentity.translate(Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width  * 1), (that.canvasSize.height * 1)).x,
                  Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width  * 1), (that.canvasSize.height * 1)).y).scale(1));
                  d3.select('.zoom-display').attr('value',100);
                }
                break;
                case "200" : {
                  that.zoom.transform(that.canvas, d3.zoomIdentity.translate(Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width  * 2), (that.canvasSize.height * 2)).x,
                  Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width  * 2), (that.canvasSize.height * 2)).y).scale(2));
                  d3.select('.zoom-display').attr('value',200);
                }
                break;
                case "fit" : {
                  that.zoom.transform(that.canvas, d3.zoomIdentity.translate(Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width  * 1), (that.canvasSize.height * 1)).x,
                  Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width  * 1), (that.canvasSize.height * 1)).y).scale(1));
                  d3.select('.zoom-display').attr('value',100);
                }
                break;
                default:
                break;
            }
        })

        // ZOOM STATE
        d3.select('#zoom-state').on('click', function() {
          let element = d3.select(this);
          let state = element.attr('data-zoom-state');
          if(state === 'enable') {
            that.svg.on('.zoom', null);
            element.attr('data-zoom-state', 'disable');
            element.select('img').attr('src', 'assets/icons/zoom-disable.svg');
          }else {
            that.svg.call(that.zoom)
            that.zoom.transform(that.canvas, d3.zoomIdentity.translate(that.zoomData.x,that.zoomData.y).scale(that.zoomData.k));
            element.attr('data-zoom-state', 'enable');
            element.select('img').attr('src', 'assets/icons/zoom-enable.svg');
          }
        })

    }


    // ?  W I N D O W  R E S I Z E  E V E N T  L I S T E N E R
    _windowResizeEventListener() {
        // CLASS REFERENCE
        let that = this;

        // WINDOW - RESIZER LISTENER
        d3.select(window).on('resize.updatesvg', function() {
            let width = d3.select("#drawArea").node().offsetWidth;
            let height = d3.select("#drawArea").node().offsetHeight;
        
            // ? RESIZE SVG ON WINDOW SIZE CHANGE
            d3.select('#canvas').attr('width',width).attr('height',height);
            that.attribute.setWidth(width)
            that.attribute.setHeight(height)

            // ?  C A N V A S  S I Z E
            that.canvasSize = {
              width: width,
              height: height,
            };

            //  RECT SIZE RESIZE 
            that.RECT_SIZE = {
              x: Utility.centerOfCanvas(that.canvasSize, 3000).x,
              y: Utility.centerOfCanvas(that.canvasSize, 3000).y,
              width: 3000,
              height: 3000
            }

            // RECT 
            that.rect.attr('x', that.RECT_SIZE.x).attr('y', that.RECT_SIZE.y);
        })
    }


    // ?  O B J E C T  P R O P E R T I E S  E V E N T  L I S T E N E R
    _objectPropertiesEventListener() {

        // CLASS REFERENCE
        let that = this;

        // STRUCTURE PROPERTY 
        d3.selectAll('[data-structure-property]').on('change', function() {
            let property = d3.select(this).attr('data-structure-property');
            let value = d3.select(this).property('value');
            console.log('property: ',property, value);
            switch(property) {
                case "x" : {
                    console.log('X PRESSED');
                }
                break;
                case "y" : {

                }
                break;
                case "width" : {

                }
                break;
                case "height" : {

                }
                break;
                case "angle" : {

                }
                default:
                break;
            }
        });

    }

    // ?  C O L O R  E V E N T  L I S T E N E R
    _colorEventListener() {
      d3.selectAll('[data-color]').on('click', function() {
        d3.selectAll('[data-color]').classed('active', false);
        d3.select(this).classed('active', true);

        this.color = d3.select(this).attr('data-color');

      })
    }

    // ?  S T R O K E  E V E N T  L I S T E N E R
    _colorEventListener() {
      d3.selectAll('.stroke-width').on('click', function() {

        this.stroke = d3.select(this).property('value');

      })
    }


    // ?  D 3  H E L P E R  F U N C T I O N S
    moving() {
        console.log(d3.select(this));
        d3.select(this).attr("transform", d3.event.transform);
    }

    stopMoving() {

    }





    // ?   L O C A L  F U N C T I O N S

    clearMap() {
      localStorage.hasOwnProperty('houseMaps') == true ? localStorage.removeItem("houseMaps") : null;
    }

    disableMouseEvent(layer) {
      layer.on("mousedown", null).on("mousemove", null).on("mouseup", null);
    }

    deactiveMouseEvent() {
      this.rect.style('display', 'none');
    }

    activeMouseEvent() {
      this.rect.style('display', 'block');
    }

    calNorthAngle() {
      const perpendicularPoints = Utility.getPerpendicularPoint(this.faceCoords[0], this.faceCoords[1], this.centroid);
      return Utility.getAngle(this.centroid.x, this.centroid.y, perpendicularPoints.x, perpendicularPoints.y);
    }

    displayMessage(msg, type='warning') {
      let alertbox = d3.select('#appAlert').classed(`alert-${type}`, true);
      alertbox.select('strong').html('Info! ');
      alertbox.select('span').html(`${msg}`);
      alertbox.classed('show', true)

    } 

    hideMessage() {
      d3.select('#appAlert').classed('show', false);
    }




}


const app = new App();