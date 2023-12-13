'use client'

import { SafeListting, SafeUser } from "@/app/types"
import { Reservation } from "@prisma/client"
import ListingHead from "./listingHead";
 import Container from "@/components/container";
import { useCallback, useEffect, useMemo, useState } from "react";
  
import ListingInfo from "./ListingInfo";
import ListingCategory from "./ListingCategory";
import { categorieslist } from "@/components/Navbar/categories";
import userLoginModal from "@/app/hooks/loginmodal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import ListingReservation from "./ListingReservation";
import { DateRange } from "react-date-range";
  



const intialDateRange ={
    startDate:new Date(),
    endDate:new Date(),
    key:'selection'

}

interface  ListingClientProps{
    reservations?:Reservation[];
    listing:SafeListting&{
        user:SafeUser
    }
    currentUser?:SafeUser | null;
 }


const ListingClient:React.FC<ListingClientProps> = ({
    listing,
    currentUser,
    reservations=[],

})=>{

const loginModal = userLoginModal();
const router = useRouter();


const disableDates = useMemo(()=>{
let dates: Date[] =[];

reservations.forEach((reservation:any)=>{
const range = eachDayOfInterval({
    start:new Date(reservation.startDate),
    end:new Date(reservation.endDate)
})
dates = [...dates,...range]
})
return dates;
},[reservations])


const [Loding ,setLoding] = useState(false);
const [totalPrice ,settotalPrice] = useState(listing.price);
const [dateRange ,setdateRange] = useState(intialDateRange);


const  onCreateReservation = useCallback(()=> {
  if(!currentUser){
    return loginModal.onOpen();
  }
  setLoding(true);

  axios.post('/api/reservations',{
    totalPrice,
    startDate:dateRange.startDate,
    endDate:dateRange.endDate,
    listingId:listing?.id
  }).then(()=>{
    toast({ 
        title:"Reseervation Done",
        description:"reservation successufly"
    })
  }).catch(()=>{
    toast({
        variant:'destructive',
        title:"Something went Wrong!",
        description:"reservation faild"
    })
  }).finally(()=>{
    setLoding(false);
  })

  
   },[listing]);
       
    
useEffect(()=>{
if(dateRange.startDate && dateRange.endDate){
    const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
    );

    if(dayCount && listing.price){
        settotalPrice(dayCount * listing.price);
    }else{
        settotalPrice(listing.price);
    }
}
},[dateRange,listing.price])


 const category = useMemo(()=> {
  return categorieslist.find((item)=>
  item.label === listing.category);
 },[listing]);
     
    return(<>   
       
 <Container>
<div className="max-w-screen-lg mx-auto">
<div className="flex flex-col gap-5">
<ListingHead
    title={listing.title}
    imageSrc={listing.imageSrc}
    locationValue={listing.locationValue}
    id={listing.id}
    currentUser={currentUser}   
 
      />
      <div className=" grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">

    
      <ListingInfo
      user={listing.user}
      description={listing.description}
      category={category}
      roomcount={listing.roomCount}
      guestcount={listing.guestCount}
      bathroomcount={listing.bathroomCount} 
      locationValue={listing.locationValue}  
  
 
      />

<div className="order-first mb-10 md:order-last md:col-span-3">
 <ListingReservation 
  price={listing.price}
  totalPrice={totalPrice}
  onChangeDate={(value)=>setdateRange(value)} 
  onSubmit={onCreateReservation}
  disabled={Loding}
  disableDates={disableDates}
  dateRange={dateRange}
 />
      </div>
   </div>
 
   
 
</div>
</div>

 </Container>
   
    </>)
}


export default ListingClient;