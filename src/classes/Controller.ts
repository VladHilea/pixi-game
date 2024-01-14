import Shape from "./Shape";
import * as _ from "lodash";

class Controller {
    public areaOccupied: number = 0;
    public listOfVisibleShapes:Shape[] = [];
    public listOfAllShapes:Shape[] = [];
    public gravityFactor = 1;
    public shapesPerSecond = 1;

    public increaseAreaOccupied(area: number): void {
        this.areaOccupied += area;
    }

    public decreaseAreaOccupied(area: number): void {
        this.areaOccupied -= area;
    }

    public addToAllList(shape:Shape){
        this.listOfAllShapes.push(shape);
    }

    public removeFromAllList(shape:Shape){
        _.remove(this.listOfAllShapes,{shapeId:shape.shapeId})
    }
    public addToListofVisibleShapes(shape:Shape) {
        this.increaseAreaOccupied(shape.areaInPixels);
        this.listOfVisibleShapes.push(shape);
    }

    public removeFromListOfVisibleShapes(shape:Shape) {
        this.decreaseAreaOccupied(shape.areaInPixels);
        _.remove(this.listOfVisibleShapes,{shapeId:shape.shapeId})
    }

    public increaseGravityFactor() {
        if (this.gravityFactor < 10) {
            this.gravityFactor ++;
        }
    }

    public decreaseGravityFactor() {
        if (this.gravityFactor > 1) {
            this.gravityFactor --;
        }
    }

    public increaseShapeserSecond() {
        if (this.shapesPerSecond < 10) {
            this.shapesPerSecond ++;
        }
    }

    public decreaseShapeserSecond() {
        if (this.shapesPerSecond > 1) {
            this.shapesPerSecond --;
        }
    }
}

export default Controller;
