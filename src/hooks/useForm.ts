import { FormResponseError } from '@/utils/ResponseError';
import { useState } from 'react';

type FormError = Record<string, string>;

export const useForm = <T>(submitAction: React.FormEventHandler<HTMLFormElement & T>) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormError>({});
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleFormSubmit: typeof submitAction = async (e) => {
    setLoading(true);
    try {
      await submitAction(e);
      setSuccess(true);
    } catch (error: any) {
      const errors = (error as FormResponseError).errors;
      setErrors(errors ? parseErrorResponse(errors) : {});
      setSuccess(errors ? null : false);
    }
    setLoading(false);
  };

  return { isLoading, errors, success, handleFormSubmit };
};

const parseErrorResponse = (errors: string[]) =>
  errors
    .map((errorString) => new RegExp(/"(.*)" (.*)/).exec(errorString))
    .reduce((acc, error) => (error ? Object.assign(acc, { [error[1]]: error[2] }) : acc), {});
