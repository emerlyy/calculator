import React, { useEffect, useState, useRef } from "react";

import './Calculator.css';
import { calculate } from '../../Helpers/Operations';

import Display from "../Input/Display";
import Button from "../Button/Button";
import { Operation } from "types";
import { checkElementLength } from "Helpers/checkElementLength";

const Calculator = () => {

  const [numberField, setNumberField] = useState<string>('0');
  const [resultField, setResultField] = useState<string>('');
  const [lastOperation, setLastOperation] = useState<Operation>('=');
  const [operand, setOperand] = useState<number>(0);

  let timeoutHandle: NodeJS.Timeout | undefined;

  const calculatorRef = useRef<HTMLDivElement>(null);

  const mainDisplayRef = useRef<HTMLDivElement>(null);

  const onNumberClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
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
      setNumberField(value || '0');
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

  useEffect(() => () => { timeoutHandle && clearTimeout(timeoutHandle) }, [timeoutHandle]);

  const onOperationClicked = (event: React.MouseEvent<HTMLButtonElement>) => {

    if (numberField.includes('Digit limit met')) {
      return;
    }

    const target = event.target as HTMLButtonElement;
    const operation: Operation = target.textContent === 'x' ? '*' : target.textContent as Operation;

    if (numberField.slice(-1) === ',') {
      setNumberField(state => state.slice(0, -1));
    }

    if (resultField.includes('=') && operand) {
      if (operation === '=') {
        const first = parseFloat(numberField);
        const second = parseFloat(operand.toString());
        const res = calculate(first, second, lastOperation);
        setResultField(`${first} ${lastOperation} ${second} =`);
        setNumberField(res.toString());
        return;
      }
      if (operation) {
        setResultField(numberField + ' ' + operation);
        setNumberField('0');
        setOperand(0);
        setLastOperation(operation);
      }
      return;
    }

    if (operation === '=') {
      if (lastOperation === '=') {
        setResultField(numberField + ' ' + operation);
        return;
      }
      const first = parseFloat(resultField.length > 0 ? resultField.replace(',', '.') : numberField.replace(',', '.'));
      const second = parseFloat(operand ? operand.toString() : numberField.replace(',', '.'));
      const res = calculate(first, second, lastOperation);
      setNumberField(res.toString().replace('.', ','));
      setResultField(`${first} ${lastOperation} ${second} =`);
      if (!operand)
        setOperand(parseFloat(numberField));
      return;
    }

    if (['+', '-', '/', '*'].some(el => resultField.includes(el))) {
      setResultField((state) => state.slice(0, -1) + ' ' + operation);
      setOperand(0);
      if (operation)
        setLastOperation(operation);
      return;
    }
    setResultField(numberField + ' ' + operation);
    setNumberField('0');
    setOperand(0);
    if (operation)
      setLastOperation(operation);
  };

  const onClearAll = () => {
    clearTimeout(timeoutHandle);
    setNumberField('0');
    setResultField('');
    setLastOperation('=');
    setOperand(0);
  }

  const onClearNumberField = () => {
    setNumberField('0');
  }

  useEffect(() => {

    calculatorRef.current?.focus();

    let btns: HTMLButtonElement[] = [];
    const onKeyDown = ({ key, repeat }: KeyboardEvent) => {
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
    if (calculatorRef.current) {
      calculatorRef.current.addEventListener('keydown', onKeyDown);
      calculatorRef.current.addEventListener('keyup', onKeyUp);
    }

    return () => {
      if (calculatorRef.current) {
        calculatorRef.current.removeEventListener('keydown', onKeyDown);
        calculatorRef.current.removeEventListener('keyup', onKeyUp);
      }
    }
  }, []);


  useEffect(() => {
    const element = mainDisplayRef.current;
    if (element) {
      element.style.fontSize = checkElementLength(element, 16) ? '1.1rem' : '';
    }
  }, [numberField])

  return (
    <div className="calculator" ref={calculatorRef} tabIndex={1}>
      <Display type="small">{resultField}</Display>
      <Display ref={mainDisplayRef}>{numberField}</Display>
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