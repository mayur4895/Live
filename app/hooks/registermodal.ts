import {create} from 'zustand'
import RegisterModal from '@/components/modals/registerModal';



interface RegisterModalStore{
    isOpen:boolean,
    onOpen:()=>void;
    onClose:()=>void;
}

const userRegisterModal = create<RegisterModalStore>((set)=> ({
isOpen:false,
onOpen:()=> set({ isOpen:true }),
onClose:()=> set( {isOpen:false} )
}));
  
 
export default userRegisterModal;