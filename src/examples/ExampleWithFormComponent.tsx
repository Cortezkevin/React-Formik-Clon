import { Form } from "../components/Form";
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

export const ExampleWithFormComponent = () => {
  return (
    <Form
			initialValues={{ username: '', password: '' }}
			validate={ validate }
			onSubmit={({ values, helpers: { resetForm, setSubmitting } }) => {
				setTimeout(() =>{
					setSubmitting( false);
					console.log( values );
				}, 1000);                    
			}}
			validateOnChange={ true }
		>
			{
				({ handleSubmit, isSubmitting, values, handleChange, handleReset }) => (
					<form onSubmit={ handleSubmit }>
						<p>{ isSubmitting ? 'Cargando' : 'Listo' }</p>
						<input 
							type="text" 
							name="username" 
							value={ values.username }
							onChange={ handleChange }
						/>
						<input 
							type="text" 
							name="password" 
							value={ values.password }
							onChange={ handleChange }
						/>
						<button disabled={ isSubmitting } type="submit">Test Submit</button>
						<button disabled={ isSubmitting } type="button" onClick={() => handleReset() }>Reset</button>
						<code>
							{ JSON.stringify( values )}
						</code>
					</form>          
				)
			}
		</Form>
  )
}
