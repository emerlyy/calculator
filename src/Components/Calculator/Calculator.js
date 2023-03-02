import React, { useEffect, useState } from "react";

import './Calculator.css';
import { calculate } from '../../Helpers/Operations';

import Display from "../Input/Display";
import Button from "../Button/Button";

const Calculator = () => {

  const [numberField, setNumberField] = useState('0');
  const [resultField, setResultField] = useState('');
  const [lastOperation, setLastOperation] = useState('=');
  const [operand, setOperand] = useState(0);

  let timeoutHandle;

  const onNumberClicked = (e) => {
    const target = e.target;
    const value = target.textContent;
    
    if (numberField.includes('Digit limit met')) {
      return;
    }

    if (resultField.includes('=')) {
      setResultField('');
      setNumberField('');
    }

    if (numberField.length > 15) {
      const oldValue = numberField;
      setNumberField('Digit limit met');
      timeoutHandle = setTimeout(() => setNumberField(oldValue), 1000);
      return;
    }

    if (numberField === '0' && value !== ',') {
      setNumberField(value);
    }
    else if (numberField === '0' && value === ',') {
      setNumberField('0' + value);
    }
    else if (value === ',' && numberField.includes(',')) {
      return;
    }
    else {
      setNumberField((state) => state + value);
    }

  };

  useEffect(() => () => clearTimeout(timeoutHandle), [timeoutHandle]);

  const onOperationClicked = (event) => {

    if (numberField.includes('Digit limit met')) {
      return;
    }

    const target = event.target;
    const operation = target.textContent;
    if (numberField.slice(-1) === ',') {
      setNumberField(state => state.slice(0, -1));
    }

    if (resultField.includes('=') && operand) {
      if (operation === '=') {
        const first = parseFloat(numberField);
        const second = parseFloat(operand);
        const res = calculate(first, second, lastOperation);
        setResultField(`${first} ${lastOperation} ${second} =`);
        setNumberField(res.toString());
        return;
      }
      setResultField(numberField + ' ' + operation);
      setNumberField('0');
      setOperand(null);
      setLastOperation(operation);
      return;
    }

    if (operation === '=') {
      if (lastOperation === '=') {
        setResultField(numberField + ' ' + operation);
        return;
      }
      const first = parseFloat(resultField.length > 0 ? resultField.replace(',', '.') : numberField.replace(',', '.'));
      const second = parseFloat(operand ? operand : numberField.replace(',', '.'));
      const res = calculate(first, second, lastOperation);
      setNumberField(res.toString().replace('.', ','));
      setResultField(`${first} ${lastOperation} ${second} =`);
      if (!operand)
        setOperand(numberField);
      return;
    }

    if (['+', '-', '/', 'x'].some(el => resultField.includes(el))) {
      setResultField((state) => state.slice(0, -1) + ' ' + operation);
      setOperand(null);
      setLastOperation(operation);
      return;
    }
    setResultField(numberField + ' ' + operation);
    setNumberField('0');
    setOperand(null);
    setLastOperation(operation);
  };

  const onClearAll = () => {
    clearTimeout(timeoutHandle);
    setNumberField('0');
    setResultField('');
    setLastOperation('=');
    setOperand(null);
  }

  const onClearNumberField = () => {
    setNumberField('0');
  }

  useEffect(() => {
    const calculator = document.querySelector('.calculator');
    let btns = [];
    const onKeyDown = ({ key, repeat }) => {
      if (repeat)
        return;
      if (key === 'x')
        return;
      if (key === 'Enter')
        key = '=';
      if (key === '*')
        key = 'x';

      btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(el => el.textContent === key);

      if (btn) {
        btn.click();
        btn.classList.add('active');
      }
    }

    const onKeyUp = () => {
      btns.forEach(el => {
        el.classList.remove('active');
      });
    }
    calculator.addEventListener('keydown', onKeyDown);
    calculator.addEventListener('keyup', onKeyUp);
    return () => {
      calculator.removeEventListener('keydown', onKeyDown);
      calculator.removeEventListener('keyup', onKeyUp);
    }
  }, []);

  useEffect(() => {
    const display = document.getElementById('main-display');
    if (display && display.textContent.length > 16) {
      display.style.fontSize = '1.1rem';
    }
    return () => display.style.fontSize = '';
  }, [numberField]);

  return (
    <div className="calculator" tabIndex={-1}>
      <Display type="small">{resultField}</Display>
      <Display id='main-display'>{numberField}</Display>
      <div className="buttons-wrapper">
        <Button onClick={onClearNumberField}>CE</Button>
        <Button onClick={onClearAll}>C</Button>
        <Button onClick={onOperationClicked} type='darker'>/</Button>
        <Button onClick={onOperationClicked} type='darker'>x</Button>
        <Button onClick={onNumberClicked}>7</Button>
        <Button onClick={onNumberClicked}>8</Button>
        <Button onClick={onNumberClicked}>9</Button>
        <Button onClick={onOperationClicked} type='darker'>-</Button>
        <Button onClick={onNumberClicked}>4</Button>
        <Button onClick={onNumberClicked}>5</Button>
        <Button onClick={onNumberClicked}>6</Button>
        <Button onClick={onOperationClicked} type='darker'>+</Button>
        <Button onClick={onNumberClicked}>1</Button>
        <Button onClick={onNumberClicked}>2</Button>
        <Button onClick={onNumberClicked}>3</Button>
        <Button type='equal' id='equal' onClick={onOperationClicked}>=</Button>
        <Button id='zero' onClick={onNumberClicked}>0</Button>
        <Button onClick={onNumberClicked}>,</Button>
      </div>
    </div>
  );
}

export default Calculator;