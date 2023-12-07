'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";
import { BiRupee } from "react-icons/bi";


interface InputProps{
    id:string,
    icon:IconType
    label:string;
    type?:string;
    disable?:boolean;
    formatPrice?:boolean;
    required?:boolean;
    register:UseFormRegister<FieldValues>,
    errors:FieldErrors;
}


const Input:React.FC<InputProps> = ({

    id,
    label,
    icon:Icon,
    type="text",
    disable,
    formatPrice,
    required,
    register,
    errors
})=>{
    return(<>
    <div className="w-full relative flex ">
 
                <Icon className=" absolute text-gray-500 top-8 left-2"/>
    
             <input 
             type={type}
             required
             id="description"
             disabled={disable}
             {...register(id,{required})}
              placeholder={label}
              className={`${errors[id] ? 'border-rose-400  ':'  border-gray-400'} 
              ${errors[id] ? 'focus:border-rose-400  ':'  border-gray-400'}
              mt-5 pl-8 p-2 w-full border-[2px] rounded-sm`}
              /> 
        
    </div>
    </>)
}


export default Input;