import Shape from "./Shape";
import * as _ from "lodash";

class Controller {
    public visibleFields: number = 0;
    public areaOccupied: number = 0;
    public listOfViewableShapes:Shape[] = [];
    public listOfAllShapes:Shape[] = [];

    public gravityFactor = 1;
    public shapesPerSecond = 1;


    public increaseVisibleFields(): void {
        this.visibleFields++;
    }

    public decreaseVisibleFields(): void {
        this.visibleFields--;
    }

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
    public addToListShape(shape:Shape) {
        //console.log(shape, 'Added To Viewable List Controller ');
        this.increaseAreaOccupied(shape.areaInPixels);
        this.listOfViewableShapes.push(shape);
    }

    public removeFromList(shape:Shape) {
        //console.log(shape, 'Deleted To Viewable List Controller ');
        this.decreaseAreaOccupied(shape.areaInPixels);
        _.remove(this.listOfViewableShapes,{shapeId:shape.shapeId})
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
