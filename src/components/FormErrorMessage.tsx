import { FormContext } from "./Formik";
import { useContext } from 'react';

export interface Props {
	name: string;
}

export const FormErrorMessage = ({ name }: Props) => {  

  const { errors, touched } = useContext( FormContext );

  return (
    <p>{ errors[name] && touched[name] && errors[name]}</p>
  )
}
