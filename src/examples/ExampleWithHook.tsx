import { useForm } from "../hooks/useForm"
import { Errors, Values } from "../interfaces/interfaces";

const validate = (values: Values) => {
	const errors: Errors = {};
	if (!values.username) {
		errors.username = 'Required';
	} else if (values.username.length > 15) {
		errors.username = 'Must be 15 characters or less';
	}

	if (!values.password) {
		errors.password = 'Required';
	} else if (values.password.length > 20) {
		errors.password = 'Must be 20 characters or less';
	}

	return errors;
};

export const ExampleWithHook = () => {

	const {
		values,
		handleSubmit,
		handleChange,
		isSubmitting,
		handleReset,
		errors,
		touched,
		isValid
	} = useForm({
		initialValues: {
			username: "",
			password: ""
		},
		onSubmit: ({ values, helpers }) => {
			setTimeout(() => {
				console.log( values );
				helpers.setSubmitting( false );
			}, 500)
		},
		validate		
	});

  return (
    <form onSubmit={ handleSubmit }>
			<p>{ isSubmitting ? 'Cargando' : 'Listo' }</p>
			<input 
				type="text" 
				name="username" 
				value={ values.username }
				onChange={ handleChange }
			/>
			{errors.username && touched.username ? <div>{errors.username}</div> : null}			 
			<input 
				type="text" 
				name="password" 
				value={ values.password }
				onChange={ handleChange }
			/>
			{errors.password && touched.password ? <div>{errors.password}</div> : null}
			<button disabled={ isSubmitting || !isValid } type="submit">Test Submit</button>
			<button disabled={ isSubmitting } type="button" onClick={() => handleReset() }>Reset</button>
			<code>
				{ JSON.stringify( values )}
			</code>
			<code>
				{
					JSON.stringify( errors )
				}
			</code>
			<h4>{ JSON.stringify(touched) }</h4>
		</form> 
  )
}
