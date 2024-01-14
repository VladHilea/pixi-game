import * as PIXI from 'pixi.js';
import Triangle from './Shapes/Triangle';
import Rectangular from './Shapes/Rectangular';
import {DivMaskDimensions} from "../types";
import Square from "./Shapes/Square";
import Circle from "./Shapes/Circle";
import Ellipse from "./Shapes/Ellipse";
import FiveSides from "./Shapes/FiveSides";
import SixSides from "./Shapes/SixSides";
import Star from "./Shapes/Star";
import RandomShape from "./Shapes/RandomShape";
import Controller from "./Controller";
import {APP_CONSTANTS} from "../constants/Constants";

class PixiApp {
    public app: PIXI.Application;
    private divMaskDimensions!: DivMaskDimensions;
    private readonly numberOfShapesText!: PIXI.Text; // Text field for "Number of Shapes"
    private readonly areaOfShapesText!: PIXI.Text; // Text field for "Number of Shapes"
    private readonly scoreText!: PIXI.Text; // Text field for "Number of Shapes"
    private shapeId: number = 1;
    public generateInterval?: NodeJS.Timeout;
    public controller: Controller = new Controller();


    constructor() {
        const canvasElement = document.getElementById('gameCanvas') as HTMLElement

        //build the pixi app
        this.app = new PIXI.Application({
            width: canvasElement.getBoundingClientRect().width,
            height: canvasElement.getBoundingClientRect().height,
            backgroundColor: 0xd3d3d3,
            resizeTo: canvasElement,
        });


        //initialize pixi text and add to stage
        this.numberOfShapesText = new PIXI.Text('Number of Shapes: 0', {
            fill: 0x000000, // Text color
            fontSize: 18,  // Font size
        });
        this.areaOfShapesText = new PIXI.Text('Area of Shapes: 0px^2', {
            fill: 0x000000, // Text color
            fontSize: 18,  // Font size
        });
        this.scoreText = new PIXI.Text('Score: 0', {
            fill: 0x000000, // Text color
            fontSize: 18,  // Font size
        });
        this.numberOfShapesText.x = 10; // Adjust the x-coordinate as needed
        this.numberOfShapesText.y = 10; // Adjust the y-coordinate as needed
        this.scoreText.x = 10; // Adjust the y-coordinate as needed
        this.areaOfShapesText.x = 10; // Adjust the x-coordinate as needed
        this.areaOfShapesText.y = 30; // Adjust the y-coordinate as needed
        this.scoreText.y = 50; // Adjust the y-coordinate as needed
        this.app.stage.addChild(this.numberOfShapesText);
        this.app.stage.addChild(this.areaOfShapesText);
        this.app.stage.addChild(this.scoreText);


        //append the pixi app to the div
        canvasElement.appendChild(this.app.view as any);


        // div position to use with on click mouse events
        this.divMaskDimensions = {
            divTop: canvasElement.getBoundingClientRect().top,
            divBottom: canvasElement.getBoundingClientRect().bottom,
            divLeft: canvasElement.getBoundingClientRect().left,
            divRight: canvasElement.getBoundingClientRect().right,
            width: canvasElement.getBoundingClientRect().width,
            height: canvasElement.getBoundingClientRect().height,
        }


        // @ts-ignore
        this.app.view.addEventListener('mousedown', (event) => {
            this.handleCickCreateShapeOrRemoveShape(event);
        });
    }

    public start(): void {
        // Start the app
        this.generateInterval = setInterval(() => {
            for (let i = 0; i < this.controller.getShapesPerSecond(); i++)
                this.generateShape();
        }, 1000);

        // Animation loop
        this.app.ticker.add(() => {
            for (const shape of this.controller.getListOfAllShapes()) {
                shape.update();
                this.updateNumberOfShapesText();
                this.updateAreaOfShapesText();
                this.updateScore();
            }
        });
    }

    //pause app
    public pause(): void {
        this.app.ticker.stop();
        clearInterval(this.generateInterval)
    }

    //resume app
    public resume(): void {
        this.app.ticker.start();
        this.generateInterval = setInterval(() => {
            for (let i = 0; i < this.controller.getShapesPerSecond(); i++)
                this.generateShape();
        }, 1000);
    }

    private generateShape(): void {

        //I give an offset(left and right) so that the shapes will always be fully in the app view
        const startX = this.getRandomNumber(APP_CONSTANTS.OUTER_CIRCLE_RADIUS_FOR_SHAPE_SIZE, this.app.renderer.width - APP_CONSTANTS.OUTER_CIRCLE_RADIUS_FOR_SHAPE_SIZE) // Random X position within the rectangle
        const startY = APP_CONSTANTS.SHAPES_CREATE_POINT; //start above the rectangle canvas

        const availableShapes = [Triangle, Square, Rectangular, Circle, Ellipse, FiveSides, SixSides, Star];

        // Randomly choose a shape type from the array
        const randomShapeType = availableShapes[Math.floor(Math.random() * availableShapes.length)];
        new randomShapeType(this.app, this.controller, this.shapeId++, startX, startY);
    }

    private handleCickCreateShapeOrRemoveShape(event: any): void {

        // x and y are the point of the event - the positions of the div rectangle
        // x=0 is actually event.x - this.divMaskDimensions.divLeft
        // y=0 is actually event.y - this.divMaskDimensions.divTop
        const startX = event.x - this.divMaskDimensions.divLeft;
        const startY = event.y - this.divMaskDimensions.divTop;

        let isClickWithinShape = false;

        // Check if the click point is within any existing shape
        for (const shape of this.controller.getVisibleShapesList()) {
            const shapeBounds = shape.graphics.getBounds();
            if (shapeBounds.contains(startX, startY)) {
                isClickWithinShape = true;
                shape.removeFromVisibleList();
                shape.destroy();
                this.controller.increaseScore();
                break;
            }
        }

        // generate random shape if is click outside any shape
        if (!isClickWithinShape) {
            new RandomShape(this.app, this.controller, this.shapeId++, startX, startY);
            this.controller.decreaseScore();
        }
    }

    private updateNumberOfShapesText(): void {
        this.numberOfShapesText.text = `Number of Shapes: ${this.getNumberOfVisibleShape()}`;
    }

    private updateAreaOfShapesText(): void {
        this.areaOfShapesText.text = `Area of Shapes: ${this.getTotalAreaOfVisibleShapes()}px^2`;
    }

    private updateScore(): void {
        this.scoreText.text = `Score: ${this.controller.getScore()}`;
    }

    private getNumberOfVisibleShape(): number {
        return this.controller.getVisibleShapesList().length;
    }

    private getTotalAreaOfVisibleShapes(): number {
        return Math.round(this.controller.getAreaOccupied());
    }

    getRandomNumber(min: number, max: number): number {
        return Math.floor(min + Math.random() * (max - min));
    }
}

export default PixiApp;
