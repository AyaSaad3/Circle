import { Alert, Button, Input } from '@heroui/react'
import { useContext, useState } from 'react';
import { EyeSlashFilledIcon } from '../Components/password/EyeSlashFilledIcon'
import { EyeFilledIcon } from '../Components/password/EyeFilledIcon'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from '../Helper/loginSchema';
import { Link } from 'react-router-dom';
import { authContext } from '../contexts/authContext';
import { apiServices } from '../Services/Api';

export default function SignIn() {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { setUserToken } = useContext(authContext);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "aya30@gmail.com",
      password: "Aya123456!",
    }

  })

  async function signIn(loginData) {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const data = await apiServices.signIn(loginData);
      localStorage.token = data.data.token;
      setUserToken(data.data.token);
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.errors);
      } else {
        setErrorMsg(error.message);
      }

    } finally {
      setIsLoading(false);
    }
  }

  function getInputProps(label, type, field) {
    return {
      label,
      type,
      isInvalid: !!field,
      errorMessage: field?.message,
    }
  }

  function styleInput() {
    return {
      inputWrapper: "bg-purple-50 border-1 border-purple-200 rounded-xl data-[hover=true]:bg-purple-100 focus:outline-none focus-within:border-purple-500 focus-within:bg-purple-50",
      input: "!text-text-dark",
      label: "!text-text-dark",
    }
  }

  return (
    <form onSubmit={handleSubmit(signIn)}>
      <div className='grid gap-4'>
        <div className='grid gap-3 text-center'>
          <h1 className='text-3xl text-text-dark'>Welcom Back</h1>
          <p className='text-text-light'>Sign in to your account</p>
        </div>
        <Input classNames={styleInput()} {...register("email")} {...getInputProps("Email", "email", errors.email)} />

        <Input classNames={styleInput()} {...register("password")} {...getInputProps("Password", isVisible ? "text" : "password", errors.password)}
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-solid outline-transparent"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          } />

        <Button isLoading={isLoading} type='submit' className="bg-linear-to-l from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">Sign In</Button>
        <p className="text-text-light">You don't have an account? <Link to="/signup" className="text-purple-600 hover:text-text-dark">Create one now</Link></p>
        {errorMsg && <Alert hideIcon color='danger' title={errorMsg} variant='faded' classNames={{ base: "py-0 capitalize text-center" }} />}
      </div>
    </form>
  )
}
