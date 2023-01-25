import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Errors, Values, onEventArgs } from '../interfaces/interfaces';

interface useFormArgs {
    initialValues: Values;
		onSubmit: ( args: onEventArgs ) => void;
		onReset?: ( args: onEventArgs ) => void;
		validate: ( values: Values ) => Errors;
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

		setTouched({
			...touched,
			[e.target.name]: true
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

	useEffect(() => {
		if( isChangeValues ){
			if( validateOnChange ){
				setErrors( validate( values ));
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
    values,
		isSubmitting: submitting,
		handleReset,
		errors,
		touched,
		isValid
  }
}
