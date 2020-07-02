import { DIRECTION_EIGHT, DIRECTION_SIXTEEN, DIRECTION_THIRTYTWO } from "./directiondetails.class.js";
import Utility from './utility.class.js';

export default class Assist {
    constructor() {

        this.DATA_EIGHT = [
            {name: 'N', value: 1, color: "blue"}, {name: 'NE', value: 1, color: "blue"}, {name: 'E', value: 1, color: "green"}, 
            {name: 'SE', value: 1, color: "red"}, {name: 'S', value: 1, color: "red"}, {name: 'SW', value: 1, color: "yellow"}, 
            {name: 'W', value: 1, color: "white"}, {name: 'NW', value: 1, color: "white"}
        ];

        this.DATA_SIXTEEN = [
            {name: 'N', value: 1, color: "blue"}, {name: 'NNE', value: 1, color: "blue"}, {name: 'NE', value: 1, color: "blue"},
            {name: 'ENE', value: 1, color: "green"}, {name: 'E', value: 1, color: "green"}, {name: 'ESE', value: 1, color: "green"},
            {name: 'SE', value: 1, color: "red"}, {name: 'SSE', value: 1, color: "red"}, {name: 'S', value: 1, color: "red"},
            {name: 'SSW', value: 1, color: "yellow"}, {name: 'SW', value: 1, color: "yellow"},  {name: 'WSW', value: 1, color: "white"},
            {name: 'W', value: 1, color: "white"}, {name: 'WNW', value: 1, color: "white"}, {name: 'NW', value: 1, color: "white"},
            {name: 'NNW', value: 1, color: "blue"}
        ];

        this.DATA_THIRTYTWO = [
            {name: 'N4', value: 1, color: "white"}, {name: 'N5', value: 1, color: "white"}, {name: 'N6', value: 1, color: "white"}, 
            {name: 'N7', value: 1, color: "white"}, {name: 'N8', value: 1, color: "green"}, {name: 'E1', value: 1, color: "white"},
            {name: 'E2', value: 1, color: "blue"}, {name: 'E3', value: 1, color: "blue"}, {name: 'E4', value: 1, color: "green"}, 
            {name: 'E5', value: 1, color: "blue"}, {name: 'E6', value: 1, color: "blue"}, {name: 'E7', value: 1, color: "red"},
            {name: 'E8', value: 1, color: "green"}, {name: 'S1', value: 1, color: "yellow"}, {name: 'S2', value: 1, color: "red"}, 
            {name:'S3', value: 1, color: "red"}, {name: 'S4', value: 1, color: "red"}, {name: 'S5', value: 1, color: "green"}, 
            {name: 'S6', value: 1, color: "yellow"}, {name: 'S7', value: 1, color: "yellow"}, {name: 'S8', value: 1, color: "yellow"}, 
            {name: 'W1', value: 1, color: "white"}, {name: 'W2', value: 1, color: "red"}, {name: 'W3', value: 1, color: "red"},
            {name: 'W4', value: 1, color: "white"}, {name: 'W5', value: 1, color: "white"}, {name: 'W6', value: 1, color: "yellow"}, 
            {name: 'W7', value: 1, color: "white"}, {name: 'W8', value: 1, color: "yellow"}, {name: 'N1', value: 1, color: "yellow"},
            {name: 'N2', value: 1, color: "white"}, {name: 'N3', value: 1, color: "blue"}
        ];

    }


    drawMask({layer, points, size}) {

        layer.select('g.mask').remove();

        this.root = layer.append("g").classed('surface-mask', true);

        this.mask = this.root
        .append("defs")
        .append("mask")
        .attr("id", "myMask");
        
        this.mask.append("rect")
        .attr("x", size.x)
        .attr("y", size.y)
        .attr("width", size.width)
        .attr("height", size.height)
        .style("fill", "white")
        .style("fill-opacity", 0.95);

        this.mask.append("polygon")
        .attr("points", points);

        this.series = this.root
        .attr("class", "mask")
        .attr("width", size.width)
        .attr("height", size.height)
        .append("g")
        .attr("transform", "translate(0,0)");

        this.rect = this.series
        .append("rect")
        .attr("x", size.x)
        .attr("y", size.y)
        .attr("width", size.width)
        .attr("height", size.height)
        .attr("mask", "url(#myMask)")
        .style("fill", "#283333")
        .style("fill-opacity",0.95);
    }

