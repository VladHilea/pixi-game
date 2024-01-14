import * as PIXI from 'pixi.js';
import Shape from '../Shape';
import Controller from "../Controller";
import {APP_CONSTANTS} from "../../constants/Constants";

class RandomPolygon extends Shape {
    private circleRadius =  APP_CONSTANTS.OUTER_CIRCLE_RADIUS_FOR_SHAPE_SIZE;
    public areaInPixels = 0;
    public height = 2 * this.circleRadius;

    constructor(app: PIXI.Application, controller: Controller, shapeId: number, startX: number, startY: number) {
        super(app, controller, shapeId, startX, startY);

        // Generate a random number of sides between 3 and 6
        const numSides = Math.floor(Math.random() * 6) + 4;

        // Calculate the angle for two sides (except two) in radians
        const equalAngleRad = (360 / numSides) * (Math.PI / 180);

        // Generate random angles for each vertex (except two)
        const angles = [];
        let totalAngle = 0;

        for (let i = 0; i < numSides - 2; i++) {
            const angle = equalAngleRad;
            angles.push(angle);
            totalAngle += angle;
        }

        // Calculate the angle for the first remaining side
        const remainingAngleRad1 = (2 * Math.PI - totalAngle) * Math.random();

        // Calculate the angle for the second remaining side
        const remainingAngleRad2 = 2 * Math.PI - totalAngle - remainingAngleRad1;

        // Push the angles for the remaining sides
        angles.push(remainingAngleRad1);
        angles.push(remainingAngleRad2);

        // Calculate the points of the polygon
        const polygonPoints = [];
        let currentAngle = 0;

        for (let i = 0; i < numSides; i++) {
            const x = Math.cos(currentAngle) * this.circleRadius; // Radius of 60 (adjust as needed)
            const y = Math.sin(currentAngle) * this.circleRadius; // Radius of 60 (adjust as needed)
            polygonPoints.push(x, y);
            currentAngle += angles[i];
        }

        const randomColorHexcode = "#" + (Math.random() * 0xFFFFFF | 0).toString(16).padStart(6, '0');
        // Create the polygon shape
        this.graphics.beginFill(randomColorHexcode);
        this.graphics.drawPolygon(polygonPoints);
        this.graphics.endFill();

        // Calculate the area of the polygon using the Shoelace formula
        this.areaInPixels = this.calculatePolygonArea(polygonPoints);
    }

    private calculatePolygonArea(points: number[]): number {
        // Implementation of the Shoelace formula to calculate the area of a polygon
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
