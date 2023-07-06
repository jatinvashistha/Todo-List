import { deleteDoc , doc } from "firebase/firestore"
import { HiOutlineUserCircle } from "react-icons/hi"
import { IoMdTrash } from "react-icons/io"
import { RiEditCircleLine } from "react-icons/ri"
import { db } from "../config/firebase"
import AddAndUpdateContact from "./AddAndUpdateContact"
import { useState } from "react"
import UseDisClouse from "../hooks/UseDisClouse"
import { toast } from "react-toastify"


const ContactCard = ({contact}) => {
    const {isOpen,onClose,onOpen} = UseDisClouse();

 

    const deleteContact = async (id) =>{
        try {
            await deleteDoc(doc(db,"contacts", id))
            toast.success("Contact Deleted Successfully")
        } catch (error) {
            console.log(error);
        }
    }



  return (
    <> 
    <div key={contact.id} 
  className=" flex justify-between bg-yellow items-center p-2 rounded-lg"
  >
            <div className="flex gap-2"> 
            <HiOutlineUserCircle className="text-4xl text-orange"/>
            <div className="">
              <h2 className=" font-medium">{contact.name}</h2>
               <p className="text-sm">{contact.email}</p>
            </div>
            </div>
            <div className="flex text-3xl">
              <RiEditCircleLine onClick={onOpen} className=" cursor-pointer"/>
              <IoMdTrash onClick={() => deleteContact(contact.id)} className=" text-orange cursor-pointer"/>
            </div>
  </div>
  <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
  </>
  );
}

export default ContactCard