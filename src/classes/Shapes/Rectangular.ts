import * as PIXI from 'pixi.js';
import Shape from '../Shape';
import Controller from "../Controller";

class Rectangular extends Shape {
    private circleRadius = 40;
    private width =this.circleRadius;
    public height = 2* this.circleRadius;
    public areaInPixels = 0;

    constructor(app: PIXI.Application,controller:Controller, shapeId: number, startX: number, startY: number, velocityY: number, gravity: number) {
        super(app,controller, shapeId, startX, startY, velocityY, gravity);

        this.graphics.beginFill(0xff00ff); // Fill color (pink in this example)
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();
        this.areaInPixels = this.calculateAreaInPx();
    }

    public calculateAreaInPx(): number {
        return this.width * this.height;
    }
}

export default Rectangular;
