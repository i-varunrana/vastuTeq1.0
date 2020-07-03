export default class Models {
    
    constructor() {
      // The state of the model, an array of House Map objects, prepopulated with some data
      this.users = JSON.parse(localStorage.getItem("vastuteqUsers")) || [];
      //this.houseMaps = JSON.parse(localStorage.getItem("houseMaps")) || [];
    }

    _commit(users) {
        localStorage.setItem("vastuteqUsers", JSON.stringify(users));
    }

    addMap(propertyId,clientId,userId,data) {
        const map = {
            id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
            uniqueId: Math.floor(1000000000 + Math.random() * 9000000000),
            stage: 1,
            imageData: data.src,
            type: "custom",
            vedicBoundariesCoords: [],
            customBoundariesCoords: [],
            centroid: [],
            FaceCoords: [],
            dimension: {
                unit:unit,
                distance:distance,
                scale:scale
            },
            complete: false,
        };

        let userIndex = this.getIndex(this.users,userId);
        let clientIndex = this.getIndex(this.users[userIndex].client,clientId);
        let propertyIndex = this.getIndex(this.users[userIndex].client[clientIndex].property,propertyId)
        this.users[index].client[clientIndex].property[propertyIndex].map.push(map);
        this._commit(this.users);
    }

    addProperty(clientId,userId,data) {
        const property = {
            id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
            uniqueId: Math.floor(1000000000 + Math.random() * 9000000000),
            name: data.name,
            category: data.category,
            type: data.type,
            owner: data.owner,
            address: data.address,
            map: []
        };
        let userIndex = this.getIndex(this.users,userId);
        let clientIndex = this.getIndex(this.users[userIndex].client,clientId);
        this.users[index].client[clientIndex].property.push(property);
        this._commit(this.users);
    }

    addClient(userId,data) {
        const client = {
            id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
            uniqueId: Math.floor(1000000000 + Math.random() * 9000000000),
            name: data.name,
            email: data.email,
            address: data.address,
            property: []
        };

        let userIndex = this.getIndex(this.users,userId);
        this.users[userIndex].client.push(client);
        this._commit(this.users);
    }

    addUser(data) {

        const user = {
            id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
            uniqueId: Math.floor(1000000000 + Math.random() * 9000000000),
            name: data.name,
            email: data.email,
            password: data.password,
            client: []
            };

        this.users.push(user);
        this._commit(this.users);

    }

    deleteLocalStroage() {
        localStorage.removeItem("vastuteqUsers");
    }

    editType(propertyIndex,clientIndex,userIndex, type) {
        this.users[userIndex].client[clientIndex].property[propertyIndex].map[0].type = type;
        this._commit(this.houseMaps); 
    }

    editVedicBoundariesCoords(pts) {
        this.houseMaps[0].BoundariesCoords = pts;
        this._commit(this.houseMaps); 
    }

    editCustomBoundariesCoords(propertyIndex,clientIndex,userIndex, coords) {
        this.users[userIndex].client[clientIndex].property[propertyIndex].map[0].boundariesCoords = coords;
        this._commit(this.users);
    }

    editCentroid(centroid) {
        this.users[userIndex].client[clientIndex].property[propertyIndex].map[0].centroid = centroid;
        this._commit(this.users);
    }

    editFacingWallPoints(pts) {
        this.houseMaps[0].facingWallPoints = pts;
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
                centeroid: houseMap.centeroid,
                facingWallPoints: houseMap.facingWallPoints,
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

    getCenteroid() {
        return this.houseMaps[0].centeroid;
    }

    getFacingWallPoints() {
        return this.houseMaps[0].facingWallPoints;
    }

    getFacingDegree() {
        return this.houseMaps[0].facingDegree;
    }

    getUsers() {
        return this.users;
    }
    
    hasHouseMap() {
        return this.houseMaps.length > 0 ? true : false
    }

    getIndex(arr, value) { 
        console.log(arr,value);
        return arr.findIndex(function(ele){ return (ele.uniqueId == value); });
    }
}