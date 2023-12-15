'use client'

import { SafeListting, SafeReservation, SafeUser } from '@/app/types';
 
 import Container from "@/components/container";
import { useCallback, useEffect, useMemo, useState } from "react";
  
 
 import { categorieslist } from "@/components/Navbar/categories";
import userLoginModal from "@/app/hooks/loginmodal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import ListingCard from '@/components/listing/ListingCard';
 
 
  



 

interface  PropertiesClientProps{
    
     listings:SafeListting[];
     currentUser?: SafeUser | null;
 }


const PropertiesClient:React.FC<PropertiesClientProps> = ({
 
    listings,
  currentUser

})=>{

const loginModal = userLoginModal();
const router = useRouter();


const [ DeletingId ,setDeletingId] = useState('');

const onCancel = useCallback((id:string)=>{
setDeletingId(id);
axios.delete(`/api/listing/${id}`)
.then(()=>{
    toast({
        title:"Deleted",
        description:"Listings Deleted"
    })
    router.refresh();
}).catch((error)=>{
    toast({
        variant:'destructive',
        title:"Something went Wrong",
        description:" Faild to Deleted"
    }) 
}).finally(()=>{
    setDeletingId('');
})
},[router])

 
     
    return(<>   
       
 <Container>
<div className='flex flex-col gap-3'>
 <h3 className='text-xl font-semibold'>Your Properties</h3>
 <p className='text-sm text-gray-500'>list your Properties here.</p>
</div>

<div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
{
listings.map((listing)=>(
    <ListingCard  
    key={listing.id}  
    data={listing}
    actionId={listing.id}
    onAction={onCancel}
    actionLabel='Delete Property'
    disabled={DeletingId === listing.id}
    currentUser={currentUser}
    />
))
}
</div>

 </Container> 
   
    </>)
}


export default  PropertiesClient;