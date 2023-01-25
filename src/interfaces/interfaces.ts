import { FormEvent, ChangeEvent } from 'react'

export interface Values<K, V> {
    key: K,
    value: V
}

interface FormHelpers {
    setSubmitting: ( arg: boolean ) => void; 
    resetForm: () => void;
}

export interface onEventArgs {
    values:  {[ key: string ]: string};
    helpers: FormHelpers;
}

export interface FormHandlerArgs {
    values: {[ key: string ]: string};
    handleSubmit: ( e: FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
    handleChange: ( e: ChangeEvent<HTMLInputElement> ) => void;
    handleReset: () => void;
}