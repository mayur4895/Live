 
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import ClientOnly from "@/components/clientonly";
import Empty from "@/components/emptyState";
import ListingClient from "./ListingClient";
import { Reservation } from '@prisma/client';


 interface IParams{
    listingId?:string
 }

 
 
const ListingPage = async({params}:{params:IParams}) =>{
    const listing = await getListingById(params);
    const currentUser = await  getCurrentUser();

    if(!listing){
        return(
            <ClientOnly>
                <Empty/>
            </ClientOnly>
        )
     }

    return(<>
 <ClientOnly>
    <ListingClient
 
    listing={listing}
     currentUser={currentUser}
    />
 </ClientOnly>
    </>)
}

export default ListingPage;