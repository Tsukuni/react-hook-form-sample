import React, { FC } from 'react';
import { useForm, useFieldArray, ErrorMessage } from 'react-hook-form';
import './App.css';

interface State {
  name: string;
  email: string;
  age: number | null;
  hobbies: Array<{ name: string }>
}

const App: FC<{}> = () => {
  const defaultValues: State = {
    name: '',
    email: '',
    age: null,
    hobbies: [{ name: '' }]
  }

  const { register, handleSubmit, reset, control, errors } = useForm({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'hobbies',
  })

  const onSubmit = (data: State) => {
    alert(JSON.stringify(data));
  }

  return (
    <>
      <h1>React Hook Form Sample</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">名前</label>
          <input name="name" ref={register} />
        </div>

        <div>
          <label htmlFor="email">メアド</label>
          <input name="email" ref={register({ required: "This is required" })} />
          <ErrorMessage errors={errors} name="email" as="p"/>
        </div>

        <div>
          <label htmlFor="年齢">年齢</label>
          <input name="age" type="number" ref={register} />
        </div>

        <ul>
          <label>趣味</label>
          {fields.map((hobby, index) => (
              <li key={hobby.id}>

                <input name={`hobbies[${index}].name`} ref={register({ required: "This is required" })} />
                <button onClick={() => remove(index)}>削除</button>
                <ErrorMessage errors={errors} name={`hobbies[${index}].name`} as="p" />
              </li>
            ))
          }
        </ul>
        <button onClick={append}>追加</button>
        
        <div className="box">
          <button type="submit">送信</button>
          <button onClick={() => reset()}>リセット</button>
        </div>
      </form>
    </>
  );
}

export default App;
