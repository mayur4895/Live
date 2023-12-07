'use client'
 
import useCountries from '@/app/hooks/usecountries';
import Image from 'next/image';
 import Select from 'react-select'
 import {StringMappingType} from 'typescript'
 import { US } from 'country-flag-icons/react/3x2'
import { colors } from 'react-select/dist/declarations/src/theme';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
 
 
  
 
import { useState } from 'react';


 export type CountrySelectValue = {
    flag:string;
    label:string;
    latlng:number[];
    region:string;
    value:string;
 }
 

 

interface CountrySelectprops{
   value?:CountrySelectValue;
   onChange:(value:CountrySelectValue)=>void; 
   register: UseFormRegister<FieldValues>;
   id: string; 
   disable:boolean;
   errors: FieldErrors;
   label:string
}

const CountrySelect:React.FC<CountrySelectprops> = ({
 value,
 onChange,
 register,
 id,
 errors,
 disable,
 label
 
 
 
})=>{
const {getAll} = useCountries(); 
 const contries = getAll();
const [open, setOpen] =  useState(false)
const [values, setValues] =  useState("")
return(<>
  




 


         <Select 
              {...register(id,{required:true})}
           className={ `${errors[id] ? 'border-red-500':'border'}  text-sm outline-none  rounded-sm z-10 mb-3  border ` } 
           placeholder="anywhere"
           isClearable
          options={getAll()}
           value={value}
           onChange={(value)=>{onChange(value as CountrySelectValue)}}
           formatOptionLabel={(option:any)=>(
      <div className='flex flex-row gap-3 items-center'>
<div>
   
<img
  alt={option.label}
  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${option.value}.svg`}
  
  height={20}
  width={20}
  />
   
</div>
<div className='flex gap-2'>
    {option.label },
    <span className='text-neutral-500'>{option.region}</span>
</div>
      </div>



           )}
           

       theme={(theme)=>({
        ...theme,
        borderRadius:6,
        border:0,
        colors:{
            ...theme.colors,
            primary:'#e1e1e1',
            
            
         
        }
       })}
         classNames={{
            control:()=>'py-1',  
         }}
         />  

          
</>)
}


export default  CountrySelect;