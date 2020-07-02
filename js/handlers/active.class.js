import Attribute from "./attribute.class.js";

export default class Active {

    constructor(element, elementName) {
        this.element = element
        .attr('data-map-object',elementName)
        .classed('object', true);

        d3.selectAll('.object[data-map-object]').classed('active', false);
        this.element.classed('active', true);

        this._onClick();

    }

    _onClick() {
        this.element.on('click', function() {

            // Disabling all object
            d3.selectAll('.object[data-map-object]').classed('active', false);
            d3.selectAll('.object[data-map-object]').select('g.control-circles').classed('active', false);
            
            // Abling selected object
            this.element.classed('active', true);
            this.element.select('g.control-circles').classed('active', true);

        })
    }


}