import * as PIXI from 'pixi.js';
import Shape from '../Shape';
import Controller from "../Controller";
import {APP_CONSTANTS} from "../../constants/Constants";

class Ellipse extends Shape {
    private circleRadius =  APP_CONSTANTS.OUTER_CIRCLE_RADIUS_FOR_SHAPE_SIZE;
    private width = this.circleRadius;
    public height = this.circleRadius - this.circleRadius/4;
    public areaInPixels = 0;

    constructor(app: PIXI.Application,controller:Controller, shapeId: number, startX: number, startY: number) {
        super(app,controller, shapeId, startX, startY);


        // Create an ellipse shape
        this.graphics.beginFill(0x0000ff); // Fill color (blue in this example)
        this.graphics.drawEllipse(0, 0, this.width, this.height); // x, y, width, height
        this.graphics.endFill();
        this.areaInPixels = this.calculateAreaInPx();

    }

    public calculateAreaInPx(): number {
        // Calculate the area of the ellipse using the formula π * (width/2) * (height/2)
        return Math.PI * (this.width / 2) * (this.height / 2);
    }
}

export default Ellipse;