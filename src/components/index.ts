import { FormikHOCProps } from '../interfaces/interfaces'
import { Form } from './Form';
import { FormField } from './FormField';
import { FormErrorMessage } from './FormErrorMessage';
import { Formik as FormkHOC } from './Formik'

export { Form } from './Form';
export { FormErrorMessage } from './FormErrorMessage';
export { FormField } from './FormField';

export const Formik: FormikHOCProps = Object.assign( FormkHOC, {
    Form,
    Field: FormField,
    ErrorMessage: FormErrorMessage,
});

export default Formik;