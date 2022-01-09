import React from "react";
import classNames from "classnames";

const CrossHairs = props => {
    const { x, y, chart_dims,style } = props;

    if (x + y === 0) {
        return <></>;
    }

    return (
        <>
            <line
                x1={0}
                y1={y}
                x2={chart_dims.pixel_width}
                y2={y}
                style={style}
                className={classNames({
                    cross_hair: true,
                    horz: true
                })}
            />
            <line
                x1={x}
                y1={0}
                x2={x}
                y2={chart_dims.pixel_height}
                style={style}
                className={classNames({
                    cross_hair: true,
                    vert: true
                })}
            />
        </>
    );
};

export default CrossHairs;
