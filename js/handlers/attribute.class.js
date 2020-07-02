export default class Attribute {

    constructor() {
        this.NAME = d3.select('.properties-title.object');
        this.X = d3.select("[data-object-attribute = 'x']");
        this.Y = d3.select("[data-object-attribute = 'y']");
        this.WIDTH = d3.select("[data-object-attribute = 'width']");
        this.HEIGHT = d3.select("[data-object-attribute = 'height']");
        this.ANGLE = d3.select("[data-object-attribute = 'angle']");
        this.OPACITY = d3.select("#myRange");
    }

    // ? G E T T E R S

    getName() {
        return this.NAME.text()
    }

    getX() {
        return this.X.property('value')
    }

    getY() {
        return this.Y.property('value')
    }

    getWidth() {
        return this.WIDTH.property('value')
    }

    getHeight() {
        return this.HEIGHT.property('value')
    }

    getAngle() {
        return this.ANGLE.property('value')
    }

    getOpacity() {
        return this.OPACITY.property('value')
    }
    // ? S E T T E R S

    setName(name) {
        this.NAME.text(name)
    }

    setX(x) {
        this.X.attr('value', Math.round(x))
        return this
    }

    setY(y) {
        this.Y.attr('value', Math.round(y))
        return this
    }

    setWidth(width) {
        this.WIDTH.attr('value', Math.round(width))
        return this
    }

    setHeight(height) {
        this.HEIGHT.attr('value', Math.round(height))
        return this
    }

    setAngle(angle) {
        this.ANGLE.attr('value', Math.round(angle))
        return this
    }

    setOpacity(opacity) {
        this.OPACITY.attr('value', opacity)
        d3.select('.range-value').text(opacity);
        return this
    } 

    getXAttribute() {
        return this.X;
    }

    getYAttribute() {
        return this.Y;
    }

    getWidthAttribute() {
        return this.WIDTH;
    }

    getHeightAttribute() {
        return this.HEIGHT;
    }

    getAngleAttribute() {
        return this.ANGLE;
    }

    getOpacityAttribute() {
        return this.OPACITY;
    }
}