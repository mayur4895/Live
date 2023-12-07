

"use client"
  
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
 
import { Label } from "@/components/ui/label"
 
interface Modalprops{
      isOpen?:boolean,
    // onClose:()=> void;
    // onSubmit:()=>void;
    // title?:string,
    // body?:React.ReactElement,
    // footer?:React.ReactElement,
    // actionlabeld:string,
    // disabled?:boolean,
    // secondaryAction?:()=>void
    // secondaryLabeld:string
}

// const RegisterModal:React.FC<Modalprops> = ({
//     isOpen,
     
// })=>{  

 
 
 
import { BiUser ,BiEnvelope ,BiKey, BiX } from "react-icons/bi";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { toast, useToast } from "@/components/ui/use-toast"

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { signIn } from "next-auth/react"
// import { addUser } from "@/app/helper/validate"
import { NextResponse } from "next/server";
import Error from "next/error";
import { log } from "console";
import { useCallback, useEffect, useState } from "react"
import Image from "next/image";
import axios from "axios";
import userRegisterModal from "@/app/hooks/registermodal";
import userLoginModal from "@/app/hooks/loginmodal";
 

 
export const SignupValidation = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
 
    email: z.string().email(),
    password: z.string().min(4, { message: "Password must be at least 4 characters." }),
  });

const SignupForm:React.FC<Modalprops> = ({isOpen}) => {
 
  const registerModal = userRegisterModal();
  const loginModal = userLoginModal();
 
 const [loding ,setloding] = useState(false);
  const { toast } = useToast()
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",  
      email: "", 
      password:"", 
    },
  })
 
   
 
 async function onSubmit(values: z.infer<typeof SignupValidation> ,) {  
 
  axios.post('/api/register', values).then(()=>{
    setloding(true);
    registerModal.onClose();
  }).catch((err)=>{  

        toast({
      title: "Uh oh! Something went wrong.",
      description: "Envalid Credentials",  
      
    })
 

  }).finally(()=>{
    setloding(false)
  })
   }
  
 
   const toggle = useCallback(()=>{
    registerModal.onClose();
    loginModal.onOpen();
   },[registerModal,loginModal])

   const [showmodal,setshowmodal] = useState(isOpen);
   const [open, setOpen] = useState(false);
  useEffect(()=>{
    setshowmodal(isOpen);
  },[isOpen])
 
  return (

    <Dialog open={registerModal.isOpen}   >
       
    <DialogContent className="bg-white  outline-none">

    <DialogHeader className="flex flex-row justify-between items-center">   
 <div>
 <DialogTitle className=" text-3xl -translate-y-3">Create Account.</DialogTitle> 
    <p className="text-slate-400 text-xs"> welcome Create your account with  us.</p> 
 </div>
    <DialogTrigger onClick={registerModal.onClose}  className="block outline-none bg-white z-50 translate-x-3 -translate-y-6">
     <BiX size={25}/>
      </DialogTrigger> 
   </DialogHeader>
    <Card className="border-none">
 
  <CardContent className="p-0 mt-2">
   
      
  <div className="w-full  justify-center h-auto align-middle  py-2"> 

<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-6">
<FormField
control={form.control}
name="name"

render={({ field }) => (
 <FormItem>

   <FormControl className="-mb-2"> 
   <div className="flex flex-row items-center relative">
   <BiUser className=" absolute left-0 text-gray-400"/> <input placeholder="Enter Your Name" {...field} className="  w-full outline-none  text-sm py-2 block   border-b  bg-transparent  pl-6 px-5  "  />
   </div>
     
   </FormControl> 
 
   <div className="h-2"> <FormMessage className="text-[10px] md:text-[12px]  " /></div>
 </FormItem> 
)}
/>
 
     <FormField
control={form.control}
name="email"
render={({ field }) => (
 <FormItem>

<FormControl className="-mb-2">
  
<div className="flex flex-row items-center relative">
   <BiEnvelope className=" absolute left-0 text-gray-400"/> <input placeholder="Enter Email" {...field} className="  w-full outline-none  text-sm py-2 block   border-b  bg-transparent  pl-6 px-5  "  />
   </div>
   </FormControl> 
   <div className="h-2"> <FormMessage className="text-[10px] md:text-[12px]  " /></div>
 </FormItem> 
)}
/>
<FormField
control={form.control}
name="password"
render={({ field }) => (
 <FormItem> 
 <FormControl className="-mb-2">
 <div className="flex flex-row items-center relative">
   <BiKey className=" absolute left-0 text-gray-400"/> <input type="password" placeholder="Password" {...field} className="  w-full outline-none  text-sm py-2 block   border-b  bg-transparent  pl-6 px-5  "  />
   </div>
   </FormControl> 
   <div className="h-2"> <FormMessage className="text-[10px] md:text-[12px]  " /></div>
 </FormItem> 
)}
/>
<Button    type="submit"  className="w-full text-center  text-black  bg-yellow-300 hover:bg-yellow-500">{  loding ?  ( <div className="flex items-center gap-3">Loding...</div>)  :  'Signup' }</Button>
<Button   onClick={()=> {signIn('google')}}   className="w-full text-center hover:bg-slate-50 text-neutral-800 border bg-gray-100 flex flex-row gap-5"><Image src="/search.png" height={20} width={20} alt="google"/> {  loding ?  ( <div className="flex items-center gap-3">Loding...</div>)  :  'Continue  with Google' }</Button>
<Button    onClick={()=>{signIn('github')}}  className="w-full text-center hover:bg-slate-50 text-neutral-800 border bg-gray-100  flex flex-row gap-5"><Image src="/github.png" height={20} width={20} alt="github"/> {  loding ?  ( <div className="flex items-center gap-3">Loding...</div>)  :  'Continue with GitHub' }</Button>
<p className="text-sm">Already have an Account <Link  href="/" onClick={toggle} className="text-blue-500">Signin</Link></p>
</form>
</Form>

</div>
 
  </CardContent>
</Card>

    </DialogContent>
  </Dialog>
       
  )
};
export default SignupForm;
 
