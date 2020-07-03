import ActionBox from '../helper/actionbox.class.js';
import Utility from '../helper/utility.class.js';

export default class StageFirst {

    constructor({layer, className}) {
        
        /* 
            ?  L O C A L  V A R I A B L E S
        */

        this.layer = layer;
        this.className = className;

        this.actionbox = new ActionBox();

        this.dragging = false;
        this.drawing = false;
        this.disable = false;
        this.startPoint = [];
        this.points = [];
        this.g;

        // DRAGGER
        this.dragger = d3.drag()
        .on('drag', this.handleDrag)
        .on('start end', (d) => { this.dragging = false; });

        this.undo();
        
    }

    startDrawing(REF) {

        // CLASS REFERENCE
        let that = this;

        // this.layer.on("mousedown", function () {
        //     // EMPTY
        // })

        this.layer.on("mousemove", function () {
            if(that.disable) return;
            if(!that.drawing) return;
    
            let g = d3.select(`g.${that.className}`);
            g.select('line').remove();
            let line = g.append('line')
            .attr('x1', that.startPoint[0])
            .attr('y1', that.startPoint[1])
            .attr('x2', d3.mouse(this)[0] + 2)
            .attr('y2', d3.mouse(this)[1])
            .attr('stroke', REF.strokeColor)
            .attr('stroke-width', REF.strokeWidth);

        })

        this.layer.on("mouseup", function () {
            if(that.disable) return;
            if(that.dragging) return;
        
            that.drawing = true;
    
            that.startPoint = [d3.mouse(this)[0], d3.mouse(this)[1]];
            if(that.layer.select(`g.${that.className}`).empty()) that.g = that.layer.append('g').attr('class', that.className);
            if(d3.event.target.hasAttribute('is-handle')) { that.closePolygon(REF); return true; }
    
            that.points.push(d3.mouse(this));
            that.g.select('polyline').remove();
            
            let polyline = that.g.append('polyline').attr('points', that.points)
            .style('fill', 'none').attr('stroke', REF.strokeColor).attr('stroke-width', REF.strokeWidth);

            that.g.append('circle')
            .attr('cx', that.startPoint[0])
            .attr('cy', that.startPoint[1])
            .attr('r', 4)
            .attr('fill', 'yellow')
            .attr('stroke', '#000')
            .attr('is-handle', 'true')
            .style('cursor', 'pointer');            
            
        })
    }

    closePolygon(REF) {

        if(this.disable) return;

        let that = this;

        d3.select(`g.${this.className}`).remove();
        
        let g = this.layer.append('g').classed(this.className, true);
        
        g.append('polygon')
        .attr('points', this.points)
        .style('stroke', '#6869AB')
        .style('stroke-width', 2)
        .style('fill', '#ff0000')
        .style('fill-opacity', 0.3);

        for(let i = 0; i < this.points.length; i++){
            let circle = g.selectAll('circles')
            .data([this.points[i]]).enter()
            .append('circle')
            .attr('cx', this.points[i][0])
            .attr('cy', this.points[i][1])
            .attr('r', 4)
            .attr('fill', '#FDBC07')
            .attr('stroke', '#000')
            .attr('is-handle', 'true')
            .call(that.dragger)
            .style('cursor', 'move');
            g.append('text').text('P'+i)
            .attr('x', this.points[i][0]-10)
            .attr('y', this.points[i][1]-7)
            .attr('fill','#fb5665');

        }

        this.disable = true;
        this.drawing = false;
        this.end(REF);

    }

    handleDrag(d) {
        if(this.disable)  return;
        if(this.drawing) return;

        let texts = d3.select(this.parentNode).selectAll('text').style('display','none');
        let dragCircle = d3.select(this), newPoints = [], circle, text;
        this.dragging = true;
        let poly = d3.select(this.parentNode).select('polygon');
        let polyLine = d3.select(this.parentNode).select('polyline');
        let circles = d3.select(this.parentNode).selectAll('circle')["_groups"][0];
        dragCircle.attr('cx', d3.event.x).attr('cy', d3.event.y);

        for(let i = 0; i < circles.length; i++){
            circle = d3.select(circles[i]);
            newPoints.push([circle.attr('cx'), circle.attr('cy')]);
        }

        poly.attr('points', newPoints);
    }

    end(REF) {
        let that = REF;

        this.actionBox = this.actionbox.clear().get();
        
        this.actionText = this.actionBox.append('p')
        .attr('class','text-uppercase text-sm actionbox-text')
        .text('Is pinning done ?');

        this.actionBody = this.actionBox.append('div')
        .attr('class','row actionbox-body');

        this.actionBtnYes = this.actionBody.append('div')
        .attr('class','col-md-3')
        .append('button')
        .attr('class','btn btn-outline-primary btn-sm text-sm')
        .html('YES');

        this.actionBtnReset = this.actionBody.append('div')
        .attr('class', 'col-md-3')
        .append('button')
        .attr('class','btn btn-outline-danger btn-sm text-sm')
        .html('RESET');

        this.actionbox.show();

        this.actionBtnYes.on("click", (e) => {

            if(this.points.length > 2 && Math.abs(d3.polygonArea(this.points)) > 5000) {

                this.actionbox.clear().hide();
                this.remove();

                // APP CLASS VARIABLES
                that.mapBoundariesCoords = this.points;
                that.centroid = Utility.getCentroid(this.points);
                that._stage = 2;
                that.model.editStage(that.mapId, 2);
                that.model.editCustomBoundariesCoords(that.mapId, this.points);
                that.model.editCentroid(that.mapId, that.centroid);
                that.start();

            } else {
                this.showToast("Warning!","Pinning is not done correctly! please try again.","Reset",this)
                this.actionBtnYes.property('disabled', true);
            }
        })

        this.actionBtnReset.on("click", (e) => {
            this.resetStage();
        })
    }

    undo() {

        document.addEventListener('keydown', (event) => {
            if(this.polygonClosed = true && this.points.length < 0) return false;
            if ((event.ctrlKey && event.key === 'z') || (event.metaKey && event.key === 'z')) {
              this.points.pop();
              this.startPoint = this.points[this.points.length-1];
              this.g.select('polyline').remove();
              this.g.append('polyline').attr('points', this.points)
              .style('fill', 'none').attr('stroke', '#EF5350').attr('stroke-width','3');
              this.g.selectAll('circle:last-of-type').remove();
            }
            // else if (event.metaKey && event.key === 'z'){
            //   this.points.pop();
            //   this.startPoint = this.points[this.points.length-1];
            //   this.g.select('polyline').remove();
            //   this.g.append('polyline').attr('points', this.points)
            //   .style('fill', 'none').attr('stroke', '#EF5350').attr('stroke-width','3');
            //   this.g.selectAll('circle:last-of-type').remove();
            // }
        });
    }

    showToast(heading, msg, buttonText, ref, type="warning") {
        let toastbox = d3.select('#appToast');
        toastbox.select('.modal-title').html(heading)
        .classed(`text-${type}`, true);
        toastbox.select('.modal-body').html(msg);
        let btn = toastbox.select('button.btn').html(buttonText);
        btn.on('click', () => {
            ref.resetStage();
            ref.hideToast();
        })

        $('#appToast').modal('show');
    }
  
    hideToast() {
        $('#appToast').modal('hide');
    }

    resetStage() {
        this.remove();
        this.dragging = false;
        this.drawing = false;
        this.disable = false;
        this.startPoint = [];
        this.points = [];
        this.g;
    }

    remove() {
        this.layer.select(`g.${this.className}`).remove();
    }
}