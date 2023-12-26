import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"
import { v4 } from 'uuid'

const uploadImage = (image, folder) => {
    return new Promise((resolve, reject) => {
        const imageRef = ref(storage, `${folder}/${image.name + v4()}`)
        uploadBytes(imageRef, image).then((response) => {
            getDownloadURL(response.ref).then((response) => {
                resolve(response)
            })
        })
    })

}

export default uploadImage