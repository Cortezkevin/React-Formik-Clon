import { FormEvent, createContext } from 'react';
import { useForm } from '../hooks/useForm';
import { getFieldProps } from '../interfaces/interfaces';
import { Errors, FormHandlerArgs, Values, onEventArgs } from '../interfaces/interfaces';

interface FormContextProps {
  getFieldProps: ( field: string ) => getFieldProps;
  handleSubmit: ( e: FormEvent<HTMLFormElement>) => void;
  errors: Errors;
	touched: Values;
}

export const FormContext = createContext({} as FormContextProps );
const { Provider } = FormContext;

export interface Props {
  children: ( args: FormHandlerArgs ) => JSX.Element;
  initialValues: Values;
  onSubmit: ( args: onEventArgs ) => void;
  onReset?: ( args: onEventArgs ) => void;
  validate?: ( values: Values ) => Errors;
  validateOnChange?: boolean;
}

export const Formik = ({ initialValues, children, onSubmit, onReset, validate, validateOnChange }: Props) => {

	const { handleSubmit, values, handleChange, handleBlur, handleFocus, isSubmitting, handleReset, errors, touched, isValid, getFieldProps } = useForm({ initialValues, onSubmit, onReset, validate, validateOnChange });

  return (
    <Provider value={{ getFieldProps, handleSubmit, errors, touched }}>
      {
        children({          
          isSubmitting,
          values,          
          errors,
          touched,
          isValid,
          handleSubmit,
          handleChange,
          handleFocus,
          handleBlur,
          handleReset,
          getFieldProps,          
        })        
      }
    </Provider>
  )
}
