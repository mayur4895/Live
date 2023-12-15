"use client"

import { SafeListting, SafeReservation, SafeUser } from "@/app/types";
import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/usecountries";
import { useCallback, useMemo } from 'react';
import {format} from "date-fns";
import Image from "next/image";
import HeartButton from "../heartbutton";
import { Button } from "../ui/button";
import { BiRupee } from "react-icons/bi";
interface ListingCardProps{
    data:SafeListting,
    currentUser?:SafeUser | null, 
    reservation?:SafeReservation;
    onAction?:(id:string)=>void;
    actionLabel?:string;
    actionId?:string   
    disabled?:boolean

    
}


const ListingCard:React.FC<ListingCardProps> = ({
    data,
    reservation,
    actionId="",
    onAction,
    actionLabel,
    currentUser,
    disabled
})=>{
    const router = useRouter();

     const {getByValue} = useCountries();
    const location = getByValue(data.locationValue)

    const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
 e.stopPropagation();

 if(disabled){
    return;
 }

 onAction?.(actionId);  

},[disabled,onAction,actionId])

 



const price = useMemo(()=>{
    if(reservation){
        return reservation.totalPrice;
    }

    return data.price;
},[reservation, data.price])



const reservationDate = useMemo(()=>{
    if(!reservation){
        return null;
    }
const start = new Date(reservation.startDate);
const end = new Date(reservation.endDate);
 
return `${format(start, 'PP')} -  ${format(end,'PP')}`

},[reservation])




return(<>
<div  onClick={()=> router.push(`/listings/${data.id}`)} className="col-span-1 cursor-pointer group rounded-xl   p-2 shadow-md" >
  <div className="flex flex-col gap-2 w-full">
     <div className="  aspect-square w-full relative overflow-hidden shadow-md rounded-xl">
        <Image  
         fill
         alt="Listing"
         src={data.imageSrc}
          className="objext-cover h-full w-full group-hover:scale-110 transition"
        />
        <HeartButton
        currentUser={currentUser}
         listingId={data.id}  
        />
       
     </div>
     <div className="font-semibold text-neutral-700 flex flex-row gap-3 items-center">
     <img
  alt={location?.flag}
  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${location?.value}.svg`}
  
  height={20}
  width={20}
  />
       <span>   {location?.region} , {location?.label}</span>
         </div>
         <div className="text-sm font-medium text-gray-600">{reservationDate ||  data.category || "not specified"}</div>
     
                     <div className="flex flex-row gap-5">
             <div className="flex flex-row "> <BiRupee size={20}/> {price}</div>  
            
         <div>{!reservation && ( 
            <div className="text-sm">Night</div> 
         )}</div>
       </div>
             <div>{onAction  && actionLabel && (
               <Button className="w-full" disabled={disabled} onClick={handleCancel}>{actionLabel}</Button>
         )}</div>
  </div>
</div>
</>)
}

export default ListingCard;