    drawBoundaries({layer, points}) {

        layer.select('g.map-boundaries').remove();
            
        let g = layer.append('g').classed('map-boundaries', true);

        g.append('polygon')
        .attr('points', points)
        .style('stroke', '#6869AB')
        .style('stroke-width', 2)
        .style('fill-opacity', 0);

        for(let i = 0; i < points.length; i++){
            let circle = g.selectAll('circles')
            .data([points[i]]).enter()
            .append('circle')
            .classed('dragger', true)
            .attr('cx', points[i][0])
            .attr('cy', points[i][1])
            .attr('r', 4)
            .attr('fill', '#FDBC07')
            .attr('stroke', '#000');

            g.append('text').text(String.fromCharCode(i + 65).toUpperCase())
            .attr('x', points[i][0]-5)
            .attr('y', points[i][1]-7)
            .attr('fill','#fb5665');

            }
    }

    drawDirectionLines(layer, faceCoords, centroid, division = 8, angle = 0) {

        layer.selectAll('g.direction-lines').remove();

        let perpendicularPoints = Utility.getPerpendicularPoint(faceCoords[0],faceCoords[1],centroid);
        let nAngle = Utility.getAngle(centroid.x, centroid.y, perpendicularPoints.x, perpendicularPoints.y);
        let increment = (360/parseInt(division));

        // console.log((360/parseInt(division)), division, layer, facingWallPoints,centeroid,division,angle);
        // console.log("nAngle: ",nAngle);
      
        for (let i = 0; i < division; i++) {
          let direction = layer
            .append('g').classed('direction-lines group', true)
            .append("line")
            .attr("stroke-dasharray", "5,5")
            .attr("x1", centroid.x)
            .attr("y1", centroid.y)
            .attr("x2", parseFloat(centroid.x) + 800)
            .attr("y2", centroid.y)
            .attr("transform", "rotate(" + (nAngle + angle) + " " + centroid.x + " " + centroid.y + ")" )
            .attr("stroke", (i == 0 ? "red" : "darkorange"))
            .attr("stroke-width", (i == 0 ? 2 : 1))
            .classed("directions", true);
          nAngle += increment;
        }
    }

    drawBharamNabhi({layer, centroid}) {

        layer.select('g.bharamnabhi').remove();       
        
        // To draw centeroid of House Map starts
        let g = layer.append('g').classed('bharamnabhi', true);

        g.append("circle")
        .classed("inner-circle", true)
        .attr("cx", centroid.x)
        .attr("cy", centroid.y)
        .attr('r', 3)
        .style('fill','#000')

        g.append("circle")
        .classed("outer-circle", true)
        .attr("cx", centroid.x)
        .attr("cy", centroid.y)
        .attr("r", 15)
        .attr("fill", "#EF5350")
        .attr('fill-opacity', 0.5)
        .attr("stroke", "#000")
        .attr("is-handle", "true");
    
    }

    drawBackgroundGrid(layer, centroid, faceCoords, division = 8, angle = 0) {
        
        layer.select('g.background-pie-chart').remove();

        let perpendicularPoints = Utility.getPerpendicularPoint(faceCoords[0],faceCoords[1], centroid);
        let nAngle = Utility.getAngle(centroid.x, centroid.y, perpendicularPoints.x, perpendicularPoints.y);
        let gridAngle = 360/8, radius = 800, data = [];

        if(division == 8) { data = this.DATA_EIGHT; }
        else if(division == 16) { gridAngle += 360/division; data = this.DATA_SIXTEEN; }
        else if(division == 32) { gridAngle += 360/division; data = this.DATA_THIRTYTWO; }

        let arc = d3
            .arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        let pie = d3
            .pie()
            .startAngle(Math.PI / (division))
            .endAngle(Math.PI * 2 + Math.PI / division);

        let svg = layer
            .append("g").classed('background-pie-chart', true)
            .attr("transform", "translate("+ centroid.x +","+ centroid.y +")");

        let g = svg
            .selectAll(".arc")
            .data(pie(data.map(function (d) { return d.value;})))
            .enter()
            .append("g")
            .attr("transform", "rotate(" + (gridAngle + nAngle +  angle) + ")");

        g.append("path")
            .attr("class", function (d, i) { return "B-" + data[i].name; })
            .attr("d", arc)
            .style('fill', function(d,i){ return data[i].color })
            .style("fill-opacity", "0");
    }

