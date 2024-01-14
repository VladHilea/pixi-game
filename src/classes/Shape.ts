import * as PIXI from 'pixi.js';
import Controller from "./Controller";
import {APP_CONSTANTS} from "../constants/Constants";

class Shape {
    public graphics: PIXI.Graphics;
    public shapeId: number;
    public areaInPixels: number = 0;
    public height: number = 0;

    private isVisible: boolean = false;
    private controller: Controller;
    private isDestroyed: boolean = false;
    private app: PIXI.Application;

    constructor(app: PIXI.Application, controller: Controller, shapeId: number, startX: number, startY: number) {
        this.app = app;
        this.graphics = new PIXI.Graphics();
        this.app.stage.addChild(this.graphics);
        this.graphics.x = startX;
        this.graphics.y = startY;
        this.shapeId = shapeId;
        this.controller = controller;

        // set up event listeners
        this.graphics.eventMode = 'static';
        this.graphics.on('pointerover', () => {
            this.graphics.cursor = 'pointer';
        });
        this.graphics.on('pointerout', () => {
            this.graphics.cursor = 'default';
        });

        // add to list in controller
        this.controller.addToAllList(this);
    }

    public update(): void {
        // apply gravity
        this.graphics.y += this.controller.getGravityFactor() * 0.5 + 1; // to look better with values form control on UI

        // optimise, only apply update before destruction
        if (!this.isDestroyed) {
            // becomes visible
            if (!this.isVisible && this.graphics.y + this.height > 0 && this.graphics.y < this.app.renderer.height) {
                this.addOnVisibleList();
            }

            // not visible anymore
            if (this.isVisible && this.graphics.y > this.app.renderer.height) {
                this.removeFromVisibleList();

            }

            // destroy the shape when it goes below the (canvas + offset)
            if (this.graphics.y > this.app.renderer.height + APP_CONSTANTS.SHAPES_DESTROY_OFFSET_AFTER_APP_BOTTOM) {
                this.destroy();
            }
        }
    }

    public addOnVisibleList(): void {
        this.isVisible = true;
        this.controller.addToListOfVisibleShapes(this);
    }

    public removeFromVisibleList(): void {
        this.isVisible = false;
        this.controller.removeFromListOfVisibleShapes(this);
    }

    public destroy(): void {
        this.isDestroyed = true;
        this.controller.removeFromAllList(this);
        this.app.stage.removeChild(this.graphics);
    }
}

export default Shape;
