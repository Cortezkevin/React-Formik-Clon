import { useState, FormEvent, ChangeEvent } from 'react';
import { onEventArgs } from '../interfaces/interfaces';

interface useFormArgs {
    initialValues: { [ key: string ]: string };
		onSubmit: ( args: onEventArgs ) => void;
		onReset?: ( args: onEventArgs ) => void;
}

export const useForm = ( { initialValues, onSubmit, onReset }: useFormArgs ) => {

  const [values, setValues] = useState( initialValues );
	const [submitting, setSubmitting] = useState(false);

	const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		})
	}

	const resetForm = () => {
		setValues( initialValues );
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

  return {
    handleSubmit,
    handleChange,
    values,
		isSubmitting: submitting,
		handleReset
  }
}
