import Formik from "../components";
import { Errors, Values } from "../interfaces/interfaces";

const validate = (values: Values) => {
	const errors: Errors = {};
	
	if (!values.username) {
		errors.username = 'Required';
	} else if (values.username.length > 15) {
		errors.username = 'Must be 15 characters or less';
	}
	
	if (!values.email) {
		errors.email = 'Required';
	} else if (values.email.length > 20) {
		errors.email = 'Must be 20 characters or less';
	}

	return errors;
};

export const ExampleWithComponents = () => {
  return (
    <Formik 
        initialValues={{ username: '', email: '' }}
        onSubmit={({ values }) => console.log( values )}
        validate={ validate }
    >
        {({ isValid }) => 
            <Formik.Form>
                <Formik.Field name="username" placeholder="Username"/>
                <Formik.ErrorMessage name="username" />
                <Formik.Field name="email" placeholder="Email"/>
                <Formik.ErrorMessage name="email" />
                <button disabled={ !isValid } type="submit">Send</button>
            </Formik.Form>
        }
    </Formik>
  )
}