    drawGrid(layer, centroid, faceCoords, screenBoundariesCoords, division = 8, angle = 0) {

        layer.select('g.pie-chart').remove();

        let perpendicularPoints = Utility.getPerpendicularPoint(faceCoords[0],faceCoords[1], centroid);
        let nAngle = Utility.getAngle(centroid.x, centroid.y, perpendicularPoints.x, perpendicularPoints.y);
        let data = [], gridAngle = 360/8, radius = 800, directionData, directionDetail;

        let directions = [{dir:'N',baseAng: 90},{dir:'E',baseAng: 360},{dir:'S',baseAng: 270},{dir:'W',baseAng: 180}]
        let activeDir;

        for(let m = 0,n = m+1; m < screenBoundariesCoords.length; m++,n++) {
            (m == screenBoundariesCoords.length-1) ? n = 0 : null;
            let ip = Utility.linesIntersection(centroid.x,centroid.y,(centroid.x + Math.cos(nAngle * 0.0174533) * 3200),(centroid.y + Math.sin(nAngle * 0.0174533) * 3200),...screenBoundariesCoords[m],...screenBoundariesCoords[n]);
            if(ip){ activeDir = directions[m]; }
        }


        if(division == 8) { directionData = this.DATA_EIGHT; directionDetail = DIRECTION_EIGHT; }
        else if(division == 16) { gridAngle += 360/division; directionData   = this.DATA_SIXTEEN; directionDetail = DIRECTION_SIXTEEN; }
        else if(division == 32) { gridAngle += 360/division; directionData  = this.DATA_THIRTYTWO; directionDetail = DIRECTION_THIRTYTWO; }

        for (let i = 0; i < division; i++) {
            var temp = { name: directionData[i].name, value: directionData[i].value, detail: directionDetail[i] };
            data.push(temp);
        }

        let newAng;

        if(division == 8) {
            newAng = 45;
        }
        else if (division == 16){
            newAng = 67.5;
        }
        else {
            newAng = 56.25;
        }

        let arc = d3
            .arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        let pie = d3
            .pie()
            .startAngle(Math.PI / division)
            .endAngle(Math.PI * 2 + Math.PI / division);

        let svg = layer
            .append("g").classed('pie-chart', true)
            .attr("transform", "translate("+ centroid.x +","+ centroid.y +")");

        let g = svg
            .selectAll(".arc")
            .data(pie(data.map(function (d) { return d.value;})))
            .enter()
            .append("g")
            .attr("transform", "rotate(" + (gridAngle + nAngle + angle) + ")");

        g.append("path")
            .attr("class", function (d, i) { return data[i].name; })
            .attr("data-detail", function(d,i) { return data[i].detail; })
            .attr("d", arc)
            .attr("stroke", "#21252963")
            .style("fill-opacity", "0");

        g.append("text")
            .attr("transform", function(d) {
            var _d = arc.centroid(d);
            _d[0] *= 1;	//multiply by a constant factor
            _d[1] *= 1;	//multiply by a constant factor
            return "translate(" + _d + ") rotate("+(activeDir.baseAng - angle - newAng)+")";
            })
            .attr("dy", ".50em")
            .style("text-anchor", "middle")
            .style("fill", "white")
            .text(function(d,i){
                return data[i].name;
            });

        g.on("mouseover", function () {
            let className = d3.select(this).select("path").attr("class");
            let detail = d3.select(this).select("path").attr("data-detail");
            
            d3.select(".B-" + className)
                .style("fill-opacity", "0.75");
            
            d3.select(this)
                .select("path")
                .style("fill", "green")
                .style("fill-opacity", "0.1");
            
            d3.select('.property.description').text(detail);     
            
        }).on("mouseout", function () {
            let className = d3.select(this).select("path").attr("class");
            
            d3.select(".B-" + className)
                .style("fill-opacity", "0");
            d3.select(this)
                .select("path")
                .style("fill", "#fff")
                .style("fill-opacity", "0");
        });    
    }


    drawFacingLine(layer, centroid, faceCoords) {

        let perpendicularPointOnFacingWall = Utility.getPerpendicularPoint(faceCoords[0],faceCoords[1],centroid);

        layer.select('.facing').remove();
        layer.select('.facing-degree').remove();

        let facingLine = layer
        .append("line")
        .classed("facing", true)
        .attr("x1", centroid.x)
        .attr("y1", centroid.y)
        .attr("x2", perpendicularPointOnFacingWall.x)
        .attr("y2", perpendicularPointOnFacingWall.y)
        .attr("stroke", "blue")
        .attr("stroke-width", 4);

        let facingDegree = layer
        .append("text")
        .classed("facing-degree", true)
        .attr("x", perpendicularPointOnFacingWall.x)
        .attr("y", perpendicularPointOnFacingWall.y)
        .attr("fill", "blue")
        .attr("font-size", "18px")
        .attr("font-weight", "bold")
        .attr("dominant-baseline", "auto")
        .text("0°");
    }

}