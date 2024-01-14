import * as PIXI from 'pixi.js';
import Shape from '../Shape';
import Controller from "../Controller";
import {getAPP_CONSTANTS} from "../../constants/Constants";

class Rectangular extends Shape {
    private circleRadius =  getAPP_CONSTANTS().OUTER_CIRCLE_RADIUS_FOR_SHAPE_SIZE;
    private width =this.circleRadius;
    public height = 2* this.circleRadius;
    public areaInPixels = 0;

    constructor(app: PIXI.Application,controller:Controller, shapeId: number, startX: number, startY: number) {
        super(app,controller, shapeId, startX, startY);
        this.graphics.beginFill(0xff00ff);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();
        this.areaInPixels = this.calculateAreaInPx();
    }

    public calculateAreaInPx(): number {
        return this.width * this.height;
    }
}

export default Rectangular;
