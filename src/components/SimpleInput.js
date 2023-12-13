
import { useRef, useState } from 'react';
const SimpleInput = (props) => {
  
  const [enteredName, setEnteredName] = useState('');
  // const [enteredInputIsValid, setEnteredInputIsValid] = useState(false);
  const [enteredInputIsTouched, setEnteredInputIsTouched] = useState(false);
  // const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  // const enteredInputRef =  useRef(); 
  
  const enteredInputIsValid = enteredName.trim() !== '';
  const nameInputIsInvalid = !enteredInputIsValid && enteredInputIsTouched;

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
    // if(enteredName.trim() === ''){
    //   setEnteredInputIsValid(false);
    // } else {
    //   setEnteredInputIsValid(true);
    // }
    setEnteredName(event.target.value); 
    // ! The above setEnteredName() will be in the schedule. it will not updated immediately.
    // ! so that we are using event.target.value

    // if(event.target.value.trim() !== ''){
    //   setEnteredInputIsValid(true);
    //   return;
    // }
  }

  const nameInputBlurHandler = () => {
    setEnteredInputIsTouched(true)

    // if(enteredName.trim() === ''){
    //   setEnteredInputIsValid(false);
    //   return;
    // }
  }

  const formSubmissionHandler = (event) => {
    // ! The javascript default behavior is when submitting a form, it sends a request to the server. so it will refresh the page.
    // ! .... To prevent that default behavior, we use event.preventDefault();
    event.preventDefault();
    
    // setIsFormSubmitted(true);
    setEnteredInputIsTouched(true);

    if(!enteredInputIsValid){
      return;
    }

    // ! Don`t do this with refs!
    // ! enteredInputRef.current.value = ''; // NOT IDEAL, DON'T MANIPULATE THE DOM
    // ! instead, use state to achieve the same result

    setEnteredName('');
    setEnteredInputIsTouched(false);

  }


  const nameInputClasses = nameInputIsInvalid 
  ? 'form-control invalid' 
  : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
        // ref={enteredInputRef} 
        type='text' id='name'
         onChange={nameInputChangeHandler} 
         onBlur={nameInputBlurHandler} // this function will be triggered when the input is blurred(loose focus)
         value={enteredName} />
        {nameInputIsInvalid && <p className='error-text'>Please enter a name</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
