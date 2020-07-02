export default class ActionBox {

    constructor() {
        this.box = d3.select('.actionbox');
    }

    get(data) {
        return this.box;
    }

    show() {
        this.box.classed('active', true);
        return this;
    }

    hide() {
        this.box.classed('active', false);
        return this;
    }

    clear() {
        this.box.selectAll('*').remove();
        return this;
    }


}