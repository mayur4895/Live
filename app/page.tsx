
 
import ClientOnly from "@/components/clientonly"
import ImageUpload from "@/components/inputes/imageupload"
 import { Button } from "@/components/ui/button"
 import Container from "@/components/container"
import Empty from "@/components/emptyState"
import { getListings } from "./actions/getListings"
import Image from "next/image"
import ListingCard from "@/components/listing/ListingCard"
import { getCurrentUser } from "./actions/getCurrentUser"
 
export default async function Home() {

 
 const isempty =  false;
 const listings:any = await getListings();
 const currentUser = await getCurrentUser();
  console.log( );
  

 if(listings.length === 0  || listings == null){
  return(
    <ClientOnly> 
      <Empty showReset/>  
    </ClientOnly>
  )
 }
  
  return (
    <>
 <ClientOnly>
  <Container>
<div 
className="pt-[8rem] grid grid-cols-2 
md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
2xl:grid-cols-6 gap-8">
  {listings.map((listing:any)=>{
    return(  
      <ListingCard 
      key={listing.id}
       data={listing}
       currentUser={currentUser}
      />  
     )
  })}
</div>
  </Container>
 </ClientOnly>
      
    </>
  )
}

 
