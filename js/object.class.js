import Utility from './helper/utility.class.js';

export default class Object {
  constructor({layer, data, canvasSize, objectName, attribute}) {

    this.attribute = attribute;

    this.position = Utility.centerOfCanvas(canvasSize, data.width, data.height);
    
    this.data = [{imgSrc: data.src, x: this.position.x, y: this.position.y, width: data.width, height: data.height, name: objectName, ref: this}];

    this.MAP_HEIGHT = canvasSize.height;
    this.MAP_WIDTH = canvasSize.width;
  
    this.MAX_TRANSLATE_X = this.MAP_WIDTH;
    this.MIN_TRANSLATE_X = 0;
  
    this.MAX_TRANSLATE_Y = this.MAP_HEIGHT;
    this.MIN_TRANSLATE_Y = 0;

    this.MIN_RECT_WIDTH = 20;
    this.MIN_RECT_HEIGHT = 20;

    this.HANDLE_R = 5;
    this.HANDLE_R_ACTIVE = 10;

    this.g = layer.append("g");

    this.update();
  }

  update() {
    
    let that = this;
    
    let images = this.g
    .selectAll("g.image")
    .data(this.data, function (d) {
      return d;
    });

    images.exit().remove();

    let newImage = images.enter()
      .append("g")
      .classed("image", true)
      .classed('object', true)
      .attr('data-map-object',function(d) { return d.name })
      .style('opacity',1)
      .call(
        d3.drag()
          .on("start end", that.rectMoveStartEnd)
          .on("drag", that.rectMoving)
      )
      .on('click', this._onClick);;

    newImage
      .append("image") 
      .classed("img", true)
      .attr("xlink:href", function(d) { return d.imgSrc })
      .attr("width", function(d) { return d.width })
      .attr("height", function(d) { return d.height })


    newImage
      .append("g")
      .classed("control-circles", true)
      .each(function (d) {
        let circleG = d3.select(this);

        circleG
         .append("rect")
         .classed("rect-border", true)
         .style("stroke","black")
         .style("stroke-width",1)
         .style("fill-opacity",0)
         .attr("width", function(d){ return d.width })
         .attr("height", function(d){ return d.height });

        circleG
          .append("circle")
          .classed("topleft", true)
          .attr("r", that.HANDLE_R)
          .style("stroke","black")
          .style("stroke-width",2)
          .style("fill","red")
          .on("mouseenter mouseleave", that.resizerHover)
          .call(
            d3
              .drag()
              .container(that.g.node())
              .subject(function () {
                return { x: d3.event.x, y: d3.event.y };
              })
              .on("start end", that.rectResizeStartEnd)
              .on("drag", that.rectResizing)
          );

        circleG
          .append("circle")
          .classed("bottomright", true)
          .attr("r", that.HANDLE_R)
          .style("stroke","black")
          .style("stroke-width",2)
          .style("fill","red")
          .on("mouseenter mouseleave", that.resizerHover)
          .call(
            d3
              .drag()
              .container(that.g.node())
              .subject(function () {
                return { x: d3.event.x, y: d3.event.y };
              })
              .on("start end", that.rectResizeStartEnd)
              .on("drag", that.rectResizing)
          );
      });

    let allImage = newImage.merge(images);

    allImage.attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

    allImage
      .select("image.img")
      .attr("height", function (d) {
        return d.height;
      })
      .attr("width", function (d) {
        return d.width;
      });

    allImage
      .select("rect.rect-border")
      .attr("height", function (d) {
        return d.height;
      })
      .attr("width", function (d) {
        return d.width;
      });

    allImage
      .select("circle.bottomright")
      .attr("cx", function (d) {
        return d.width;
      })
      .attr("cy", function (d) {
        return d.height;
      });
  }

  resizerHover(d) {
    var el = d3.select(this),
      isEntering = d3.event.type === "mouseenter";
    el.classed("hovering", isEntering).attr(
      "r",
      isEntering || el.classed("resizing") ? d.ref.HANDLE_R_ACTIVE : d.ref.HANDLE_R
    );
  }

  rectResizeStartEnd(d) {
    var el = d3.select(this),
      isStarting = d3.event.type === "start";
    d3.select(this)
      .classed("resizing", isStarting)
      .attr(
        "r",
        isStarting || el.classed("hovering") ? d.ref.HANDLE_R_ACTIVE : d.ref.HANDLE_R
      );
  }

  rectResizing(d) {
    // var dragX = Math.max(
    //   Math.min(d3.event.x, d.ref.MAX_TRANSLATE_X),
    //   d.ref.MIN_TRANSLATE_X
    // );

    // var dragY = Math.max(
    //   Math.min(d3.event.y, d.ref.MAX_TRANSLATE_Y),
    //   d.ref.MIN_TRANSLATE_Y
    // );
    var dragX = d3.event.x;
    var dragY = d3.event.y;

    if (d3.select(this).classed("topleft")) {
      var newWidth = Math.max(d.width + d.x - dragX, d.ref.MIN_RECT_WIDTH);

      d.x += d.width - newWidth;
      d.width = newWidth;

      var newHeight = Math.max(d.height + d.y - dragY, d.ref.MIN_RECT_HEIGHT);

      d.y += d.height - newHeight;
      d.height = newHeight;
    } else {
      d.width = Math.max(dragX - d.x, d.ref.MIN_RECT_WIDTH);
      d.height = Math.max(dragY - d.y, d.ref.MIN_RECT_HEIGHT);
    }

    d.ref.attribute.setWidth(d.width).setHeight(d.height);
    d.ref.update();
  }

  rectMoveStartEnd(d) {
    d3.select(this).classed("moving", d3.event.type === "start");
  }

  rectMoving(d) {
    // var dragX = Math.max(
    //   Math.min(d3.event.x, d.ref.MAX_TRANSLATE_X - d.width),
    //   d.ref.MIN_TRANSLATE_X
    // );

    // var dragY = Math.max(
    //   Math.min(d3.event.y, d.ref.MAX_TRANSLATE_Y - d.height),
    //   d.ref.MIN_TRANSLATE_Y
    // );

    d.x = d3.event.x;
    d.y = d3.event.y;

    d.ref.attribute.setX(d3.event.x).setY(d3.event.y)
    d.ref.update();
  }

  _onClick(d) {

      // Disabling all object
      d3.selectAll('.object[data-map-object]').classed('active', false);
      d3.selectAll('.object[data-map-object]').select('g.control-circles').classed('active', false);
      
      // Abling selected object
      d3.select(this).classed('active', true);
      d3.select(this).select('g.control-circles').classed('active', true);

      let opacity = parseFloat(d3.select('.active[data-map-object]').style('opacity'));

      //Set name of active object
      d.ref.attribute.setName(d.name);
      d.ref.attribute.setOpacity(opacity.toFixed(1))

  }

  getObject() {
    return this.g;
  }

}
