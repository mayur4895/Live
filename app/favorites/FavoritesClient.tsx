'use client'

import { SafeListting, SafeUser } from '@/app/types';
 
 import Container from "@/components/container";
 
    
import ListingCard from '@/components/listing/ListingCard';
 
 
 
  



 

interface  FavoriteslientProps{
    
     listings:SafeListting[];
     currentUser?: SafeUser | null;
 }


const Favoriteslient:React.FC<FavoriteslientProps> = ({
 
    listings,
  currentUser 

})=>{

 
 
     
    return(<>   
       
 <Container>
<div className='flex flex-col gap-3'>
 <h3 className='text-xl font-semibold'>Your Favorites</h3>
 <p className='text-sm text-gray-500'>reserve favorites trips.</p>
</div>

<div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
{
 listings.map((listing)=>(
    <ListingCard 
    
     data={listing}
     key={listing.id}
     currentUser={currentUser}
    
    />
 ))
}
</div>

 </Container> 
   
    </>)
}


export default  Favoriteslient;