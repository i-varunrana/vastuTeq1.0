import ActionBox from "../helper/actionbox.class.js";
import Utility from "../helper/utility.class.js";

export default class StageSecond {
  constructor() {
      this.actionbox = new ActionBox();
  }

  startDrawing(REF) {
    let that = REF;
    let str, pointA, pointB;

    let actionBox = this.actionbox.clear().get();

    let actionText = actionBox
      .append("p")
      .attr("class", "text-uppercase text-sm actionbox-text")
      .text("Select face");

    let actionBody = actionBox
      .append("div")
      .attr("class", "actionbox-body input-group input-group-sm mb-1");

    let selectbox = actionBody.append("select").attr("class", "custom-select");

    let faceSelectData = [];
    for (let i = 0; i < that.mapBoundariesCoords.length; i++) {
      let j = i < that.mapBoundariesCoords.length - 1 ? i + 1 : 0;
      faceSelectData.push({
        text: `wall ${(i + 10).toString(36).toUpperCase()} - ${(j + 10).toString(36).toUpperCase()}`,
        value: [that.mapBoundariesCoords[i], that.mapBoundariesCoords[j]]
      });
    }

    let options = selectbox.selectAll("option")
    .data(faceSelectData)
    .enter()
    .append("option")
    .attr("class","text-uppercase text-sm");

    options.text(function(d) {
      return d.text;
    })
    .attr("value", function(d) {
      return d.value;
    });

    selectbox.attr('value',faceSelectData[0].value);

    str = selectbox.node().value.split(',');
    pointA = [parseInt(str[0]),parseInt(str[1])];
    pointB = [parseInt(str[2]),parseInt(str[3])];

    let selectBtn = actionBody
      .append("div")
      .attr("class", "input-group-append")
      .append("button")
      .attr("class", "btn btn-outline-primary btn-sm text-sm")
      .attr("type", "button")
      .text("Select");

    this.actionbox.show();

    selectbox.on("change", function() {
      str = d3.select(this).node().value.split(',');
      pointA = [parseInt(str[0]),parseInt(str[1])];
      pointB = [parseInt(str[2]),parseInt(str[3])];
    })

    selectBtn.on("click", () => {

      if((pointA == undefined && pointB == undefined) || (pointA == "" && pointB == "")) {

        this.showToast("Warning!","Please select desired wall.");

      } else {

        this.actionbox.clear().hide();
        that.faceCoords = [pointA, pointB];
        that.model.editFaceCoords(that.mapId, [pointA, pointB]);

        that._stage = 3;
        that.model.editStage(that.mapId, 3);
        that.start();

      }
    });
  }

  showToast(heading, msg, type="warning") {
    let toastbox = d3.select('#appToast');
    toastbox.select('.modal-title').html(heading)
    .classed(`text-${type}`, true);
    toastbox.select('.modal-body').html(msg);
    toastbox.select('.modal-footer').style('display', 'none');
    $('#appToast').modal('show');
  }

  hideToast() {
      $('#appToast').modal('hide');
  }

}
