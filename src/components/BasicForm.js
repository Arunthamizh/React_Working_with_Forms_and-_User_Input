import useInput from "../hooks/use-input";

const BasicForm = (props) => {

  const  isNotEmpty = value => value.trim() !== '';
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameInputChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    reset: firstNameInputResetHandler
  } = useInput(isNotEmpty);

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameInputChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    reset: lastNameInputResetHandler
  } = useInput(isNotEmpty);


  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: emailInputResetHandler
  } = useInput(value => value.includes('@'))

  let formIsValid = false

  if(enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid ){
    formIsValid = true
  }

  const fistNameClass = firstNameInputHasError
    ? "form-control invalid"
    : "form-control";

    const lastNameClass = lastNameInputHasError
    ? "form-control invalid"
    : "form-control";

    const emailClass = emailInputHasError
    ? "form-control invalid"
    : "form-control";

    const formSubmitHandler = (event) => {
      event.preventDefault();

      if(!formIsValid) {
        return;
      }

      console.log('Submitted')
      console.log(enteredFirstName, enteredLastName, enteredEmail)

      firstNameInputResetHandler();
      lastNameInputResetHandler();
      emailInputResetHandler();
    }

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={fistNameClass}>
          <label htmlFor="name">First Name</label>
          <input type="text" id="name"
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputBlurHandler}
            value={enteredFirstName}
          />
          {firstNameInputHasError && (
            <p className="error-text">Please enter a first name.</p>
          )}
        </div>
        <div className={lastNameClass}>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName"
          onChange={lastNameInputChangeHandler}
          onBlur={lastNameInputBlurHandler}
          value={enteredLastName}
          />
          {lastNameInputHasError && (
            <p className="error-text">Please enter a last name.</p>
          )}
        </div>
      </div>
      <div className={emailClass}>
        <label htmlFor="email">E-Mail Address</label>
        <input type="text" id="email"
        onChange={emailInputChangeHandler}
        onBlur={emailInputBlurHandler}
        value={enteredEmail}
        />
        {emailInputHasError &&(
          <p className="error-text">Please enter a valid email address</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit{formIsValid}</button>
      </div>
    </form>
  );
};

export default BasicForm;
