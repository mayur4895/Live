 'use client'

import { HiMagnifyingGlass } from "react-icons/hi2";
 import { useSearchParams } from "next/navigation";
import userSearchModal from "@/app/hooks/useSearchModal";
import useCountries from "@/app/hooks/usecountries";
import { useMemo } from "react";
import { differenceInBusinessDays } from "date-fns";
 
const Search=()=>{
const  SearchModal = userSearchModal();
const params = useSearchParams();
const {getByValue} = useCountries();

const locationValue = params?.get('location');
const startDate = params?.get('startDate');
const endDate = params?.get('endDate');
const guestCount = params?.get('GuestCount');

const locationLabel =  useMemo(()=>{
if(locationValue){
   return getByValue(locationValue as string)?.label;
}

return 'Anywhere';  

},[getByValue,locationValue])


const durationLabel =  useMemo(()=>{
   if(startDate && endDate){
       const start = new Date(startDate as string);
       const end = new Date(endDate as string);
       let diff = differenceInBusinessDays(end,start);
 
   
  if(diff ===0){
diff =1;
  }

  return `${diff} Days`;
}

return 'Any Week'
   },[startDate,endDate])




   const guestLabel =  useMemo(()=>{
      if(guestCount){  
         return  `${guestCount} Guests`;
      }
      
      return 'Add Guests';  
      
      },[guestCount])
      

console.log(locationLabel);
console.log(guestLabel);


   return(<>
      <div onClick={SearchModal.onOpen} className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer">
                

                <div className="flex flex-row justify-between items-center">
<div className="text-xs font-semibold px-6"> {locationLabel}</div>
<div className=" hidden sm:block text-xs font-semibold px-6">{durationLabel}</div>

 <div className="flex flex-row justify-center items-center gap-3 pl-6 pr-2 ">
 <div className=" hidden sm:block text-xs font-semibold px-6 text-gray-500"> {guestLabel}</div>
 <div className="p-1 bg-yellow-400 rounded-full">
 <HiMagnifyingGlass/>

    </div>
     </div>
    </div>
      </div>
    
    
    </>)
}


export default Search;