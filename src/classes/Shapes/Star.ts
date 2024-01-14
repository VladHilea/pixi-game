import * as PIXI from 'pixi.js';
import Shape from '../Shape';
import Controller from "../Controller";
import {getAPP_CONSTANTS} from "../../constants/Constants";

// function to draw a star shape
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
    private circleRadius = getAPP_CONSTANTS().OUTER_CIRCLE_RADIUS_FOR_SHAPE_SIZE;
    private innerRadius = this.circleRadius/2;
    public areaInPixels = 0;

    constructor(app: PIXI.Application,controller:Controller, shapeId: number, startX: number, startY: number) {
        super(app,controller, shapeId, startX, startY);
        this.graphics.beginFill(0xff9900); // Fill color (orange in this example)
        drawStar(this.graphics, 0, 0, 5, this.innerRadius, this.circleRadius, 0);
        this.graphics.endFill();
        this.areaInPixels = this.calculateAreaInPx();
    }

    public calculateAreaInPx(): number {
        // area of the inner pentagon and five triangles
        const areaInnerPentagon = (5 / 4) * (this.innerRadius ** 2) * (1 / Math.tan(Math.PI / 5));
        const areaTriangle = (1 / 2) * (this.innerRadius ** 2) * Math.sin((2 * Math.PI) / 5);
        return areaInnerPentagon + 5 * areaTriangle;
    }
}

export default Star;