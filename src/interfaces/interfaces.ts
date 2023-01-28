import { FormEvent, ChangeEvent, FocusEvent, ChangeEventHandler, FocusEventHandler } from 'react'
import { Props as FormikProps } from '../components/Formik';
import { Props as FieldProps  } from '../components/FormField';
import { Props as ErrorMessageProps } from '../components/FormErrorMessage';
import { Props as FormProps } from '../components/Form';

export interface Values {
    [ key: string ]: any
}

export interface Errors {
    [ key: string ]: string
}

interface FormHelpers {
    setSubmitting: ( arg: boolean ) => void; 
    resetForm: () => void;
}

export interface onEventArgs {
	values: Values;
	helpers: FormHelpers;
}

export interface getFieldProps {
	name: string;
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	onBlur: FocusEventHandler<HTMLInputElement>;
	onFocus: FocusEventHandler<HTMLInputElement>;
}

export interface FormHandlerArgs {
	isSubmitting: boolean;
	values: Values;		
	errors: Errors;
	touched: Values;
	isValid: boolean;		
	handleSubmit: ( e: FormEvent<HTMLFormElement>) => void;
	handleChange: ( e: ChangeEvent<HTMLInputElement> ) => void;	
	handleBlur: ( e: FocusEvent<HTMLInputElement, Element> ) => void;
	handleFocus: ( e: FocusEvent<HTMLInputElement, Element>) => void;
	handleReset: () => void;
	getFieldProps: ( field: string ) => getFieldProps;
}

export interface FormikHOCProps {
	( props: FormikProps ): JSX.Element;
	Field: ( props: FieldProps) => JSX.Element;
	ErrorMessage: ( props: ErrorMessageProps ) => JSX.Element;
	Form: ( props: FormProps ) => JSX.Element;
}