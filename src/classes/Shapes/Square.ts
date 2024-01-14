import * as PIXI from 'pixi.js';
import Shape from '../Shape';
import Controller from "../Controller";
import {APP_CONSTANTS} from "../../constants/Constants";

class Square extends Shape {
    public areaInPixels = 0;
    public circleRadius =  APP_CONSTANTS.OUTER_CIRCLE_RADIUS_FOR_SHAPE_SIZE;
    private sideLength = 2 * this.circleRadius / Math.sqrt(2);
    public height = 2 * this.sideLength;


    constructor(app: PIXI.Application, controller: Controller, shapeId: number, startX: number, startY: number) {
        super(app, controller, shapeId, startX, startY);

        // Create a rectangular shape
        this.graphics.beginFill(0x00ff00);
        this.graphics.drawRect(0, 0, this.sideLength, this.sideLength);
        this.graphics.endFill();

        this.areaInPixels = this.calculateAreaInPx();
    }

    public calculateAreaInPx(): number {
        return this.sideLength * this.sideLength;
    }
}

export default Square;
