import * as PIXI from 'pixi.js';
import Shape from '../Shape';
import Controller from "../Controller";
import {getAPP_CONSTANTS} from "../../constants/Constants";

class FiveSides extends Shape {
    private circleRadius =  getAPP_CONSTANTS().OUTER_CIRCLE_RADIUS_FOR_SHAPE_SIZE;
    private sideLength = 2 * this.circleRadius * Math.sin(Math.PI / 5);
    public height = this.sideLength * Math.sqrt(5+ (2*Math.sqrt(5))) /2;
    constructor(app: PIXI.Application,controller:Controller, shapeId: number, startX: number, startY: number) {
        super(app,controller, shapeId, startX, startY);
        this.graphics.beginFill(0xff00ff);
        this.graphics.moveTo(this.sideLength, 0);
        for (let i = 1; i <= 5; i++) {
            const angle = (i * Math.PI * 2) / 5;
            const x = this.sideLength * Math.cos(angle);
            const y = this.sideLength * Math.sin(angle);
            this.graphics.lineTo(x, y);
        }
        this.graphics.endFill();
        this.areaInPixels = this.calculateAreaInPx()
    }

    public calculateAreaInPx(): number {
        const angle = Math.PI / 5;
        return (5 / 4) * (this.sideLength ** 2) * (1 / Math.tan(angle));
    }
}

export default FiveSides;
