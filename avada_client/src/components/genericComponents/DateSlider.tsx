import {HStack, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack} from "@chakra-ui/react";
import {ColorPalette} from "../styles/color_palette";
import React from "react";
import {dateFromTimeStamp} from "../../utils/dateUtils";


const DateSlider = ({startDate, setStartDate,endDate, setEndDate, initialOffset, setInitialOffset, endOffset, setEndOffset, sliderStep, style, onDateDrag, onChangeDate} : any) => {


    return ( <div style={{
            borderWidth: 1,
            borderStyle: 'solid',
            marginTop: style.marginTop,
            width:'90%',
            borderRadius: 20,
            padding: 20
        }}>
            <HStack>
                <div>
                    <span>Start date: </span>
                    <span>{startDate}</span>
                </div>
                <div> /</div>
                <div>
                    <span>End date: </span>
                    <span>{endDate}</span>
                </div>
            </HStack>
            <RangeSlider onChange={(e) => onDateDrag(e)}
                         onChangeEnd={(e) => onChangeDate(e)}
                         defaultValue={[initialOffset, endOffset]}
                         min={1629504000} max={Math.round(Date.now() / 1000)}
                         step={sliderStep} minStepsBetweenThumbs={10}
            >
                <RangeSliderTrack bg={ColorPalette.thirdColor}>
                    <RangeSliderFilledTrack bg={ColorPalette.thirdColor}/>
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0}/>
                <RangeSliderThumb boxSize={6} index={1}/>
            </RangeSlider>
        </div>
    )


}


export default DateSlider;