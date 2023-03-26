import { useState } from 'react';
import '../App.css'
import CalculatorButtons from "./CalculatorButtons";

////////////////////////////////////////////////////////

const Calculator = () => {

    const [display, setDisplay] = useState({
        current: "0",
        total: "0",
        isInitial: true,
        prepOp: ''
    });

////////////////////////////////////////////////////////

    const handleNumber = (value) => {
        let newValue = value;  
        console.log(display.isInitial)
        if (display.isInitial === false){
            newValue = display.current + value;
        }
        console.log(display.isInitial)
        setDisplay({ current: newValue, total: display.total, isInitial: false, prepOp: display.prepOp });
    };

//////////////////////////////////////////////////////////

    const handleOperator = (value) => {
        const total = doCalculation();
        setDisplay({current: total.toString(), total: total.toString(), isInitial: true, prepOp: value});
    }

///////////////////////////////////////////////////////////

    const doCalculation = () => {
        let total = parseInt(display.total);
        switch(display.prepOp){
            case "+":
                total += parseInt(display.current);
                break;
            case "-":
                total -= parseInt(display.current);
                break;
            case "*":
                total *= parseInt(display.current);
                break;
            case "/":
                total /= parseInt(display.current);
                break;
            default:
                total = parseInt(display.current)
        }
        return total
    }

////////////////////////////////////////////////////////////

    function handleClear () {
        setDisplay(
        {current: "0",
        total: "0", 
        isInitial: true,
        prepOp: ''}
        );
    };

////////////////////////////////////////////////////////////

    return (
    <div className="calculator">

        <div className='display'>{display.current}</div>

        <CalculatorButtons onClick = {handleNumber} value='7' />
        <CalculatorButtons onClick = {handleNumber} value='8' />
        <CalculatorButtons onClick = {handleNumber} value='9' />
        <CalculatorButtons onClick = {handleOperator} className="operator" value='/' />
        <CalculatorButtons onClick = {handleNumber} value='4' />
        <CalculatorButtons onClick = {handleNumber} value='5' />
        <CalculatorButtons onClick = {handleNumber} value='6' />
        <CalculatorButtons onClick = {handleOperator} className='operator' value='*' />
        <CalculatorButtons onClick = {handleNumber} value='1' />
        <CalculatorButtons onClick = {handleNumber} value='2' />
        <CalculatorButtons onClick = {handleNumber} value='3' />
        <CalculatorButtons onClick = {handleOperator} className='operator' value='-' />
        <CalculatorButtons onClick = {handleClear} value='C' />
        <CalculatorButtons onClick = {handleNumber} value='0' />
        <CalculatorButtons onClick = {handleOperator} value='=' />
        <CalculatorButtons onClick = {handleOperator} className='operator' value='+' />


    </div>)
};

export default Calculator;