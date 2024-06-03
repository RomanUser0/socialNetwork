import {  useSelector } from "react-redux"
import { useCreatePhotoMutation, useCreatePhotosMutation } from "../store/photoQueryApi/photoQueryApi"



export function SubmitFile() {

    
    const [uploadPhoto] = useCreatePhotoMutation()
    const [uploadPhotos] = useCreatePhotosMutation()

    const { isPhoto, user, lengthFriends } = useSelector(state => state.auth)
    console.log(lengthFriends)


    const uploadFile = (quantity, refPhoto) => {
        if (quantity === 'one') {
            refPhoto.current.click()
            return
        }
        refPhoto.current.click()
    }

    const submitFile = async (event, refPhotos, quan) => {
        const formData = new FormData()
        if (quan) {
            for (let i = 0; i < event.target.files.length; i++) {
                formData.append(`files`, event.target.files[i]);
            }
            await uploadPhotos(formData)
            refPhotos.current.value = null
            return
        } else {
            formData.append(`file`, event.target.files[0]);
            await uploadPhoto(formData)
            refPhotos.current.value = null
        }




    }
    return {
        submitFile,
        uploadFile,
        isPhoto,
        user,
        lengthFriends
    }
}




