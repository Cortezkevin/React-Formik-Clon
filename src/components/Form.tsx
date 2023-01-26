import { useForm } from '../hooks/useForm';
import { Errors, FormHandlerArgs, Values, onEventArgs } from '../interfaces/interfaces';

interface Props {
  children: ( args: FormHandlerArgs ) => JSX.Element;
  initialValues: Values;
  onSubmit: ( args: onEventArgs ) => void;
  onReset?: ( args: onEventArgs ) => void;
  validate: ( values: Values ) => Errors;
  validateOnChange: boolean;
}

export const Form = ({ initialValues, children, onSubmit, onReset, validate, validateOnChange }: Props) => {

	const { handleSubmit, values, handleChange, isSubmitting, handleReset, errors, touched, isValid } = useForm({ initialValues, onSubmit, onReset, validate, validateOnChange });

  return (
    <div>
      {
        children({
          handleSubmit,
          isSubmitting,
          values,
          handleChange,
          handleReset,
          errors,
          touched,
          isValid
        })
      }
    </div>
  )
}
