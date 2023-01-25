import { Form } from "./components/Form";

function App() {
  return (
    <div>
      <Form
        initialValues={{ username: '', password: '' }}
        onSubmit={({ values, helpers: { resetForm, setSubmitting } }) => {
          setTimeout(() =>{

          }, 1000);                    
        }}
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
              <button type="submit">Test Submit</button>
              <button type="button" onClick={() => handleReset() }>Reset</button>
              <code>
                { JSON.stringify( values )}
              </code>
            </form>          
          )
        }
      </Form>
    </div>
  );
}

export default App;
