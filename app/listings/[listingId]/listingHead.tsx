'use client'

import useCountries from "@/app/hooks/usecountries";
import { SafeUser } from "@/app/types";
import HeartButton from "@/components/heartbutton";
import Image from "next/image";


interface ListingHeadprops{
title:string;
locationValue:string;
id:string;
imageSrc:string;
currentUser?:SafeUser | null
}

const ListingHead:React.FC<ListingHeadprops> = ({
    title,
    locationValue,
    id,
    imageSrc,
    currentUser
})=>{

const { getByValue} =  useCountries();
const location = getByValue(locationValue);

return(<>
 
<div className="flex-col flex">
   <h3 className="font-semibold text-2xl">{title}</h3>  
   <span className="text-sm">{location?.region}, {location?.label}</span>
</div>
<div className="rounded-xl w-full h-[60vh] relative overflow-hidden shadow-md">
<Image
fill
src={imageSrc}
alt={title} 
/>
<div className=" absolute top-5 right-5">
    <HeartButton 
     listingId={id}
     currentUser={currentUser}
    />
</div>
</div>
</>)
}



export default ListingHead