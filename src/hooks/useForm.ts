import { useState, FormEvent, ChangeEvent, useEffect, FocusEvent } from 'react';
import { Errors, Values, onEventArgs } from '../interfaces/interfaces';

interface useFormArgs {
	initialValues: Values;
	onSubmit: ( args: onEventArgs ) => void;
	onReset?: ( args: onEventArgs ) => void;
	validate?: ( values: Values ) => Errors;
	validateOnChange?: boolean;
}

export const useForm = ( { initialValues, onSubmit, onReset, validate, validateOnChange = true }: useFormArgs ) => {

  const [values, setValues] = useState<Values>( initialValues );
	const [submitting, setSubmitting] = useState(false);
	const [errors, setErrors] = useState<Errors>({});
	const [isValid, setIsValid] = useState(true);
	const [isChangeValues, setIsChangeValues] = useState(false);
	const [touched, setTouched] = useState<Values>({ });

	const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		})		
		
		setIsChangeValues( true );
	}

	const resetForm = () => {
		setValues( initialValues );
		setIsChangeValues( false );
		setErrors({});
		let touchedInitial: Values = {};
		Object.entries( initialValues ).forEach( v => {
			touchedInitial[ v[0] ] = false;
		})
		setTouched( touchedInitial );
	}

	const handleReset = () => {
		if( onReset ){
			onReset({ values, helpers: { resetForm, setSubmitting } });
		}else {
			resetForm();
		}		
	}	

	const handleSubmit = ( e: FormEvent<HTMLFormElement> ) => {
		setSubmitting( true );
		e.preventDefault();
		onSubmit({ values, helpers: { resetForm, setSubmitting } });				
	}	

	const handleBlur = ( e: FocusEvent<HTMLInputElement, Element>) => {		
		validate && setErrors( validate( values ) );
	}

	const handleFocus = ( e: FocusEvent<HTMLInputElement, Element> )  => {
		setTouched({
			...touched,
			[e.target.name]: true
		})
	}

	const getFieldProps = ( field:string ) => {
		return {
			name: field,			
			value: values[field],
			onChange: handleChange,
			onBlur: handleBlur,
			onFocus: handleFocus
		}
	}

	useEffect(() => {
		if( isChangeValues ){
			if( validateOnChange ){
				validate && setErrors( validate( values ));
			}			
		}		
	}, [ values ] );

	useEffect(() => {
		let touchedInitial: Values = {};
		Object.entries( initialValues ).forEach( v => {
			touchedInitial[ v[0] ] = false;
		})
		setTouched( touchedInitial );
	}, [ ]);

	useEffect(() => {
		if( Object.keys( errors ).length === 0 ){
			setIsValid( true );
		}else{
			setIsValid( false );
		}
	}, [ errors ]);

  return {
    handleSubmit,
    handleChange,
		handleBlur,
		handleFocus,
    values,
		isSubmitting: submitting,
		handleReset,
		errors,
		touched,
		isValid,
		getFieldProps
  }
}
