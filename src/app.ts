import PixiApp from './classes/PixiApp';

// create an instance of PixiApp and start
const pixiApp = new PixiApp();
pixiApp.start();

// get html buttons
const pauseButton = document.getElementById('pauseButton') as HTMLButtonElement;
const toggleHtmlTextFieldsBtn = document.getElementById('toggleHtmlTextFields') as HTMLButtonElement;
const gravityFactorMinusBtn = document.getElementById('gravityFactorMinusBtn') as HTMLButtonElement;
const gravityFactorPlusBtn = document.getElementById('gravityFactorPlusBtn') as HTMLButtonElement;
const shapesPerSecondMinusBtn = document.getElementById('shapesPerSecondMinusBtn') as HTMLButtonElement;
const shapesPerSecondPlusBtn = document.getElementById('shapesPerSecondPlusBtn') as HTMLButtonElement;

// get html text and populate with default
const textFields = document.getElementById('textFields') as HTMLElement;
const gravityFactor = document.getElementById('gravityFactor') as HTMLElement;
const shapesPerSecond = document.getElementById('shapesPerSecond') as HTMLElement;
const numberOfVisibleShapesHTML = document.getElementById('numberOfVisibleShapes') as HTMLElement;
const areaOfVisibleShapesHTML = document.getElementById('areaOfVisibleShapes') as HTMLElement;
const scoreHTML = document.getElementById('score') as HTMLElement;
gravityFactor.innerText = String(pixiApp.controller.getGravityFactor());
toggleDisabledControlGravity();
shapesPerSecond.innerText = String(pixiApp.controller.getShapesPerSecond());
toggleDisabledControlShapes();

// event listeners
pauseButton?.addEventListener('click', pauseResume);
toggleHtmlTextFieldsBtn?.addEventListener('click', toggleHtmlText);
gravityFactorMinusBtn?.addEventListener('click', () => changeGravityFactor(false));
gravityFactorPlusBtn?.addEventListener('click', () => changeGravityFactor(true));
shapesPerSecondMinusBtn?.addEventListener('click', () => changeShapesPerSecond(false));
shapesPerSecondPlusBtn?.addEventListener('click', () => changeShapesPerSecond(true));
document.addEventListener('shapeListUpdated', (event: any) => updateHTMLTEXT(event)) // custom event
document.addEventListener('visibilitychange', handleVisibilityChange);

// top part button controllers
function pauseResume() {
    if (!pixiApp.controller.getIsPaused()) {
        pixiApp.pause()
        pauseButton.innerText = 'Resume';
        return;
    }
    pauseButton.innerText = 'Pause';
    pixiApp.resume();
}

function toggleHtmlText(): void {
    console.log(textFields.style.display)
    if (textFields.style.display === 'flex') {
        textFields.style.display = 'none';
        return;
    }
    textFields.style.display = 'flex';
}

// bottom part buttons and text controller functions
function changeGravityFactor(increase: boolean): void {
    if (increase) {
        pixiApp.controller.increaseGravityFactor();
        gravityFactor.innerText = String(pixiApp.controller.getGravityFactor());
    } else {
        pixiApp.controller.decreaseGravityFactor();
        gravityFactor.innerText = String(pixiApp.controller.getGravityFactor());
    }

    toggleDisabledControlGravity();
}

function changeShapesPerSecond(increase: boolean): void {
    if (increase) {
        pixiApp.controller.increaseShapesPerSecond();
        shapesPerSecond.innerText = String(pixiApp.controller.getShapesPerSecond());
    } else {
        pixiApp.controller.decreaseShapesPerSecond();
        shapesPerSecond.innerText = String(pixiApp.controller.getShapesPerSecond());
    }

    toggleDisabledControlShapes();
}

function toggleDisabledControlGravity() {
    gravityFactorPlusBtn.disabled = pixiApp.controller.getGravityFactor() === 10;

    gravityFactorMinusBtn.disabled = pixiApp.controller.getGravityFactor() === 1;
}

function toggleDisabledControlShapes() {
    shapesPerSecondPlusBtn.disabled = pixiApp.controller.getShapesPerSecond() === 20;

    shapesPerSecondMinusBtn.disabled = pixiApp.controller.getShapesPerSecond() === 1;
}

// update HTML text controller
function updateHTMLTEXT(event: CustomEvent): void {
    numberOfVisibleShapesHTML.innerText = String(event.detail.numberOFVisibleShapes);
    areaOfVisibleShapesHTML.innerText = String(Math.round(event.detail.areaInPixelsOfVisibleShapes));
    scoreHTML.innerText = String(event.detail.score);
}

// pause on change tab or minimize
function handleVisibilityChange() {
    if (document.hidden) {
        pixiApp.controller.setPause(false); // force set to false so the pauseResume() will apply correctly
        pauseResume();
    }
}




