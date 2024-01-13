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

class PixiApp {
    public app: PIXI.Application;
    private divMaskDimensions!: DivMaskDimensions;
    private readonly numberOfShapesText!: PIXI.Text; // Text field for "Number of Shapes"
    private readonly areaOfShapesText!: PIXI.Text; // Text field for "Number of Shapes"
    private shapeId=1;
    public generateInterval?: NodeJS.Timeout;
    public DesktopMobileShapeSizeFactor = 30;

    public controller = new Controller();



    constructor() {
        const canvasElement = document.getElementById('gameCanvas') as HTMLElement
        this.app = new PIXI.Application({
            width: canvasElement.getBoundingClientRect().width,
            height: canvasElement.getBoundingClientRect().height,
            backgroundColor: 0xd3d3d3,
            resizeTo: canvasElement,
        });

        this.numberOfShapesText = new PIXI.Text('Number of Shapes: 0', {
            fill: 0x000000, // Text color
            fontSize: 18,  // Font size
        });
        this.areaOfShapesText = new PIXI.Text('Area of Shapes: 0px^2', {
            fill: 0x000000, // Text color
            fontSize: 18,  // Font size
        });
        this.numberOfShapesText.x = 10; // Adjust the x-coordinate as needed
        this.numberOfShapesText.y = 10; // Adjust the y-coordinate as needed
        this.areaOfShapesText.x = 10; // Adjust the x-coordinate as needed
        this.areaOfShapesText.y = 30; // Adjust the y-coordinate as needed
        this.app.stage.addChild(this.numberOfShapesText);
        this.app.stage.addChild(this.areaOfShapesText);

        canvasElement.appendChild(this.app.view as any);


        // divMaskDimension set
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
            this.createNewShapeOnCLick(event);
        });



    }

    private generateShape(): void {

        //I give an offset(left and right) for the device relative sizes of the shapes, so they would always be inside the rectangle
        const startX = this.getRandomNumber(this.DesktopMobileShapeSizeFactor, this.divMaskDimensions.width-this.DesktopMobileShapeSizeFactor) // Random X position within the rectangle
        const startY = -300; //start above the rectangle canvas
        const velocityY = 0.5; // Adjust the falling speed as needed
        const gravity = 0.001; // Adjust the gravity factor as needed
// Randomly choose triangle or rectangular shape
        // Define an array of shape types
        const availableShapes = [Triangle, Square, Rectangular, Circle, Ellipse, FiveSides, SixSides, Star];

        // Randomly choose a shape type from the array
        const randomShapeType = availableShapes[Math.floor(Math.random() * availableShapes.length)];
        new randomShapeType(this.app,this.controller, this.shapeId++, startX, startY, velocityY, gravity);
    }

    private createNewShapeOnCLick(event: any): void {

        //x and y are the point of the event - the positions of the div rectangle
        // x=0 is actually event.x - this.divMaskDimensions.divLeft
        //y=0 is actually event.y - this.divMaskDimensions.divTop
        const startX = event.x - this.divMaskDimensions.divLeft;
        const startY = event.y - this.divMaskDimensions.divTop;
        const velocityY = 0.5; // Adjust the falling speed as needed
        const gravity = 0.001; // Adjust the gravity factor as needed

        let isClickWithinShape = false;

        //console.log(this.controller.listOfAllShapes)
        // Check if the click point is within any existing shape
        for (const shape of this.controller.listOfAllShapes) {
            const shapeBounds = shape.graphics.getBounds();
            if (shapeBounds.contains(startX, startY)) {
                isClickWithinShape = true;
                shape.removeFromVisibleList();
                shape.destroy();
                break; // Exit the loop if the click is inside any shape
            }
        }

        if (!isClickWithinShape) {
            new RandomShape(this.app,this.controller,this.shapeId++, startX, startY, velocityY, gravity);
        }
    }


    public start(): void {
        // Start generating shapes at a given frequency (1 shape per second)
        this.generateInterval = setInterval(() => {
            for (let i = 0; i<this.controller.shapesPerSecond;i++)
                this.generateShape();
        }, 1000);

        // Animation loop
        this.app.ticker.add(() => {
            for (const shape of this.controller.listOfAllShapes) {
                shape.update();
                this.updateNumberOfShapesText();
                this.updateAreaOfShapesText();
            }
        });
    }

    public stopGenerating(): void {
        // Clear the interval to stop generating shapes
        clearInterval(this.generateInterval);
    }

    private updateNumberOfShapesText() {
        this.numberOfShapesText.text = `Number of Shapes: ${this.getNumberOfShapesVisibleInBounds()}`;
    }

    private updateAreaOfShapesText() {
        this.areaOfShapesText.text = `Area of Shapes: ${this.getTotalAreaOfVisibleShapes()}px^2`;
    }

    private getNumberOfShapesVisibleInBounds(): number {
        // const appScreenBounds = this.app.screen;
        //
        // let count = 0;
        //
        // for (const shape of this.shapes) {
        //     const shapeBounds = shape.graphics.getBounds();
        //
        //     if (appScreenBounds.intersects(shapeBounds)) {
        //         count++;
        //     }
        // }

        return this.controller.listOfViewableShapes.length;
    }

    private getTotalAreaOfVisibleShapes() {
        return Math.round(this.controller.areaOccupied);
        // const appScreenBounds = this.app.screen;
        // let area = 0;
        //
        // for (const shape of this.shapes) {
        //     const shapeBounds = shape.graphics.getBounds();
        //
        //     if (appScreenBounds.intersects(shapeBounds)) {
        //         area = area + shape.areaInPixels;
        //     }
        // }
        //
        // return Math.round(area);

    }

    pause() {
        this.app.ticker.stop();
        clearInterval(this.generateInterval)
    }

    resume() {
        this.app.ticker.start();
        this.generateInterval = setInterval(() => {
            for (let i = 0; i<this.controller.shapesPerSecond;i++)
                this.generateShape();
        }, 1000);
    }

    getRandomNumber(min:number, max:number) {
        // Generate a random number between 0 (inclusive) and 1 (exclusive)
        const randomFraction = Math.random();

        // Scale the random fraction to be within the range [min, max]
        const randomInRange = min + randomFraction * (max - min);

        // Round the result to an integer (you can remove this if you want decimal numbers)
        return Math.floor(randomInRange);
    }
}

export default PixiApp;
