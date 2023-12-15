'use client'

 import Calendar from "@/components/inputes/Calendar"
import { Button } from "@/components/ui/button";
 import {Range} from "react-date-range"
import { BiRupee } from "react-icons/bi";
 

interface ListingReservationprops{
    price:number;
    totalPrice:number;
    onChangeDate:(values:Range)=>void;
    dateRange:Range;
    onSubmit:()=>void;
    disabled?:boolean
    disableDates:Date[];
 
}

const ListingReservation:React.FC<ListingReservationprops> = ({
    price,
    totalPrice ,
    onChangeDate,
    dateRange,
    onSubmit,
    disabled,
    disableDates,
    
})=>{
  

 
 
 
return(<>
 <div className="grid grid-col-1 w-full">
 <div className="flex flex-row gap-2 items-center">
 <label className="flex items-center">  <BiRupee size={20}/> {price}  </label><span  className="text-xs text-slate-500">per Night</span>
  </div>
  <hr />
  <Calendar
  value={dateRange}
   disableDate={disableDates}
    onChange={(value)=>{onChangeDate(value.selection)}}
    
  />
  <hr />
  <div className="pt-4">
    <Button disabled={disabled} onClick={onSubmit} className="w-full"> Reserve</Button>
  </div>
  <hr /> 
 <div className="flex flex-row justify-between p-4 ">
  <span>TOTAL</span>
  <div className="font-semibold flex flex-row items-center text-xl"> <BiRupee size={22}/> {totalPrice}</div>
 </div>
 </div>
</>)
}



export default ListingReservation