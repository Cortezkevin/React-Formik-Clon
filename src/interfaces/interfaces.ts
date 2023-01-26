import { FormEvent, ChangeEvent } from 'react'

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

export interface FormHandlerArgs {
	values: Values;
	handleSubmit: ( e: FormEvent<HTMLFormElement>) => void;
	isSubmitting: boolean;
	handleChange: ( e: ChangeEvent<HTMLInputElement> ) => void;
	handleReset: () => void;
	errors: Errors;
	touched: Values;
	isValid: boolean;
}