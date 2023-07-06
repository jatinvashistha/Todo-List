import React from 'react'
import Modal from './Modal'
import { ErrorMessage, Field, Form, Formik, connect } from 'formik'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { toast } from 'react-toastify'
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
    name:Yup.string().required("Name is Required"),
    email:Yup.string().email("Invalid Email").required("Email is Required"),
})


const AddAndUpdateContact = ({isOpen,onClose,isUpdate,contact}) => {

const addContact =async (connect) =>{
    try {
        const contactRef = collection(db,"contacts");
        await addDoc(contactRef,connect);
        onClose();
        toast.success("Contact Added Successfully")
    } catch (error) {
        console.log(error);
    }
};
const updateContact =async (connect, id) =>{
    try {
        const contactRef = doc(db,"contacts",id);
        await updateDoc(contactRef,connect);
        onClose();
        toast.success(" Contact Updated Successfully")
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div>
         <Modal isOpen={isOpen}
   onClose={onClose}
   >
    <Formik
    validationSchema={contactSchemaValidation}
    initialValues={isUpdate ? {
        name:contact.name,
        email:contact.email,
    }:{
        name:"",
        email:"",
    }}
    onSubmit={(values)=>{
        console.log(values);
        isUpdate ?
        updateContact(values,contact.id) : 
        addContact(values);
    }}
    >
        <Form className='flex flex-col gap-2'>
         <div className="flex flex-col gap-1">
         <label htmlFor="name">
            Name
        </label>
            <Field name="name" className=" border p-2 h-10"/>
            <div className="text-red-500 text-xs">
                <ErrorMessage name="name" />
            </div>
         </div>
         <div className="flex flex-col gap-1">
         <label htmlFor="email">
            Email
        </label>
            <Field  name="email" className=" border h-10 p-2"/>
            <div className="text-red-500 text-xs">
                <ErrorMessage name="email" />
            </div>
         </div>

          <button className=' self-end border bg-orange px-3 py-1.5'>{isUpdate ? "Update" : "Add" } Contact</button>

        </Form>
    </Formik>
   </Modal>
    </div>
  )
}

export default AddAndUpdateContact