 

 
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import ClientOnly from "@/components/clientonly";
import Empty from "@/components/emptyState";
 
 import getReservation from "@/app/actions/getReservations";
import TripsClient from "./TripsClient";


 
  

 
 
const  TripsPage = async( ) =>{
 
   
    const currentUser = await  getCurrentUser();

    if(!currentUser){
        return(
            <ClientOnly>
                <Empty title="Unauthorized" subtitle="Pleae login"/>
            </ClientOnly>
        )
     }

     const reservations = await getReservation({
        userId:currentUser.id
    });

   if(reservations.length === 0){
  return(
    <ClientOnly>
    <Empty title={"No Trips Found"} subtitle={"You are not reserve any trips"}/>
  </ClientOnly>
  )
   }
    return(<>
 <ClientOnly>
    <TripsClient   
    reservations={reservations}
      currentUser={currentUser}
    />
 </ClientOnly>
    </>)
}

export default TripsPage;