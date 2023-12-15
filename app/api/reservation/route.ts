import bcrypt from 'bcrypt';
 
import { NextResponse } from 'next/server';
import prisma from "@/app/libs/prismadb"
import getCurrentUser  from '@/app/actions/getCurrentUser';
import { create } from 'zustand';
 

export async function POST(
    request :Request
) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
     }
 
    const body = await request.json();

    const {
        totalPrice ,
        startDate ,
        endDate ,
        listingId ,  
  
    } = body;

     if(!listingId || !startDate || !endDate || !totalPrice ){
        return NextResponse.error();
     }

    const  ListingAndReservation = await prisma.listing.update({
    where:{
        id:listingId
    },
     data:{ 
          
           reservations:{
            create:{ 
                
                userId:currentUser.id,
                totalPrice ,
                startDate ,
                endDate ,   
     
            }
           }
           
        }
 
    })
    

    return NextResponse.json(ListingAndReservation);
}