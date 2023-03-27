import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase-config';

export class FirebaseStorage {
    private reference: string;
    constructor(reference: string) {
        this.reference = reference;
    }

    async storeImageGetUrl(fileName: string, fileObject: File | null, fileMeta: { contentType: string }): Promise<string> {
        if (!fileObject) {
            throw new Error("File object cannot be null.");
        }
        try {
            // Upload file to Firebase Storage
            const fileStorageRef = ref(storage, `${this.reference}/${fileName}`);
            const snapshot = await uploadBytes(fileStorageRef, fileObject as File, fileMeta);
            // Get download URL of uploaded file
            const downloadUrl = await getDownloadURL(snapshot.ref);
            return downloadUrl;
        } catch (error) {
            console.log("Error storing image:", error)
            throw error;
        }
    }

    async storeFileGetUrl(fileName: string, fileObject: File | null, fileMeta: { contentType: string }): Promise<string> {
        if (!fileObject) {
            throw new Error("File object cannot be null.");
        }
        try {
            // Upload file to Firebase Storage
            const fileStorageRef = ref(storage, `${this.reference}/${fileName}`);
            const snapshot = await uploadBytes(fileStorageRef, fileObject as File, fileMeta);
            // Get download URL of uploaded file
            const downloadUrl = await getDownloadURL(snapshot.ref);
            return downloadUrl;
        } catch (error) {
            console.log("Error storing image:", error)
            throw error;
        }
    }
}