
 
import ClientOnly from "@/components/clientonly"
import ImageUpload from "@/components/inputes/imageupload"
 import { Button } from "@/components/ui/button"
 import Container from "@/components/container"
import Empty from "@/components/emptyState"
import { getListings, IListingsParams } from './actions/getListings';
import Image from "next/image"
import ListingCard from "@/components/listing/ListingCard"
import { getCurrentUser } from "./actions/getCurrentUser"
 

 interface HomeProps{
  searchParams:IListingsParams
 }

 const Home= async( {searchParams}:HomeProps) => {

 
 const isempty =  false;
 const listings:any = await getListings(searchParams);
 const currentUser = await getCurrentUser();
  console.log( );
  

 if(listings.length === 0  || listings == null){
  return(
    <ClientOnly> 
      <Empty  
      title="Not found"
      subtitle="please click on remove filter"
      showReset/>  
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

 
export default  Home;