import { Formik } from "../components/Formik";
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
    <Formik
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
				({ handleSubmit, isSubmitting, values, handleBlur, handleReset, getFieldProps, errors, touched }) => (
					<form onSubmit={ handleSubmit } style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center'}}>
						<p>{ isSubmitting ? 'Cargando' : 'Listo' }</p>
						<input 
							type="text" 
							{ ...getFieldProps('username') }					
							style={{ border: '1px solid grey', borderRadius: '8px', padding: '10px 15px' }}
							placeholder="Username"
						/>
						{ errors.username && touched.username && errors.username }
						<input 
							type="text" 
							{ ...getFieldProps('password') }
							style={{ border: '1px solid grey', borderRadius: '8px', padding: '10px 15px' }}
							placeholder="Password"							
						/>
						{ errors.password && touched.password && errors.password }
						<button style={{ backgroundColor: '#454545', color: 'white', padding: '10px 15px', borderRadius: '10px'}} disabled={ isSubmitting } type="submit">Test Submit</button>
						<button style={{ backgroundColor: '#454545', color: 'white', padding: '10px 15px', borderRadius: '10px'}} disabled={ isSubmitting } type="button" onClick={() => handleReset() }>Reset</button>
						<code>
							{ JSON.stringify( values )}
						</code>
						<code>
							{ JSON.stringify( touched )}
						</code>
					</form>          
				)
			}
		</Formik>
  )
}
