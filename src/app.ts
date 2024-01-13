import PixiApp from './classes/PixiApp'; // Import the PixiApp class

// Create an instance of PixiApp to start the application
const pixiApp = new PixiApp();
let isPaused = false;
pixiApp.start();

// Add event listeners to the buttons
const pauseButton = document.getElementById('pauseButton') as HTMLElement;

pauseButton?.addEventListener('click', pauseResume);

const gravityFactorMinusBtn = document.getElementById('gravityFactorMinusBtn') as HTMLButtonElement;
const gravityFactorPlusBtn = document.getElementById('gravityFactorPlusBtn') as HTMLButtonElement;
const gravityFactor = document.getElementById('gravityFactor') as HTMLElement;

const shapesPerSecondMinusBtn = document.getElementById('shapesPerSecondMinusBtn') as HTMLButtonElement;
const shapesPerSecondPlusBtn = document.getElementById('shapesPerSecondPlusBtn') as HTMLButtonElement;
const shapesPerSecond = document.getElementById('shapesPerSecond') as HTMLElement;

gravityFactorMinusBtn?.addEventListener('click', () => changeGravityFactor(false));
gravityFactorPlusBtn?.addEventListener('click', () => changeGravityFactor(true));
shapesPerSecondMinusBtn?.addEventListener('click', () => changeShapesPerSecond(false));
shapesPerSecondPlusBtn?.addEventListener('click', () => changeShapesPerSecond(true));


//initialize controls with value
gravityFactor.innerText = String(pixiApp.controller.gravityFactor);
toggleDisabledControlGravity();
shapesPerSecond.innerText = String(pixiApp.controller.shapesPerSecond);
toggleDisabledControlShapes();


function pauseResume() {
    if (!isPaused) {
        pixiApp.pause()
        isPaused = true;
        pauseButton.innerText = 'Resume';

        return;
    }
    pauseButton.innerText = 'Pause';

    pixiApp.resume(); // Resume the PixiJS animation loop
    isPaused = false;
}

function changeGravityFactor(increase: boolean): void {
    if (increase) {
        pixiApp.controller.increaseGravityFactor();
        gravityFactor.innerText = String(pixiApp.controller.gravityFactor);
    } else {
        pixiApp.controller.decreaseGravityFactor();
        gravityFactor.innerText = String(pixiApp.controller.gravityFactor);
    }

    toggleDisabledControlGravity();
}

function changeShapesPerSecond(increase: boolean): void {
    if (increase) {
        pixiApp.controller.increaseShapeserSecond();
        shapesPerSecond.innerText = String(pixiApp.controller.shapesPerSecond);
    } else {
        pixiApp.controller.decreaseShapeserSecond();
        shapesPerSecond.innerText = String(pixiApp.controller.shapesPerSecond);
    }

    toggleDisabledControlShapes();
}

function toggleDisabledControlGravity() {
    if (pixiApp.controller.gravityFactor === 10) {
        gravityFactorPlusBtn.disabled = true;
    } else {
        gravityFactorPlusBtn.disabled = false;
    }

    if (pixiApp.controller.gravityFactor === 1) {
        gravityFactorMinusBtn.disabled = true;
    } else {
        gravityFactorMinusBtn.disabled = false;
    }
}

function toggleDisabledControlShapes() {
    if (pixiApp.controller.shapesPerSecond === 710) {
        shapesPerSecondPlusBtn.disabled = true;
    } else {
        shapesPerSecondPlusBtn.disabled = false;
    }

    if (pixiApp.controller.shapesPerSecond === 1) {
        shapesPerSecondMinusBtn.disabled = true;
    } else {
        shapesPerSecondMinusBtn.disabled = false;
    }
}




