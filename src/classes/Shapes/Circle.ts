import * as PIXI from 'pixi.js';
import Shape from '../Shape';
import Controller from "../Controller";
import {APP_CONSTANTS} from "../../constants/Constants";

class Circle extends Shape {
    private radius =  APP_CONSTANTS.OUTER_CIRCLE_RADIUS_FOR_SHAPE_SIZE;
    public areaInPixels = 0;
    public height = this.radius * 2;

    constructor(app: PIXI.Application, controller: Controller, shapeId: number, startX: number, startY: number) {
        super(app, controller, shapeId, startX, startY);

        // Create a circular shape (circle)
        this.graphics.beginFill(0xff0000); // Fill color (red in this example)
        this.graphics.drawCircle(0, 0, this.radius); // x, y, radius
        this.graphics.endFill();

        this.areaInPixels = this.calculateAreaInPx();
    }

    public calculateAreaInPx(): number {
        return Math.PI * (this.radius * this.radius);
    }
}

export default Circle;