'use client'

import useCountries from "@/app/hooks/usecountries";
import { SafeUser } from "@/app/types";
import { categorieslist } from "@/components/Navbar/categories";
 import HeartButton from "@/components/heartbutton";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import { useMemo } from "react";
import { IconType } from "react-icons";
import { BiUserCircle } from "react-icons/bi";
import ListingCategory from "./ListingCategory";
import { icon } from "leaflet";
import dynamic from 'next/dynamic';
 import Map from '@/components/Map';
 

interface ListingInfoprops{
 user:SafeUser | null;
 description:string;  
 bathroomcount:number;
 guestcount:number; 
roomcount:number;
category:{
  icon:IconType;
  label:string;
  description:string;
} | undefined

locationValue:string;  
 
}

const ListingInfo:React.FC<ListingInfoprops> = ({
  user,
  guestcount,
    locationValue,
    
    description,
    category,
    bathroomcount,   
   roomcount,
    
})=>{
  

const { getByValue} =  useCountries();
const  cordinates = getByValue(locationValue)?.latlng;


 
 
return(<>
 
 <div className="flex flex-col col-span-4 gap-8  w-full lg:w-[70vh]">  
<div className=" flex-row flex items-center gap-3">
    <h3 className=" text-sm ">hosted by:   {user?.name}</h3>  
    <Avatar className="h-6 w-6"> 
          <AvatarImage src={user?.image ||"/profile.png"}  className="rounded-full"/>
            <AvatarFallback>
            <BiUserCircle size={30}/> 
            </AvatarFallback>
          </Avatar> 
</div>
 
<div className="flex flex-row gap-3 text-slate-400 text-sm">
        <div className="border p-1">Rooms: {roomcount}</div>
        <div className="border p-1">Bathroom: {bathroomcount}</div>
        <div className="border p-1">Guests: {guestcount}</div>
      </div> 

      <hr />

{category && (
   <ListingCategory
   label={category.label}
   description={category.description}
   icon={category.icon}
   />
)} 
 
<div>{description}</div>
<Map center={cordinates}/>
</div>
 
 
</>)
}



export default ListingInfo