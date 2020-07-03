import ActionBox from "../helper/actionbox.class.js";
import Object from '../object.class.js'
import Utility from "../helper/utility.class.js";

export default class StageFourth {

    constructor(attribute) {
        this.attribute = attribute;
        this.actionbox = new ActionBox();
    }
  
    startDrawing(REF) {
      let that = REF;
      let classRef = this;

      let actionBox = this.actionbox.clear().get();
  
      let actionText = actionBox
        .append("p")
        .attr("class", "text-uppercase text-sm actionbox-text")
        .text("");
  
      let actionBody = actionBox
        .append("div")
        .attr("class", "form-row actionbox-body");  
  
      let faceSelectbox = actionBody.append('div').attr('class','col-md-6')
      .append("select").attr('name','select-face').attr("class", "form-control form-control-sm text-sm");
      faceSelectbox.append('option').html('select Face');
  
      for (let i = 0; i < that.mapBoundariesCoords.length; i++) {
        let j = i < that.mapBoundariesCoords.length - 1 ? i + 1 : 0;
        let wallPointFirst = (i + 10).toString(36).toUpperCase();
        let wallPointSecond = (j + 10).toString(36).toUpperCase();
        faceSelectbox.append("option").attr("value", [
            that.mapBoundariesCoords[i],
            that.mapBoundariesCoords[j],
          ])
          .text(`Wall ${wallPointFirst} - ${wallPointSecond}`);
      }

      let gridSelectbox = actionBody.append('div').attr('class','col-md-6')
      .append("select").attr('name','select-grid').attr("class", "form-control form-control-sm text-sm");
      gridSelectbox.append('option').html('select Grid');
      gridSelectbox.append("option").attr("value", 8).html('8 Division');
      gridSelectbox.append("option").attr("value", 16).html('16 Division');
      gridSelectbox.append("option").attr("value", 32).html('32 Division');

      let angleInputbox = actionBody.append('div').attr('class','col-md-12')
      .append("input").attr("class", "mt-2 form-control form-control-sm text-sm")
      .attr('type', 'number').attr('placeholder', 'Degree');

      let container = actionBox.append('div').attr('class', 'form-row justify-content-between p-2');

      let barchartContainer = container.append('div').attr('class', 'col-md-3 d-flex justify-content-center align-items-center border object-actions')
      .attr('data-action-object', 'barchart').attr('data-toggle', 'modal').attr('data-target', '#appModal')
      .style('flex-direction','column').style('height','42px').style('min-width','55px');
      let barchart = barchartContainer.append('img').attr('src', 'assets/icons/barchart.svg').attr('width', 20);
      barchartContainer.append('span').style('margin-top','1px').style('font-size','9px').text('barchart');

      let vpmContainer = container.append('div').attr('class', 'col-md-3 d-flex justify-content-center align-items-center border object-actions')
      .style('flex-direction','column').style('height','42px').style('min-width','55px');
      let vpm = vpmContainer.attr('data-action-object', 'assets/icons/mvm.svg').append('img').attr('src', 'assets/icons/mvm.svg').attr('width', 20);
      vpmContainer.append('span').style('margin-top','1px').style('font-size','9px').text('vpm');

      let mvmContainer = container.append('div').attr('class', 'col-md-3 d-flex justify-content-center align-items-center border object-actions')
      .style('flex-direction','column').style('height','42px').style('min-width','55px');
      let mvm = mvmContainer.attr('data-action-object', 'assets/icons/vpm.svg').append('img').attr('src', 'assets/icons/vpm.svg').attr('width', 20);
      mvmContainer.append('span').style('margin-top','1px').style('font-size','9px').text('mvpc');
  
      faceSelectbox.on("change", function() {
        let str = d3.select(this).node().value.split(',');
        let pointA = [parseInt(str[0]),parseInt(str[1])];
        let pointB = [parseInt(str[2]),parseInt(str[3])];

        that.faceCoords = [pointA, pointB];
        that.model.editFaceCoords(that.mapId, [pointA, pointB]);

        // that.start();
        that.assist.drawBackgroundGrid(that.firstLayer, that.centroid, that.faceCoords, that.division, that.angle);
        that.assist.drawMask({layer: that.firstLayer, points: that.mapBoundariesCoords, size: that.RECT_SIZE});
        that.assist.drawBoundaries({layer: that.firstLayer, points: that.mapBoundariesCoords});
        that.assist.drawBharamNabhi({layer: that.firstLayer, centroid: that.centroid});
        that.assist.drawDirectionLines(that.firstLayer, that.faceCoords, that.centroid, that.division, that.angle);
        that.assist.drawFacingLine(that.firstLayer, that.centroid, that.faceCoords);
        that.assist.drawGrid(that.firstLayer, that.centroid, that.faceCoords, that.screenBoundariesCoords, that.division, that.angle);

        that.screenPolygons = Utility.getIntersectionPoints(that.calNorthAngle(),that.centroid,that.screenBoundariesCoords, that.division);
        that.mapPolygonsArray = Utility.getIntersectionPoints(that.calNorthAngle(),that.centroid,that.mapBoundariesCoords, that.division);
        that.mapPolygonsAreaArray = Utility.getPolygonsArea(that.mapPolygonsArray);

        // ? DRAW BAR CHART
        that.modal.drawMap({areaArr: that.mapPolygonsAreaArray, division: that.division, dimension: that.distanceBetweenTwoPoints});
        

      })

      gridSelectbox.on("change", function() {
        let division = d3.select(this).property('value');
        that.division = division;
        
        // that.start();
        that.assist.drawBackgroundGrid(that.firstLayer, that.centroid, that.faceCoords, that.division, that.angle);
        that.assist.drawMask({layer: that.firstLayer, points: that.mapBoundariesCoords, size: that.RECT_SIZE});
        that.assist.drawBoundaries({layer: that.firstLayer, points: that.mapBoundariesCoords});
        that.assist.drawBharamNabhi({layer: that.firstLayer, centroid: that.centroid});
        that.assist.drawDirectionLines(that.firstLayer, that.faceCoords, that.centroid, that.division, that.angle);
        that.assist.drawFacingLine(that.firstLayer, that.centroid, that.faceCoords);
        that.assist.drawGrid(that.firstLayer, that.centroid, that.faceCoords, that.screenBoundariesCoords, that.division, that.angle);

        that.screenPolygons = Utility.getIntersectionPoints(that.calNorthAngle(),that.centroid,that.screenBoundariesCoords, that.division);
        that.mapPolygonsArray = Utility.getIntersectionPoints(that.calNorthAngle(),that.centroid,that.mapBoundariesCoords, that.division);
        that.mapPolygonsAreaArray = Utility.getPolygonsArea(that.mapPolygonsArray);

        // ? DRAW BAR CHART
        that.modal.drawMap({areaArr: that.mapPolygonsAreaArray, division: that.division, dimension: that.distanceBetweenTwoPoints});
      })

      angleInputbox.on("change", function() {
          let theta = (angleInputbox.property('value') == "") ? 0 : parseFloat(angleInputbox.property('value'));
          that.angle = -theta;

          // that.start();
          that.assist.drawBackgroundGrid(that.firstLayer, that.centroid, that.faceCoords, that.division, that.angle);
          that.assist.drawMask({layer: that.firstLayer, points: that.mapBoundariesCoords, size: that.RECT_SIZE});
          that.assist.drawBoundaries({layer: that.firstLayer, points: that.mapBoundariesCoords});
          that.assist.drawBharamNabhi({layer: that.firstLayer, centroid: that.centroid});
          that.assist.drawDirectionLines(that.firstLayer, that.faceCoords, that.centroid, that.division, that.angle);
          that.assist.drawFacingLine(that.firstLayer, that.centroid, that.faceCoords);
          that.assist.drawGrid(that.firstLayer, that.centroid, that.faceCoords, that.screenBoundariesCoords, that.division, that.angle);
          d3.select('.facing-degree').text(`${theta}°`)
  
          that.screenPolygons = Utility.getIntersectionPoints(that.calNorthAngle(),that.centroid,that.screenBoundariesCoords, that.division);
          that.mapPolygonsArray = Utility.getIntersectionPoints(that.calNorthAngle(),that.centroid,that.mapBoundariesCoords, that.division);
          that.mapPolygonsAreaArray = Utility.getPolygonsArea(that.mapPolygonsArray);
  
          // ? DRAW BAR CHART
          that.modal.drawMap({areaArr: that.mapPolygonsAreaArray, division: that.division, dimension: that.distanceBetweenTwoPoints});
      })

      vpm.on('click', function() {
        if(classRef.objectVpm == null || classRef.objectVpm == undefined) {
          d3.select('.properties-section.opacity').style('display','block');
          d3.select(this.parentNode).classed('active', true);
          let data = {
            src: 'assets/images/vpm.svg',
            width: 400,
            height: 400
          }
          classRef.objectVpm = new Object({
            layer: that.secondLayer,
            data: data,
            canvasSize: that.canvasSize,
            objectName: 'VPM',
            attribute: that.attribute
          });
        } else {
          d3.select(this.parentNode).classed('active', false);
          classRef.objectVpm.getObject().remove();
          classRef.objectVpm = null;

          (classRef.objectMvm != null && classRef.objectVpm != null) ? d3.select('.properties-section.opacity').style('display','none') : null;
        }  

      })

      mvm.on('click', function() {
        if(classRef.objectMvm == null || classRef.objectMvm == undefined) {
          d3.select('.properties-section.opacity').style('display','block');
          d3.select(this.parentNode).classed('active', true);
          let data = {
            src: 'assets/images/mvm.svg',
            width: 350,
            height: 350
          }
          classRef.objectMvm = new Object({
            layer: that.secondLayer,
            data: data,
            canvasSize: that.canvasSize,
            objectName: 'MVM',
            attribute: that.attribute
          });
        } else {
          d3.select(this.parentNode).classed('active', false);
          classRef.objectMvm.getObject().remove();
          classRef.objectMvm = null;

          (classRef.objectMvm != null && classRef.objectVpm != null) ? d3.select('.properties-section.opacity').style('display','none') : null;
          
        }

      })


      this.actionbox.show();
  
    }

}