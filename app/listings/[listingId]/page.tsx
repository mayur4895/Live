 
import  getCurrentUser  from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import ClientOnly from "@/components/clientonly";
import Empty from "@/components/emptyState";
import ListingClient from "./ListingClient";
import { Reservation } from '@prisma/client';
 import getReservation from "@/app/actions/getReservations";


 interface IParams{
    listingId?:string
 }

 
 
const ListingPage = async({params}:{params:IParams}) =>{
    const listing = await getListingById(params);
    const reservations = await getReservation(params);
    const currentUser = await  getCurrentUser();

    if(!listing){
        return(
            <ClientOnly>
                <Empty 
                  title="Not Found you search"
                  subtitle="try changing filters or remove it"
                />
            </ClientOnly>
        )
     }

    return(<>
 <ClientOnly>
    <ListingClient
 
    listing={listing}
    reservations={reservations}
     currentUser={currentUser}
    />
 </ClientOnly>
    </>)
}

export default ListingPage;