import axios from "axios"

import { SafeUser } from "../types"
import useLoginModal from "./loginmodal"
import { useRouter } from "next/navigation"
import getCurrentUser  from '@/app/actions/getCurrentUser';
import { useCallback, useMemo } from "react";
import { useToast, toast } from '@/components/ui/use-toast';
import { request } from 'http';
 


interface IuseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}


const useFavorite = ({
    listingId,
    currentUser

}: IuseFavorite) => {

    
  

    const router = useRouter();
    const { toast } = useToast()
    const loginModal = useLoginModal();


    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);



    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (!currentUser) {
            loginModal.onOpen();
        }


        try {
            let request;

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            await request();
            router.refresh();  
            
            toast({
                       title: "success", 
                  })

        } catch (error) {

            toast({
          variant:'destructive',
                title: "Uh oh! Something went wrong.",
                description: "not ",


            })
        }

    }, [request,toast,router,loginModal,listingId,hasFavorited]);


return{
    hasFavorited,
    toggleFavorite
}

}
export default useFavorite
