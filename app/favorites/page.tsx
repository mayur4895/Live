 

 
import  getCurrentUser  from "@/app/actions/getCurrentUser";
 import ClientOnly from "@/components/clientonly";
import Empty from "@/components/emptyState"; 
import FavoritesClient from "./FavoritesClient";
import getFavoriteListings from "../actions/getFavoritesListings";
 
 


 
  

 
 
const  FavoritesPage = async() =>{
 
   
    const currentUser = await  getCurrentUser();

  
     const  listings = await   getFavoriteListings();
 
   if(listings.length === 0){
  return(
    <ClientOnly>
    <Empty title={"No Favorites  Found"} subtitle={"You are not like any trips"}/>
  </ClientOnly>
  )
   }
    return(<>
 <ClientOnly>
    <FavoritesClient   
       listings={listings}
      currentUser={currentUser}
    />
 </ClientOnly>
    </>)
}

export default FavoritesPage;