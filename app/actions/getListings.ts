 
import { getServerSession } from "next-auth";
 
 
import prisma from "@/app/libs/prismadb"
import { authOptions } from "@/pages/api/auth/[...nextauth]";

 
export async function getListings() {
  try {
     
      
       
       const Listings = await prisma.listing.findMany({
         orderBy:{
            createdAt:"desc"
         }
       });
           
     

    return  Listings

  

  } catch (error) {
      return  error;
  }
}




