import { ReactElement, useContext } from "react"
import { FormContext } from "./Formik"

export interface Props {
    children: ReactElement | ReactElement[]
}

export const Form = ({ children }: Props) => {

	const { handleSubmit } = useContext( FormContext );

  return (
    <form onSubmit={ handleSubmit }>
      { children }
    </form>
  )
}
