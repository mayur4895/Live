  import { getServerSession } from "next-auth";
 
 
  import prisma from "@/app/libs/prismadb"
  import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    try {
        const session = await getSession(); 
        
        if(!session?.user?.name){
            return null;
        }
         const currentUser = await prisma.user.findUnique({
            where:{
                name:session.user.name as string
            }
         })
            
      if(!currentUser){
        return null;
      }

      
      
  

      return{
        ...currentUser,
         createdAt : currentUser.createdAt.toISOString(),
         updatedAt : currentUser.updatedAt.toISOString(),
         emailVerified :currentUser.emailVerified?.toISOString() || null
      }

    

    } catch (error) {
        return  error;
    }
}


 

