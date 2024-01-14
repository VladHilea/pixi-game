import * as PIXI from 'pixi.js';
import Controller from "./Controller";
import {APP_CONSTANTS} from "../constants/Constants";

class Shape {
    public graphics: PIXI.Graphics;
    protected app: PIXI.Application;
    public shapeId: number;
    public areaInPixels = 0;
    public isVisible = false;
    public controller: Controller;
    private destroyed = false;
    public height= 0;


    constructor(app: PIXI.Application, controller: Controller, shapeId: number, startX: number, startY: number) {
        this.app = app;
        this.graphics = new PIXI.Graphics();
        this.app.stage.addChild(this.graphics);
        this.graphics.x = startX;
        this.graphics.y = startY;
        this.shapeId = shapeId;
        this.controller = controller;

        // Set up click event listener
        this.graphics.eventMode = 'static';

        // Set cursor to hand pointer on hover
        this.graphics.on('pointerover', () => {
            this.graphics.cursor = 'pointer';
        });

        // Reset cursor on pointerout
        this.graphics.on('pointerout', () => {
            this.graphics.cursor = 'default';
        });

        this.controller.addToAllList(this);
    }

    public update(): void {
        // Check if the shape's y position is within the centered div
        //this.graphics.visible = this.graphics.y >= this.divMaskDimensions.divTop && this.graphics.y <= this.divMaskDimensions.divBottom;

        // Update the position and velocity
        this.graphics.y += this.controller.gravityFactor * 0.5 + 1; // to look better on UI


        if (!this.destroyed) {
            //becomes visible
            if (!this.isVisible && this.graphics.y + this.height > 0 && this.graphics.y < this.app.renderer.height) {
                this.addOnVisibleList();
               // console.log(this, ' entered view area')
            }

            //becomes invisible
            if (this.isVisible && this.graphics.y > this.app.renderer.height) {
                this.removeFromVisibleList();
                //console.log(this, ' exited view area')

            }

            // Destroy the shape when it goes below the canvas + 100
            if ( this.graphics.y > this.app.renderer.height + APP_CONSTANTS.SHAPES_DESTROY_OFFSET_AFTER_APP_BOTTOM) {
                this.destroy();
            }
        }
    }

    public addOnVisibleList(): void {
        this.isVisible = true;
        this.controller.addToListofVisibleShapes(this);
    }

    public removeFromVisibleList(): void {
        this.isVisible = false;
        this.controller.removeFromListOfVisibleShapes(this);
    }

    public destroy(): void {
        this.destroyed = true;
        this.controller.removeFromAllList(this);
        this.app.stage.removeChild(this.graphics);
    }


}

export default Shape;
