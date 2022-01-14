import ReactDOM from "react-dom";


const PopupMessage = (props : any) => {

    return (<div style={{width: props.width, height: props.height, zIndex: 999, backgroundColor: 'blue', position: 'absolute', top: props.top, left: props.left + 5}}>Popup</div>)

}

export default PopupMessage;



export const renderPopupMessage = (props:any) => {
    const element =  document.body.appendChild(document.createElement("DIV"));
    ReactDOM.render(<PopupMessage {...props}/>,element);
    return element;
}

export const deletePopupMessage = (element:any) => {
    ReactDOM.unmountComponentAtNode(element);
}