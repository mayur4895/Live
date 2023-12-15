 
 
 
 
import prisma from "@/app/libs/prismadb"
import getReservation from "./getReservations";
 
export interface IListingsParams{
  userId?:string;
  guestCount?:number;
  roomCount?:number;
  BathRoomCount?:number;
  startDate?:string;
  locationValue?:string;
  endDate?:string;
  category?:string;
  

} 

 
export async function getListings(
  params:IListingsParams
) {


  
  try {
      const {
        userId ,
      roomCount,
      guestCount,
      bathRoomCount,
      locationValue,
      startDate,
      endDate,
      category,  
      } = params;
       

      let query :any = {};

      if(userId){
        query.userId = userId;
      }

      
      if(roomCount){
        query.RoomCount = { gte: +roomCount}; 
      }
       

      
      if(guestCount){
        query.guestCount = { gte: +guestCount}; 
      }
       

      
      if(bathRoomCount){
        query.bathRoomCount = { gte: +bathRoomCount};
      }

      if(locationValue){
        query.locationValue = locationValue;
      }

      if(startDate && endDate){
        query.NOT = {
          reservations:{
             some:{
              OR:[
                {
                  endDate:{gte:  startDate},
                  startDate:{lte: startDate},
                },
                {
                  startDate:{gte: endDate},
                  endDate:{lte: endDate},
                }
              ]
             }
          }
        }
      }

      

      if(category){
         query.category = category;
      }
       
       const listings = await prisma.listing.findMany({
        where:query,
         orderBy:{
            createdAt:"desc"
         }
       });
           
     
const safeListings = listings.map((listing)=>({
  ...listing,
  createdAt:listing.createdAt.toISOString(),
}))
   

  return safeListings

  } catch (error:any) {
        throw new Error(error)
  }
}




