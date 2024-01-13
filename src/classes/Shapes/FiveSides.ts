import * as PIXI from 'pixi.js';
import Shape from '../Shape';
import Controller from "../Controller";

class FiveSides extends Shape {
    private circleRadius = 40;
    private sideLength = 2 * this.circleRadius * Math.sin(Math.PI / 5);
    public height = this.sideLength * Math.sqrt(5+ (2*Math.sqrt(5))) /2;
    constructor(app: PIXI.Application,controller:Controller, shapeId: number, startX: number, startY: number, velocityY: number, gravity: number) {
        super(app,controller, shapeId, startX, startY, velocityY, gravity);

        // Create a five-sided shape (pentagon)
        this.graphics.beginFill(0xff00ff); // Fill color (purple in this example)
        this.graphics.moveTo(this.sideLength, 0);
        for (let i = 1; i <= 5; i++) {
            const angle = (i * Math.PI * 2) / 5;
            const x = this.sideLength * Math.cos(angle);
            const y = this.sideLength * Math.sin(angle);
            this.graphics.lineTo(x, y);
        }
        this.graphics.endFill();

        this.areaInPixels = this.calculateAreaInPx()

        // Set the sideLength as a property
    }

    public calculateAreaInPx(): number {
        const angle = Math.PI / 5;
        return (5 / 4) * (this.sideLength ** 2) * (1 / Math.tan(angle));
    }
}

export default FiveSides;
