export default class Utility {
    
    // ! FUNCTION TO ALIGN OBJECT INSIDE CANVAS
    static centerOfCanvas(canvasSize, radius = 0, height = 0) {
      height = (height > 0) ? height : radius;
      return {x: ((canvasSize.width / 2) - (radius /2)), y: ((canvasSize.height / 2) - (height /2))}
    }

    // ! FUNCTION TO RESIZE IMAGE TO FIT IN CANVAS
    static resizeObject(canvasSize, width = 0, height = 0) {
      let maxValue = (width > height + 1) ? {max: 'width', value: width} : {max: 'height', value: height};
      if(maxValue.max === 'width') {
        if(maxValue.value > canvasSize.width + 150) {
          let percent = ((canvasSize.width - 150) * 100) / width;
          return {
              width: width * (percent / 100),
              height: height * (percent / 100)
          };
        } else {
            return{
              width: width,
              height: height
            }
        }
      }else if(maxValue.max === 'height') {
        if(maxValue.value > canvasSize.height + 150) {
          let percent = ((canvasSize.height - 150) * 100) / height;
          return {
              width: width * (percent / 100),
              height: height * (percent / 100),
          };

        } else {
          return{
            width: width,
            height: height
          }
        }
      }
    }

    // ! FUNCTION TO FIND CENTEROID 
    static getCentroid(pts) {
      pts = [pts];
      let first = pts[0][0],last = pts[0][pts[0].length - 1];
      if (first[0] != last[1] || first[1] != last[0]) pts.push(first[0]);
      let twicearea = 0,x = 0,y = 0,nPts = pts[0].length,p1,p2,f;
      for (let i = 0, j = nPts - 1; i < nPts; j = i++) {
        p1 = pts[0][i];
        p2 = pts[0][j];
        f = (p1[1] - first[1]) * (p2[0] - first[0]) -
          (p2[1] - first[1]) * (p1[0] - first[0]);
        twicearea += f;
        x += (p1[0] + p2[0] - 2 * first[0]) * f;
        y += (p1[1] + p2[1] - 2 * first[1]) * f;
      }
      f = twicearea * 3;
      return {
        x: parseFloat(x / f + first[0]),
        y: parseFloat(y / f + first[1]),
      };
    }

      // ! TO FIND CLOSEST COORDINATE
    static closestCoord(arr, coord) {
      let i = 0,
        minDiff = 100,
        ans = [];
      for (i in arr) {
        let x = Math.abs(coord[0] - arr[i][0]);
        let y = Math.abs(coord[1] - arr[i][1]);
        if (x + y < minDiff) {
          minDiff = x + y;
          ans = [arr[i][0], arr[i][1]];
        }
      }
      return ans;
    }

    // ! TO FIND PERPENDICULAR POINT
    static getPerpendicularPoint(A, B, C) {
      var x1 = A[0], y1 = A[1], x2 = B[0],
        y2 = B[1], x3 = C.x, y3 = C.y;
      var px = x2 - x1, py = y2 - y1,
      dAB = px * px + py * py;
      var u = ((x3 - x1) * px + (y3 - y1) * py) / dAB;
      var x = x1 + u * px,y = y1 + u * py;
      return { x: x, y: y }; //this is D
    }

    // ! TO FIND ANGLE FROM ONE TO ANOTHER POINT
    static getAngle(cx, cy, ex, ey) {
      let dy = ey - cy;
      let dx = ex - cx;
      let theta = Math.atan2(dy, dx); // range (-PI, PI]
      theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
      if (theta < 0) theta = 360 + theta; // range [0, 360)
      return parseFloat((theta).toFixed(3));
    }

