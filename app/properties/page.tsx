 

 
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import ClientOnly from "@/components/clientonly";
import Empty from "@/components/emptyState";
 
 
import { getListings } from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";
 


 
  

 
 
const  PropertiesPage = async( ) =>{
 
   
    const currentUser = await  getCurrentUser();

    if(!currentUser){
        return(
            <ClientOnly>
                <Empty title="Unauthorized" subtitle="Pleae login"/>
            </ClientOnly>
        )
     }

     const listings = await getListings({
        userId:currentUser.id
    });

   if(listings.length === 0){
  return(
    <ClientOnly>
    <Empty title={"No Properties Found"} subtitle={"You are not reserve any Properties"}/>
  </ClientOnly>
  )
   }
    return(<>
 <ClientOnly>
 <PropertiesClient
 currentUser={currentUser}
 listings={listings}
 />
 </ClientOnly>
    </>)
}

export default PropertiesPage;