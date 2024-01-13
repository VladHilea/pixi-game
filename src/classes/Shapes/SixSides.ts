import * as PIXI from 'pixi.js';
import Shape from '../Shape';
import {DivMaskDimensions} from '../../types';
import Controller from "../Controller";

class SixSides extends Shape {

    private circleRadius = 40;
    private sideLength = 2 * this.circleRadius / Math.sqrt(3);
    public areaInPixels = 0;
    public height = Math.sqrt(3) * this.sideLength;

    constructor(app: PIXI.Application, controller: Controller, shapeId: number, startX: number, startY: number, velocityY: number, gravity: number) {
        super(app, controller, shapeId, startX, startY, velocityY, gravity);

        this.graphics.beginFill(0xffff00); // Fill color (yellow in this example)
        this.graphics.moveTo(this.sideLength, 0);
        for (let i = 1; i <= 6; i++) {
            const angle = (i * Math.PI * 2) / 6;
            const x = this.sideLength * Math.cos(angle);
            const y = this.sideLength * Math.sin(angle);
            this.graphics.lineTo(x, y);
        }
        this.graphics.endFill();

        this.areaInPixels = this.calculateAreaInPx();
    }

    public calculateAreaInPx(): number {
        return (3 * Math.sqrt(3) * (this.sideLength ** 2)) / 2;
    }
}

export default SixSides;
