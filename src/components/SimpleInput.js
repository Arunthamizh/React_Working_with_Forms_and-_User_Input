// import { useEffect, useRef, useState } from "react";
import useInput from "../hooks/use-input";
const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput
  } = useInput( value => value.trim() !== '' );

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput
  } = useInput( value => value.includes('@') );

  // const [enteredName, setEnteredName] = useState("");
  // const [enteredInputIsTouched, setEnteredInputIsTouched] = useState(false);
  
  // const [enteredInputIsValid, setEnteredInputIsValid] = useState(false);
  // const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  // const [formIsValid, setFormIsValid] = useState(false);
  // const enteredInputRef =  useRef();

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

  // const enteredInputIsValid = enteredName.trim() !== "";
  // const nameInputIsInvalid = !enteredInputIsValid && enteredInputIsTouched;

  // * Overall Form Validation
  // ! the useEffect will have extra rendering cost.
  // useEffect(() => {
  //   if (enteredInputIsValid) {
  //     setFormIsValid(true);
  //   } else {
  //     setFormIsValid(false);
  //   }

  // }, [enteredInputIsValid])

  let formIsValid = false;
  // ! change form input are valid and set form is valid or invalid
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler_ = (event) => {
    // if(enteredName.trim() === ''){
    //   setEnteredInputIsValid(false);
    // } else {
    //   setEnteredInputIsValid(true);
    // }
    // setEnteredName(event.target.value);
    // ! The above setEnteredName() will be in the schedule. it will not updated immediately.
    // ! so that we are using event.target.value

    // if(event.target.value.trim() !== ''){
    //   setEnteredInputIsValid(true);
    //   return;
    // }
  };

  const nameInputBlurHandler_ = () => {
    // setEnteredInputIsTouched(true);

    // if(enteredName.trim() === ''){
    //   setEnteredInputIsValid(false);
    //   return;
    // }
  };

  const formSubmissionHandler = (event) => {
    // ! The javascript default behavior is when submitting a form, it sends a request to the server. so it will refresh the page.
    // ! .... To prevent that default behavior, we use event.preventDefault();
    event.preventDefault();

    // setIsFormSubmitted(true);
    // setEnteredInputIsTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    // ! Don`t do this with refs!
    // ! enteredInputRef.current.value = ''; // NOT IDEAL, DON'T MANIPULATE THE DOM
    // ! instead, use state to achieve the same result

    // setEnteredName("");
    // setEnteredInputIsTouched(false);

    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>

      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          // ref={enteredInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler} // this function will be triggered when the input is blurred(loose focus)
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Please enter a name</p>
        )}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-Mail</label>

        <input 
          type="text" 
          id="email" 
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
          />
          {emailInputHasError && (
            <p className="error-text">Please enter a valid email</p>
          )}
      </div>
      
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
