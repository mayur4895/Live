'use client'

import useFavorite from "@/app/hooks/useFavorites";
import { SafeUser } from "@/app/types";
import {  AiOutlineHeart , AiFillHeart } from "react-icons/ai";

interface HeartbtnProps{
    listingId:string;
    currentUser?: SafeUser | null ;
}

const HeartButton:React.FC<HeartbtnProps> = ({
    listingId,
    currentUser
})=>{

 
    
    const {hasFavorited,toggleFavorite} = useFavorite({listingId,currentUser});
    
return(<>
<div onClick={toggleFavorite} 
className="relative  hover:opacity-75 transition cursor-pointer">
 
 <AiOutlineHeart 
size={29}
className=" z-10 absolute top-2 right-2  fill-white" 
/> 
 
<AiFillHeart 
size={24}
className={ hasFavorited ? " absolute  top-[10px] right-[11px]     fill-rose-500  backdrop:shadow-lg": ' absolute  top-[10px] right-[11px]   fill-gray-500/70  backdrop:shadow-lg'}
/> 
 </div>
 
 
</>)
}




export default HeartButton;