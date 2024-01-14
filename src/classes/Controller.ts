import Shape from "./Shape";
import _ from "lodash";

class Controller {
    private areaOccupied: number = 0;
    private listOfAllShapes: Shape[] = [];
    private listOfVisibleShapes: Shape[] = [];
    private score: number = 0;
    private gravityFactor: number = 1;
    private shapesPerSecond: number = 1;
    private isPaused = false;

    public increaseAreaOccupied(area: number): void {
        this.areaOccupied += area;
    }

    public decreaseAreaOccupied(area: number): void {
        this.areaOccupied -= area;
    }

    public addToAllList(shape: Shape): void {
        this.listOfAllShapes.push(shape);
    }

    public removeFromAllList(shape: Shape): void {
        _.remove(this.listOfAllShapes, {shapeId: shape.shapeId})
    }

    public addToListOfVisibleShapes(shape: Shape): void {
        this.increaseAreaOccupied(shape.areaInPixels);
        this.listOfVisibleShapes.push(shape);
        this.emitToDOM();
    }

    public removeFromListOfVisibleShapes(shape: Shape): void {
        this.decreaseAreaOccupied(shape.areaInPixels);
        _.remove(this.listOfVisibleShapes, {shapeId: shape.shapeId})
        this.emitToDOM();
    }

    public increaseScore(): void {
        this.score++;
    }

    public decreaseScore(): void {
        this.score--;
    }

    public increaseGravityFactor(): void {
        if (this.gravityFactor < 10) {
            this.gravityFactor++;
        }
    }

    public decreaseGravityFactor(): void {
        if (this.gravityFactor > 1) {
            this.gravityFactor--;
        }
    }

    public increaseShapesPerSecond(): void {
        if (this.shapesPerSecond < 20) {
            this.shapesPerSecond++;
        }
    }

    public decreaseShapesPerSecond(): void {
        if (this.shapesPerSecond > 1) {
            this.shapesPerSecond--;
        }
    }

    private emitToDOM(): void {
        const eventDetail = {
            numberOFVisibleShapes: this.listOfVisibleShapes.length,
            areaInPixelsOfVisibleShapes: this.areaOccupied,
            score: this.score,
        };

        const event = new CustomEvent('shapeListUpdated', {detail: eventDetail});
        document.dispatchEvent(event);
    }

    public getScore(): number {
        return this.score;
    }

    public getGravityFactor(): number {
        return this.gravityFactor;
    }

    public getVisibleShapesList(): Shape[] {
        return this.listOfVisibleShapes;
    }

    public getShapesPerSecond(): number {
        return this.shapesPerSecond;
    }

    public getListOfAllShapes(): Shape[] {
        return this.listOfAllShapes;
    }

    public getAreaOccupied(): number {
        return this.areaOccupied;
    }

    public setPause(newValue: boolean): void {
        this.isPaused = newValue;
    }

    public getIsPaused(): boolean {
        return this.isPaused;
    }
}

export default Controller;
