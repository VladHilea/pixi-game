import * as PIXI from 'pixi.js';
import {DivMaskDimensions} from "../types";
import Controller from "./Controller";

class Shape {
    public graphics: PIXI.Graphics;
    protected app: PIXI.Application;
    protected velocityY: number;
    public shapeId: number;
    protected gravity: number;
    protected startX: number;
    protected startY: number;
    public areaInPixels = 0;
    public isVisible = false;
    public controller: Controller;
    private destroyed = false;
    public height=0;


    constructor(app: PIXI.Application, controller: Controller, shapeId: number, startX: number, startY: number, velocityY: number, gravity: number) {
        this.app = app;
        this.graphics = new PIXI.Graphics();
        this.app.stage.addChild(this.graphics);
        this.startX = startX;
        this.startY = startY;
        this.graphics.x = startX;
        this.graphics.y = startY;
        this.velocityY = velocityY;
        this.gravity = gravity;
        this.shapeId = shapeId;
        this.controller = controller;

        // Set up click event listener
        this.graphics.eventMode = 'static';
        // this.graphics.on('pointerdown', () => {
        //     this.onClick();
        // });
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

    // Define the click behavior (can be overridden in child classes)
    protected onClick(): void {
        if (!this.destroyed) {
            this.removeFromVisibleList();
            this.destroy();
        }
    }

    public update(): void {
        // Check if the shape's y position is within the centered div
        //this.graphics.visible = this.graphics.y >= this.divMaskDimensions.divTop && this.graphics.y <= this.divMaskDimensions.divBottom;

        // Update the position and velocity
        this.graphics.y += this.controller.gravityFactor * 0.5 + 1; // to look better on UI


        if (!this.destroyed) {
            //becomes visible
            if (!this.isVisible && this.graphics.y + this.height > 10 && this.graphics.y < this.app.renderer.height) {
                this.addOnVisibleList();
               // console.log(this, ' entered view area')
            }

            //becomes invisible
            if (this.isVisible && this.graphics.y > this.app.renderer.height) {
                this.removeFromVisibleList();
                //console.log(this, ' exited view area')

            }

            // Destroy the shape when it goes below the canvas + 100
            if ( this.graphics.y > this.app.renderer.height + 100) {
                this.destroy();
            }
        }
    }

    public addOnVisibleList(): void {
        this.isVisible = true;
        this.controller.addToListShape(this);
    }

    public removeFromVisibleList(): void {
        this.isVisible = false;
        this.controller.removeFromList(this);
    }

    public destroy(): void {
        this.destroyed = true;
        this.controller.removeFromAllList(this);
        this.app.stage.removeChild(this.graphics);
    }


}

export default Shape;
