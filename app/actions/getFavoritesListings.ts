 
 
 
 
import prisma from "@/app/libs/prismadb"
import { getCurrentUser } from '@/app/actions/getCurrentUser';
 

 
export async function getFavoritesListings() {

  try {
 const currentUser = await getCurrentUser();
 if(!currentUser){
    return [];
    
 }  
 
 
 
      
       
       const favoriteslistings = await prisma.listing.findMany({
      where:{
        id:{
              in:[...(currentUser).favoriteIds || []]
        }
      }
       });
           
     
const safeFavorites = favoriteslistings.map((favorite)=>({
  ...favorite,
  createdAt:favorite.createdAt.toISOString(),
}))
   

  return safeFavorites

  } catch (error:any) {
        throw new Error(error)
  }
}




