import * as PIXI from 'pixi.js';
import Shape from '../Shape';
import Controller from "../Controller";
import {getAPP_CONSTANTS} from "../../constants/Constants";

class RandomPolygon extends Shape {
    private circleRadius =  getAPP_CONSTANTS().OUTER_CIRCLE_RADIUS_FOR_SHAPE_SIZE;
    public areaInPixels = 0;

    constructor(app: PIXI.Application, controller: Controller, shapeId: number, startX: number, startY: number) {
        super(app, controller, shapeId, startX, startY);

        // Generate a random number of sides between 3 and 6
        const numSides = Math.floor(Math.random() * 6) + 4;

        const equalAngleRad = (360 / numSides) * (Math.PI / 180);
        const angles = [];
        let totalAngle = 0;

        //all angles but 2 are equal
        for (let i = 0; i < numSides - 2; i++) {
            const angle = equalAngleRad;
            angles.push(angle);
            totalAngle += angle;
        }

        //calculate random last 2 angles
        const remainingAngleRad1 = (2 * Math.PI - totalAngle) * Math.random();
        const remainingAngleRad2 = 2 * Math.PI - totalAngle - remainingAngleRad1;
        angles.push(remainingAngleRad1);
        angles.push(remainingAngleRad2);

        // Calculate the points of the polygon
        const polygonPoints = [];
        let currentAngle = 0;

        for (let i = 0; i < numSides; i++) {
            const x = Math.cos(currentAngle) * this.circleRadius;
            const y = Math.sin(currentAngle) * this.circleRadius;
            polygonPoints.push(x, y);
            currentAngle += angles[i];
        }

        const randomColorHexcode = "#" + (Math.random() * 0xFFFFFF | 0).toString(16).padStart(6, '0');
        this.graphics.beginFill(randomColorHexcode);
        this.graphics.drawPolygon(polygonPoints);
        this.graphics.endFill();
        this.areaInPixels = this.calculatePolygonArea(polygonPoints);
    }

    private calculatePolygonArea(points: number[]): number {
        // Shoelace formula to calculate the area of a polygon
        const numPoints = points.length / 2;
        let area = 0;

        for (let i = 0; i < numPoints - 1; i++) {
            const x1 = points[i * 2];
            const y1 = points[i * 2 + 1];
            const x2 = points[(i + 1) * 2];
            const y2 = points[(i + 1) * 2 + 1];
            area += x1 * y2 - x2 * y1;
        }

        return Math.abs(area / 2);
    }
}

export default RandomPolygon;
