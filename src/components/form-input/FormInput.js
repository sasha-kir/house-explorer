import React from 'react';
import './FormInput.sass';

const FormInput= ({     inputName, inputType, handleInput, 
                        clearErrors, hasError, errorText, onKeyDown
                }) => {
    return(
        <div className="form-input-main-div">
            <div className={`form-element-name ${hasError ? "invalid" : ""}`}>
                {inputName}
            </div>
            <input  className={`form-element ${hasError ? "invalid" : ""}`}
                    onChange={handleInput}
                    onKeyDown={onKeyDown}
                    onFocus={clearErrors}
                    type={inputType} 
            />
            <div className={`form-error-message ${hasError ? "show" : ""}`} >
                    {errorText}
            </div>
        </div>
    )
}

export default FormInput;