    // ! TO FIND LINE INTERSECTION
    static linesIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
      // Check if none of the lines are of length 0
      if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false;
      }
  
      let denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  
      // Lines are parallel
      if (denominator === 0) {
        return false;
      }
  
      let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
      let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
  
      // is the intersection along the segments
      if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return false;
      }
  
      // Return a object with the x and y coordinates of the intersection
      let x = x1 + ua * (x2 - x1);
      let y = y1 + ua * (y2 - y1);
  
      return { x, y };
    }

    // ! GET INTERSECTION POINTS
    static getIntersectionPoints(nAngle, centroid, mapBoundariesCoords, division=8, type="polygon"){
      let directions;
      let ipArray = [];
      let outerPolygons = [];
      let polygons = [];
      let extremePoints = [];
      let ang = [],temp = nAngle,leftDeg,rightDeg;
    
      if(division == 4) directions = ['N','E','S','W'];
      else if(division == 8) directions = ['N','NE','E','SE','S','SW','W','NW'];
      else if(division == 16) directions = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
      else if(division == 32) directions = ['N4','N5','N6','N7','N8','E1','E2','E3','E4','E5','E6','E7','E8','S1','S2','S3','S4','S5','S6','S7','S8','W1','W2','W3','W4','W5','W6','W7','W8','N1','N2','N3'];
    
      for (let i = 0; i < division; i++) {
        leftDeg = (temp - (360 / (division * 2))) * 0.0174533;
        rightDeg = (temp + (360 / (division * 2))) * 0.0174533;
        ang.push({ang:directions[i], lDeg:leftDeg, rDeg:rightDeg});
        temp += (360 / division);
      }
    
      // FOR INTERSECTION ARRAY
      for(let j = 0; j < ang.length; j++){
        let point1 = [centroid.x,centroid.y];
        let point2 = [centroid.x + Math.cos(ang[j].lDeg) * 3200, centroid.y + Math.sin(ang[j].lDeg) * 3200];
        
        for(let m = 0,n = m+1; m < mapBoundariesCoords.length; m++,n++) {
          (m == mapBoundariesCoords.length-1) ? n = 0 : null;
          
          let ip = this.linesIntersection(...point1,...point2,...mapBoundariesCoords[m],...mapBoundariesCoords[n]);
          if(ip) ipArray.push({direction:ang[j].ang, wall:[mapBoundariesCoords[m],mapBoundariesCoords[n]], ip:[ip.x,ip.y]})
        }
      }
    
      // d3.select('#eightLayer').append('line').attr('x1',centroid.x).attr('y1',centroid.y)
      // .attr('x2',(centroid.x + Math.cos(ang[0].lDeg) * 1000)).attr('y2',(centroid.y + Math.sin(ang[0].lDeg) * 1000))
      // .style('stroke','red').style('stroke-width', 3);
    
      if(type == "polygon") {
    
        // FOR POLYGON ARRAY
        for(let j = 0; j < ang.length; j++){
          let point = [centroid.x + Math.cos(ang[j].lDeg) * 3200, centroid.y + Math.sin(ang[j].lDeg) * 3200];
          extremePoints.push(point);
        }
    
        for(let j = 0; j < division; j++) {
              let k = (j == division-1) ? 0 : j + 1 ;
              outerPolygons.push({direction: directions[j], points: [extremePoints[j],extremePoints[k],[centroid.x,centroid.y]]});
        }
        polygons = Utility.getPolygonsArray(outerPolygons,mapBoundariesCoords);
        // console.log("polygons: ",polygons);
        // console.log("outer polygons: ",outerPolygons);
      }
    
      return (type == "polygon") ? polygons : ipArray;
    
    }

    // ! GET POLYGON ARRAY
    static getPolygonsArray(source, clip) {
      let intersectionArr = [];
      for(let i = 0; i < source.length; i++) {
        intersectionArr.push(greinerHormann.intersection(source[i].points, clip))
      }
      return intersectionArr;
    }

    // ! GET POLYGONS AREA ARRAY
    static getPolygonsArea(arr) {
      let areaArr = [];
    
      for(let i in arr) {
        let area = 0;
    
        if(arr[i] != null || arr[i] != undefined) {
          for(let j in arr[i]) {
            area += Math.abs(d3.polygonArea(arr[i][j]));
          }
        }  
        areaArr.push(area);
      }
    
      return areaArr;
    }

}