
import { useRef, useState } from 'react';
const SimpleInput = (props) => {

  const [enteredName, setEnteredName] = useState('');
  const [enteredInputIsValid, setEnteredInputIsValid] = useState(false);
  const [enteredInputIsTouched, setEnteredInputIsTouched] = useState(false);
  // const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const enteredInputRef =  useRef();

  //  ! Two approaches to handle the status of the input
  // ! 1. Use the useState
  // ! 2. Use the useRef

  // * useState
  // ! When we need to track the state of input for every keystroke
  // ! If we want value on every keystroke, we can use useState for instance validation. 
  // ! If want to reset the value, we can use useState

  // * useRef
  // ! we read the value when needed it using the useRef
  // ! If we want the value at once, we can use the useRef


  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
    // if(enteredName.trim() === ''){
    //   setEnteredInputIsValid(false);
    // } else {
    //   setEnteredInputIsValid(true);
    // }
  }

  const formSubmissionHandler = (event) => {
    // ! The javascript default behavior is when submitting a form, it sends a request to the server. so it will refresh the page.
    // ! .... To prevent that default behavior, we use event.preventDefault();
    event.preventDefault();
    
    // setIsFormSubmitted(true);
    setEnteredInputIsTouched(true);

    if(enteredName.trim() === ''){
      setEnteredInputIsValid(false);
      return;
    }
    setEnteredInputIsValid(true);
    console.log(enteredName);
    console.log(enteredInputRef.current.value);

    // ! Don`t do this with refs!
    // ! enteredInputRef.current.value = ''; // NOT IDEAL, DON'T MANIPULATE THE DOM
    // ! instead, use state to achieve the same result

    setEnteredName('');

  }

  const nameInputIsInvalid = !enteredInputIsValid && enteredInputIsTouched;

  const nameInputClasses = nameInputIsInvalid 
  ? 'form-control invalid' 
  : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref={enteredInputRef} type='text' id='name' onChange={nameInputChangeHandler} value={enteredName} />
        {nameInputIsInvalid && <p className='error-text'>Please enter a name</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
