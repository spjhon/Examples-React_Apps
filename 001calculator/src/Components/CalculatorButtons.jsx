
const CalculatorButtons = (props) => {
    return (
    <div>
        <button onClick={() => props.onClick(props.value)} className={props.className}>{props.value}</button>
    </div>)
};

export default CalculatorButtons;