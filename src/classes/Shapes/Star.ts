import * as PIXI from 'pixi.js';
import Shape from '../Shape';
import Controller from "../Controller";

// Custom function to draw a star shape
function drawStar(target: PIXI.Graphics, x: number, y: number, points: number, innerRadius: number, outerRadius: number, angle = 0) {
    const step = (Math.PI * 2) / points;
    const halfStep = step / 2;
    const start = (angle / 180) * Math.PI;
    let n, dx, dy;

    target.moveTo(
        x + Math.cos(start) * outerRadius,
        y - Math.sin(start) * outerRadius
    );

    for (n = 1; n <= points; ++n) {
        dx = x + Math.cos(start + (step * n) - halfStep) * innerRadius;
        dy = y - Math.sin(start + (step * n) - halfStep) * innerRadius;
        target.lineTo(dx, dy);
        dx = x + Math.cos(start + (step * n)) * outerRadius;
        dy = y - Math.sin(start + (step * n)) * outerRadius;
        target.lineTo(dx, dy);
    }
}

class Star extends Shape {
    private circleRadius = 40;
    private size = this.circleRadius;
    private innerRadius = this.circleRadius/2;
    public areaInPixels = 0;
    public height = 2 * this.circleRadius;

    constructor(app: PIXI.Application,controller:Controller, shapeId: number, startX: number, startY: number, velocityY: number, gravity: number) {
        super(app,controller, shapeId, startX, startY, velocityY, gravity);

        // Create a star shape using the custom function

        this.graphics.beginFill(0xff9900); // Fill color (orange in this example)
        drawStar(this.graphics, 100, 100, 5, this.innerRadius, this.size, 0);
        this.graphics.endFill();

        this.areaInPixels = this.calculateAreaInPx();
    }

    public calculateAreaInPx(): number {
        // Calculate the area of the inner pentagon and five triangles
        const areaInnerPentagon = (5 / 4) * (this.innerRadius ** 2) * (1 / Math.tan(Math.PI / 5));
        const areaTriangle = (1 / 2) * (this.innerRadius ** 2) * Math.sin((2 * Math.PI) / 5);

        // Total area of the star is the sum of inner pentagon and five triangles
        return areaInnerPentagon + 5 * areaTriangle;
    }
}

export default Star;