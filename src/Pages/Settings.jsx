import { addToast, Alert, Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../Helper/changePasswordSchema";
import { useContext, useState } from "react";
import { apiServices } from "../Services/Api";
import { authContext } from "../contexts/authContext";

export default function Settings() {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setUserToken } = useContext(authContext);

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(schema)})

  async function setting(passwordData) {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const data = await apiServices.changePassword(passwordData);      
      localStorage.token = data.data.token;
      setUserToken(data.data.token);
      addToast({
        title: "Success",
        description: "Change Password successfully",
        color: "success",
      })
    } catch (error) {            
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
    <div className="mx-auto max-w-2xl pt-20">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-active">
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key-round" aria-hidden="true">
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
            </svg>
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Change Password</h1>
            <p className="text-sm text-slate-500">Keep your account secure by using a strong password.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(setting)} className="space-y-4">
          <Input classNames={styleInput()} {...register("password")} {...getInputProps("Current Password", "password", errors.password)} />
          <Input classNames={styleInput()} {...register("newPassword")} {...getInputProps("New Password", "password", errors.newPassword)} />
          <Button isLoading={isLoading} type='submit' className="bg-linear-to-l from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition inline-flex w-full items-center justify-center">Update password</Button>
          {errorMsg && <Alert hideIcon color='danger' title={errorMsg} variant='faded' classNames={{ base: "py-0 capitalize text-center" }} />}
        </form>
      </div>
    </div>
  )
}
