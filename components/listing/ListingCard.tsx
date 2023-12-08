"use client"

import { SafeUser } from "@/app/types";
import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/usecountries";
import { useCallback, useMemo } from 'react';
import {format} from "date-fns";
import Image from "next/image";
interface ListingCardProps{
    data:Listing,
    currentUser:SafeUser | null, 
    reservation?:Reservation;
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
},[reservation,data.price])



const reservationDate = useMemo(()=>{
    if(!reservation){
        return null;
    }
const start = new Date(reservation.startDate);
const end = new Date(reservation.endDate);
 
return `${format(start, 'PP')} -  ${format(end,'PP')}`

},[reservation])




return(<>
<div  onClick={()=> router.push(`/listing/${data.id}`)} className="col-span-1 cursor-pointer group" >
  <div className="flex flex-col gap-2 w-full">
     <div className=" aspect-square w-full relative overflow-hidden rounded-xl">
        <Image  
         fill
         alt="Listing"
         src={data.imageSrc}
          className="objext-cover h-full w-full group-hover:scale-110 transition"
        />
     </div>
  </div>
</div>
</>)
}

export default ListingCard;