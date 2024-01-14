export const getAPP_CONSTANTS = () => {
        return {
            SHAPES_CREATE_POINT: -100,
            SHAPES_DESTROY_OFFSET_AFTER_APP_BOTTOM: 100,
            OUTER_CIRCLE_RADIUS_FOR_SHAPE_SIZE: (window.innerWidth < 768) ? 25 : 40,
            TEXT_FONT_SIZE: (window.innerWidth < 768) ? 13 : 18,
        };

}


const APP_CONSTANTS = getAPP_CONSTANTS();
