import * as PIXI from 'pixi.js';
import Shape from '../Shape';
import Controller from "../Controller";
import {getAPP_CONSTANTS} from "../../constants/Constants";

class Circle extends Shape {
    private radius: number = getAPP_CONSTANTS().OUTER_CIRCLE_RADIUS_FOR_SHAPE_SIZE;
    public areaInPixels: number = 0;

    constructor(app: PIXI.Application, controller: Controller, shapeId: number, startX: number, startY: number) {
        super(app, controller, shapeId, startX, startY);
        this.graphics.beginFill(0xff0000);
        this.graphics.drawCircle(0, 0, this.radius);
        this.graphics.endFill();
        this.areaInPixels = this.calculateAreaInPx();
    }

    public calculateAreaInPx(): number {
        return Math.PI * (this.radius * this.radius);
    }
}

export default Circle;