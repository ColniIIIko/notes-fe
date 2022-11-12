import { useForm } from '@/hooks/useForm';
import { TextField } from '@mui/material';
import React, { HTMLInputTypeAttribute } from 'react';
import Loader from './Loader';

type Field = {
  name: string;
  type: HTMLInputTypeAttribute;
  alias?: string;
};

type Props = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  fields: Field[];
};

function AuthForm({ onSubmit, fields }: Props) {
  const { isLoading, errors, success, handleFormSubmit } = useForm(onSubmit);

  return (
    <>
      {isLoading && <Loader />}
      <form
        onSubmit={handleFormSubmit}
        className='flex flex-col w-max gap-8 mx-auto pt-5'
      >
        <div className='flex flex-col gap-6'>
          {fields.map((field) => (
            <div
              key={field.name}
              className='flex flex-col gap-1'
            >
              <div className='flex justify-between items-center flex-col gap-1 sm:flex-row sm:gap-3'>
                <label
                  htmlFor={field.name}
                  className='text-lg self-start'
                >
                  {field.alias || field.name}:{' '}
                </label>
                <TextField
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  variant='standard'
                  size='small'
                  error={!!errors[field.name]}
                  className='self-start tw:z-0'
                />
              </div>
              {errors[field.name] && (
                <div className='text-xs self-end text-red-400'>{errors[field.name]}</div>
              )}
            </div>
          ))}
        </div>
        <button
          type='submit'
          className='text-xl p-1 self-end border-2 rounded-md border-slate-600 hover:text-gray-400 hover:border-gray-400 transition-all'
        >
          Submit
        </button>
        {success !== null && !success && (
          <div className='text-xs text-red-400'>
            <p>Unable to login/register user</p>
            <p>Check the correctness of the entered data</p>
          </div>
        )}
      </form>
    </>
  );
}

export default AuthForm;
