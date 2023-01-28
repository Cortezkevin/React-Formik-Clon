import { useContext } from "react"
import { FormContext } from "./Formik";

export interface Props {
	name: string;
  placeholder?: string;
  type?: string;
}

export const FormField = ({ name, placeholder, type = 'text' }: Props) => {

	const { getFieldProps } = useContext( FormContext );

  return (
    <input placeholder={ placeholder } type={ type } { ...getFieldProps(name) } />
  )
}
