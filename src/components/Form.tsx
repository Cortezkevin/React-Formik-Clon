import { useForm } from '../hooks/useForm';
import { FormHandlerArgs, onEventArgs } from '../interfaces/interfaces';

interface Props {
    children: ( args: FormHandlerArgs ) => JSX.Element;
    initialValues: { [ key: string ]: string };
    onSubmit: ( args: onEventArgs ) => void;
		onReset?: ( args: onEventArgs ) => void;
}

export const Form = ({ initialValues, children, onSubmit, onReset }: Props) => {

	const { handleSubmit, values, handleChange, isSubmitting, handleReset } = useForm({ initialValues, onSubmit, onReset });

  return (
    <div>
        {
					children({
						handleSubmit,
						isSubmitting,
						values,
						handleChange,
						handleReset
					})
        }
    </div>
  )
}
