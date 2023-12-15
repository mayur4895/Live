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
 
 
  



 

interface  TripsClientProps{
    
    reservations:SafeReservation[];
     currentUser?: SafeUser | null;
 }


const TripsClient:React.FC<TripsClientProps> = ({
 
  reservations,
  currentUser

})=>{

const loginModal = userLoginModal();
const router = useRouter();


const [ DeletingId ,setDeletingId] = useState('');

const onCancel = useCallback((id:string)=>{
setDeletingId(id);
axios.delete(`/api/reservation/${id}`)
.then(()=>{
    toast({
        title:"Cancelled",
        description:"Reservation Cancelled"
    })
    router.refresh();
}).catch((error)=>{
    toast({
        variant:'destructive',
        title:"Something went Wrong",
        description:" Faild to Cancelled"
    }) 
}).finally(()=>{
    setDeletingId('');
})
},[router])

 
     
    return(<>   
       
 <Container>
<div className='flex flex-col gap-3'>
 <h3 className='text-xl font-semibold'>Your trips</h3>
 <p className='text-sm text-gray-500'>Enjoy your trips with live.</p>
</div>

<div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
{
reservations.map((reservation)=>(
    <ListingCard  
    key={reservation.id}
    reservation={reservation}
    data={reservation.listing}
    actionId={reservation.id}
    onAction={onCancel}
    actionLabel='Cancel Reservation'
    disabled={DeletingId === reservation.id}
    currentUser={currentUser}
    />
))
}
</div>

 </Container> 
   
    </>)
}


export default  TripsClient;