import React, { useReducer, useState } from "react";

const initialState = {
    value: '',
    isTouched: false
} 
const inputStateReducer = (state, action) => {
    if(action.type === 'INPUT'){
        return {value: action.value, isTouched: state.isTouched}
    }
    if(action.type === 'BLUR'){
        return {isTouched: true, value: state.value}
    }
    if(action.type === 'RESET'){
        return initialState
    }
    return  
}
const useInput = (validateValue) => {
//   const [enteredValue, setEnteredValue] = useState('');
//   const [isTouched, setIsTouched] = useState(false);

// const valueIsValid = validateValue(enteredValue);
// const hasError = !valueIsValid && isTouched;


// ! handle with useReducer instead useState
  const [inputState, dispatch] = useReducer(inputStateReducer, initialState);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
      // setEnteredValue(event.target.value);
      dispatch({type: 'INPUT', value: event.target.value})
  };

  const inputBlurHandler = (event) => {
      // setIsTouched(true);
      dispatch({type: 'BLUR'})
  };

  const reset = () => {
    //   setEnteredValue('');
    //   setIsTouched(false);
    dispatch({type: 'RESET'})
  }
 
  return {
    // value: enteredValue,
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
