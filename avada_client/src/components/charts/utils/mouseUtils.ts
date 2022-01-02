export const onMouseLeave = (setMouseCoords: any) => {
    setMouseCoords({
        x: 0,
        y: 0
    });
};

export const onMouseMoveInside = (e:any, setMouseCoords: any) => {
    setMouseCoords({
        x:
            e.nativeEvent.x -
            Math.round(e.currentTarget.getBoundingClientRect().left),
        y:
            e.nativeEvent.y -
            Math.round(e.currentTarget.getBoundingClientRect().top)
    });
};

export const dollarAt = (pixel:any, chart_dims: any) => {
    const dollar =
        (Math.abs(pixel - chart_dims.pixel_height) / chart_dims.pixel_height) *
        chart_dims.dollar_delta +
        chart_dims.dollar_low;

    return pixel > 0 ? dollar.toFixed(2) : "-";
};