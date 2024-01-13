import * as PIXI from 'pixi.js';
import Shape from '../Shape';
import {DivMaskDimensions} from '../../types';
import Controller from "../Controller";

class Triangle extends Shape {
    private circleRadius = 40;
    private base = 3 * this.circleRadius / Math.sqrt(3);
    public height = this.base * Math.sqrt(3) /2;
    public areaInPixels = 0;

    constructor(app: PIXI.Application,controller:Controller, shapeId: number, startX: number, startY: number, velocityY: number, gravity: number) {
        super(app, controller, shapeId, startX, startY, velocityY, gravity);


        this.graphics.beginFill(0xff0000); // Fill color (red in this example)
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(this.base / 2, this.height);
        this.graphics.lineTo(-this.base / 2, this.height);
        this.graphics.endFill();

        this.areaInPixels = this.calculateAreaInPx();
    }

    public calculateAreaInPx(): number {
        return (this.base * this.height) / 2;
    }
}

export default Triangle;
