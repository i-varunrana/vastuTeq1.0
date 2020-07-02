export default class Model {
    
    constructor() {
      // The state of the model, an array of House Map objects, prepopulated with some data
      this.houseMaps = JSON.parse(localStorage.getItem("houseMaps")) || [];
    }

    _commit(houseMaps) {
        localStorage.setItem("houseMaps", JSON.stringify(houseMaps));
    }

    add(data) {

        const uId = Math.floor(1000000000 + Math.random() * 9000000000);

        const houseMap = {
            uniqueId: uId,
            id: this.houseMaps.length > 0 ? this.houseMaps[this.houseMaps.length - 1].id + 1 : 1,
            stage: 1,
            imageData: data,
            type: "custom",
            vedicBoundariesCoords: [],
            boundariesCoords: [],
            centroid: [],
            FaceCoords: [],
            facingDegree: 0,
            complete: false,
        }

        this.houseMaps.push(houseMap);
        this._commit(this.houseMaps);
    }

    delete() {
        localStorage.removeItem("houseMaps");
    }

    editType(type) {
        this.houseMaps[0].type = type;
        this._commit(this.houseMaps); 
    }

    editVedicBoundariesCoords(pts) {
        this.houseMaps[0].BoundariesCoords = pts;
        this._commit(this.houseMaps); 
    }

    editBoundariesCoords(pts) {
        this.houseMaps[0].boundariesCoords = pts;
        this._commit(this.houseMaps);
    }

    editCentroid(center) {
        this.houseMaps[0].centroid = center;
        this._commit(this.houseMaps);
    }

    editFaceCoords(pts) {
        this.houseMaps[0].FaceCoords = pts;
        this._commit(this.houseMaps);
    }

    editFacingDegree(degree) {
        this.houseMaps[0].facingDegree = degree;
        this._commit(this.houseMaps);
    }

    // Alter stage according to completion
    staging(stage) {
        this.houseMaps = this.houseMaps.map(houseMap =>
          houseMap.id === 1
            ? {
                id: houseMap.id,
                stage: stage,
                imageData: houseMap.imageData,
                boundariesCoords: houseMap.boundariesCoords,
                centroid: houseMap.centroid,
                FaceCoords: houseMap.FaceCoords,
                facingDegree: houseMap.facingDegree,
                complete: houseMap.complete
              }
            : houseMap
        );
    
        this._commit(this.houseMaps);
    }

    // Processing is complete
    complete(id) {
        this.houseMaps = this.houseMaps.map(houseMap =>
          houseMap.id === id
            ? {
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                markedEdgePoints: houseMap.markedEdgePoints,
                complete: true
              }
            : houseMap
        );
    
        this._commit(this.houseMaps);
    }

    getBoundariesCoords() {
        return this.houseMaps[0].boundariesCoords;
    }

    getCentroid() {
        return this.houseMaps[0].centroid;
    }

    getFaceCoords() {
        return this.houseMaps[0].FaceCoords;
    }

    getFacingDegree() {
        return this.houseMaps[0].facingDegree;
    }

    getHouseMap() {
        return this.houseMaps;
    }
    
    hasHouseMap() {
        return this.houseMaps.length > 0 ? true : false
    }
}