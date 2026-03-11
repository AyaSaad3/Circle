import { addToast, Alert, Button, Input, Select, SelectItem } from '@heroui/react'
import { useState } from 'react';
import { EyeSlashFilledIcon } from '../Components/password/EyeSlashFilledIcon'
import { EyeFilledIcon } from '../Components/password/EyeFilledIcon'
import { useForm } from 'react-hook-form';
// import { validation } from '../Helper/signUpFormValidation';
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from '../Helper/registerSchema';
import { Link, useNavigate } from 'react-router-dom';
import { apiServices } from '../Services/Api';

export default function SignUp() {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Aya",
      email: "aya30@gmail.com",
      password: "Aya123456!",
      rePassword: "Aya123456!",
      dateOfBirth: "2001-11-19",
      gender: "female"
    }
  })

  async function signUp(registerData) {
    setIsLoading(true);
    setErrorMsg("");
    try {
      await apiServices.signUp(registerData);
      addToast({
        title: "Success",
        description: "Account created successfully",
        color: "success",
      })
      navigate("/signin");
    }
    catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.errors);
      } else {
        setErrorMsg(error.message);
      }
    }
    finally {
      setIsLoading(false);
    }
  }

  function getInputProps(label, type, field) {
    return {
      // variant: "bordered",
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

  function styleSelect() {
    return {
      trigger: "bg-purple-50 border-2 border-purple-200 rounded-xl bg-purple-50 data-[hover=true]:bg-purple-100 focus:outline-none focus-within:border-purple-500 focus-within:bg-purple-50",
      value: "!text-text-dark",
      label: "!text-text-dark",
      popoverContent: "bg-purple-50 border-2 border-purple-200 rounded-xl shadow-xl",
      listbox: "bg-purple-50",
    }
  }

  function styleSelectItem() {
    return "text-text-dark data-[hover=true]:!text-text-dark data-[hover=true]:!bg-purple-100 data-[selected=true]:!bg-purple-200 data-[selected=true]:!text-text-dark data-[focus=true]:!bg-purple-100"
  }

  return (
    <form onSubmit={handleSubmit(signUp)}>
      <div className='grid gap-4'>
        <div className='grid gap-3 text-center'>
          <h1 className='text-3xl text-text-dark'>Join Us Today</h1>
          <p className='text-text-light'>Create your account and start connecting</p>
        </div>
        <Input classNames={styleInput()} {...register("name")} {...getInputProps("Full Name", "text", errors.name)} />

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

        <Input classNames={styleInput()} {...register("rePassword")} {...getInputProps("Confirm Password", isVisible ? "text" : "password", errors.rePassword)} />

        <Input classNames={styleInput()} {...register("dateOfBirth")} {...getInputProps("Birth Date", "date", errors.dateOfBirth)} />

        <Select classNames={styleSelect()}  {...register("gender")} {...getInputProps("Gender", errors.gender)} >
          <SelectItem className={styleSelectItem()} key="male">Male</SelectItem>
          <SelectItem className={styleSelectItem()} key="female">Female</SelectItem>
        </Select>

        <Button isLoading={isLoading} type='submit' className="bg-linear-to-l from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">Sign Up</Button>
        <p className="text-text-light">Already have an account? <Link to="/signin" className="text-purple-600 hover:text-text-dark">Sign in now</Link></p>
        {errorMsg && <Alert hideIcon color='danger' title={errorMsg} variant='faded' classNames={{ base: "py-0 capitalize text-center" }} />}
      </div>
    </form>
  )
}
