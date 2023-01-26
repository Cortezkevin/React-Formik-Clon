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
				placeholder="Enter a Username"
				type="text" 
				name="username" 
				value={ values.username }
				onChange={ handleChange }
			/>
			{errors.username && touched.username ? <small style={{ color: 'red'}}>{errors.username}</small> : null}			 
			<input 
				placeholder="Enter a Password"
				type="text" 
				name="password" 
				title="password"
				value={ values.password }
				onChange={ handleChange }
			/>
			{errors.password && touched.password ? <small style={{ color: 'red'}}>{errors.password}</small> : null}
			<button disabled={ isSubmitting || !isValid } type="submit">Test Submit</button>
			<button disabled={ isSubmitting } type="button" onClick={() => handleReset() }>Reset</button>
			<div className="state-container">
				<code>
					<span>Values: </span>				
					{ JSON.stringify( values )}
				</code>
				<code>
					<span>Errors: </span>				
					{ JSON.stringify( errors ) }
				</code>
				<code>
					<span>Fields Touched: </span>
					{ JSON.stringify(touched) }
				</code>	
			</div>		
		</form> 
  )
}
