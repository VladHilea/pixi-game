import * as PIXI from 'pixi.js';
import Shape from '../Shape';
import {DivMaskDimensions} from '../../types';
import Controller from "../Controller";

class Circle extends Shape {
    private radius = 40;
    public areaInPixels = 0;
    public height = this.radius * 2;

    constructor(app: PIXI.Application, controller: Controller, shapeId: number, startX: number, startY: number, velocityY: number, gravity: number) {
        super(app, controller, shapeId, startX, startY, velocityY, gravity);

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