
import { useRef, useState } from 'react';
const SimpleInput = (props) => {

  const [enteredName, setEnteredName] = useState('');
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
  }

  const formSubmissionHandler = (event) => {
    // ! The javascript default behavior is when submitting a form, it sends a request to the server. so it will refresh the page.
    // ! .... To prevent that default behavior, we use event.preventDefault();
    event.preventDefault();
    console.log(enteredName);
    console.log(enteredInputRef.current.value);

    // ! Don`t do this with refs!
    // ! enteredInputRef.current.value = ''; // NOT IDEAL, DON'T MANIPULATE THE DOM
    // ! instead, use state to achieve the same result

    setEnteredName('');

  }

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input ref={enteredInputRef} type='text' id='name' onChange={nameInputChangeHandler} value={enteredName} />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
