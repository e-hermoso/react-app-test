/** @jsxRuntime classic /
/* @jsx jsx */
import { css, jsx } from '@emotion/react';
import {FC, useState, createContext, FormEvent } from 'react';
import { PrimaryButton, gray5, gray6} from './Styles';

// Define interface for the form field values
export interface Values {
    [key: string ]: any;
}

// This is an indexable type where an array of validation
// error message is associated with a field name.
export interface Errors{
    [key: string]: string[];
}

// Render a validation error if the field has been
// touched and lost focus, so we need to track
export interface Touched{
    [key: string]: boolean;
}

// Define interface for our context which will 
// contain the form values and a function to update them.
interface FormContextProps{
    values: Values;
    setValue?:(fileName: string, value: any) => void;

    // Lets add the validation errors and whether a 
    // field has been touched to the form context
    errors: Errors;
    validate?: (fieldName: string) => void;
    touched: Touched;
    setTouched?: (fieldName: string) => void;
}

// This is an indexable type 
export const FormContext = createContext<FormContextProps>({
    values: {},
    errors: {},
    touched: {},
});

// Lets implement the validationRules prop in the Form component
type Validator = (value: any, args?:any) => string;

// Add prop to allow validation rules to be defined on the form
interface Validation{
    validator: Validator;
    arg?: any;
}
interface ValidationProp{
    [key: string]: Validation | Validation[];
}

export interface SubmitResult {
    success: boolean;
    errors?: Errors;
  }

// validator will be a function that takes in the field value
// as well as an optional additonal parameter
export const required: Validator = (value: any): string => value === undefined || value === null || value ===''? 'This must be populated':'';

// validator that checks whether the number of characters is a value is beyond a certian amount
export const minLength: Validator = (value: any, length: number,): string => value && value.length < length ? `This must be a least ${length} characters`:'';

// Define props interface, which is going to have a single prop
// for the Submit button
interface Props{
    submitCaption?: string;
    validationRules?: ValidationProp;

    // Lets create a function prop called onSubmit
    onSubmit: (values: Values) => Promise<SubmitResult>;

    // we want to inform the user of whether the submission has been
    // successful or not. We also want the consumer to be able to
    // pass in the success and failure messages.
    successMessage?: string;
    failureMessage?: string;
}

// Lets begin to implement the Form function
// component starting with destructing the props
// Notice we used children prop, which we are going to use
// later to render content nested within the form.
// Lets also destructure the onSubmit prop in the Form component.
export const Form: FC<Props> = ({submitCaption, 
    children, 
    validationRules,
    onSubmit,
    successMessage = 'Success!',
    failureMessage = 'Something went wrong'}) => {
        const [values, setValues] = useState<Values>({});
        const [errors, setErrors] = useState<Errors>({});
        const [touched, setTouched] = useState<Touched>({});
        const [submitting, setSubmitting] = useState(false);
        const [submitted, setSubmitted] = useState(false);
        const [submitError, setSubmitError] = useState(false);

        const validate = (fieldName: string): string[] =>{
            if(!validationRules){
                return[];
            }
            if(!validationRules[fieldName]){
                return [];
            }

            // The rules can either be a single Validation object
            // or an array of Validation objects. So let's get 
            // ourselves into a uniform situatin by always
            // working with an array of rules.
            const rules = Array.isArray(validationRules[fieldName])?(validationRules[fieldName] as Validation[]) : ([validationRules[fieldName]] as Validation[])

            // We can now iterate through the rules, invoking the validator 
            // and collecting any errors in a fieldErrors array
            const fieldErrors: string[] = [];
            rules.forEach(rule => {
                const error = rule.validator(values[fieldName], rule.arg);
                if(error){
                    fieldErrors.push(error);
                }
            });

            // Final task, update the errors state with new errors.
            const newErrors = { ...errors,[fieldName]: fieldErrors};
            setErrors(newErrors);
            return fieldErrors;
        }

        const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            // we prevent the default form submission from happening(preventDefault)
            e.preventDefault();
            if (validateForm()) {
            setSubmitting(true);
            setSubmitError(false);
            const result = await onSubmit(values);
            setErrors(result.errors || {});
            setSubmitError(!result.success);
            setSubmitting(false);
            setSubmitted(true);
            }
        };

        const validateForm = () => {
            const newErrors: Errors = {};
            let haveError: boolean = false;
            if (validationRules) {
            Object.keys(validationRules).forEach(fieldName => {
                newErrors[fieldName] = validate(fieldName);
                if (newErrors[fieldName].length > 0) {
                haveError = true;
                }
            });
            }
            setErrors(newErrors);
            return !haveError;
        };
        // Lets create the JSX for the Form. Note that the form context
        // is created lets use its 'Provider' component to give the children
        // components fo the form access to it
        return(
            <FormContext.Provider
                value={{values, setValue:(fieldName: string, value:any) =>
                    {setValues({...values,[fieldName]: value});
                },
                errors,
                validate,
                touched,
                setTouched: (fieldName: string) => {
                    setTouched({...touched,[fieldName]: true});
                    }
                }}
                >
                <form noValidate={true} onSubmit={handleSubmit}>
                    <fieldset disabled={submitting || (submitted && !submitError)} css={css`
                        margin: 10px auto 0 auto;
                        padding: 30px;
                        width: 350px;
                        background-color: ${gray6};
                        border-radius: 4px;
                        border: 1px solid ${gray5};
                        box-shadow: 0 3px 5px 0 rgba(0,0,0.16);
                    `}>
                        {children}
                        <div css={css`
                            margin: 30px 0px 0px 0px;
                            padding: 20px 0px 0px 0px;
                            border-top: 1px solid ${gray5};
                        `}>
                            <PrimaryButton type="submit">
                                {submitCaption}
                            </PrimaryButton>
                        </div>
                        {submitted && submitError && (
                            <p
                            css={css`
                                color: red;
                            `}
                            >
                            {failureMessage}
                            </p>
                        )}
                        {submitted && !submitError && (
                            <p
                            css={css`
                                color: green;
                            `}
                            >
                            {successMessage}
                            </p>
                        )}
                    </fieldset>
                </form>
            </FormContext.Provider>
        )
}
// Code above notice we create the new values object 
// using the spread syntax(...). This expands the properties in
// the object that is referenced after the dots.