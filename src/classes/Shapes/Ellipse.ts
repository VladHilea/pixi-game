import * as PIXI from 'pixi.js';
import Shape from '../Shape';
import Controller from "../Controller";
import {getAPP_CONSTANTS} from "../../constants/Constants";

class Ellipse extends Shape {
    private circleRadius = getAPP_CONSTANTS().OUTER_CIRCLE_RADIUS_FOR_SHAPE_SIZE;
    private width: number = this.circleRadius;
    public height: number = this.circleRadius - this.circleRadius / 4;
    public areaInPixels: number = 0;

    constructor(app: PIXI.Application, controller: Controller, shapeId: number, startX: number, startY: number) {
        super(app, controller, shapeId, startX, startY);
        this.graphics.beginFill(0x0000ff);
        this.graphics.drawEllipse(0, 0, this.width, this.height);
        this.graphics.endFill();
        this.areaInPixels = this.calculateAreaInPx();
    }

    public calculateAreaInPx(): number {
        // Calculate the area of the ellipse using the formula π * (width/2) * (height/2)
        return Math.PI * (this.width / 2) * (this.height / 2);
    }
}

export default Ellipse;