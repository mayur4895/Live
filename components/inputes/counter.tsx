'use client'

import { useCallback } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";



interface CounterProps{
    title:string,
    subtitle:string,
    value:number,
    onChange:(value:number)=>void;
}

const Counter:React.FC<CounterProps> = ({
    title,
    subtitle,
    value ,
    onChange 
})=>{


    const onAdd = useCallback(()=>{
         onChange(value + 1)
    },[value,onChange])

    const onMinus = useCallback(()=>{
        if(value === 1){
            return
        }
        onChange(value - 1)
   },[value,onChange])


return(<>
 <div className="flex flex-col gap-4">
  <div className="flex flex-row justify-between items-center p-2">
  <div> 
    <h3 className="font-semibold">{title}</h3>
    <span className="text-sm">{subtitle}</span>
  </div>
    <div className="flex flex-row gap-4">

       <div onClick={onMinus}  className="   rounded-full  border-slate-600 border-[1px] text-neutral-800">
         <BiMinus size={25}/>
       </div>
       <div className=" text-xl  w-7 text-center text-neutral-800">
         {value}
       </div>
       <div  onClick={onAdd} className="   rounded-full  border-slate-600 border-[1px] text-neutral-800">
         <BiPlus size={25}/>
       </div>
    </div>
  </div>
 </div>
</>)
}




export default Counter;