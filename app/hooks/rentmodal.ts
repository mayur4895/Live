

import {create} from 'zustand'
 import RentModal from '@/components/modals/rentModal';



interface RentModalStore{
    isOpen:boolean,
    onOpen:()=>void;
    onClose:()=>void;
}

const userRentModal = create<RentModalStore>((set)=> ({
isOpen:false,
onOpen:()=> set({ isOpen:true }),
onClose:()=> set( {isOpen:false} ),
 }));
  
 
export default userRentModal;