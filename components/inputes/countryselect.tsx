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
   flag: string;
   label: string;
   latlng: number[],
   region: string;
   value: string
 }
 

 


 interface CountrySelectProps {
   value?: CountrySelectValue;
   onChange: (value: CountrySelectValue) => void;
 }
const CountrySelect:React.FC<CountrySelectProps> = ({
 value,
 onChange,
 
 
 
 
})=>{
const {getAll} = useCountries(); 
 const contries = getAll();
const [open, setOpen] =  useState(false)
const [values, setValues] =  useState("")
return(<>
  


 
 

 <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="
          flex flex-row items-center gap-3">
       
          <div>
          <img
  alt={option.label}
  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${option.value}.svg`}
  
  height={20}
  width={20}
  />
          </div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-1',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
<br />
          
</>)
}


export default  CountrySelect;