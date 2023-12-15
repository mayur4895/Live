'use client'

import {  SafeListing, SafeUser } from '@/app/types';
 
 import Container from "@/components/container";
 
    
import ListingCard from '@/components/listing/ListingCard';
 
  
 

interface  FavoriteslientProps{
    
     listings:SafeListing[];
     currentUser?: SafeUser | null,   
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
    
    currentUser={currentUser}
            key={listing.id}
            data={listing}
    
    />
 ))
}
</div>

 </Container> 
   
    </>)
}


export default  Favoriteslient;