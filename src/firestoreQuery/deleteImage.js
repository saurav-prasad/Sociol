import { storage } from './firebase';
import { deleteObject, ref } from 'firebase/storage';

const deleteImage = (image, folder) => {
    let imageName = image
    imageName = imageName.split('%2F')
    imageName = imageName[1].split('?alt=')
    imageName = imageName[0]

    return new Promise((resolve, reject) => {
        image = imageName
        // Create a reference to the file to delete
        const desertRef = ref(storage, `${folder}/${image}`);
        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully
            resolve(true)
        }).catch((error) => {
            // Uh-oh, an error occurred!
            reject(error)
        });
    })
}

export default deleteImage