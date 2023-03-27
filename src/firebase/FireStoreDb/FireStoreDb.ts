import { addDoc, collection, CollectionReference, doc, DocumentData, DocumentReference, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { IAllUserData } from '../../pages/DeparmentWisePage/LIibrary/LibraryComponent';
import { thumbnailType } from '../../pages/DocumentsThumbnail';
import { formDetailsType, IUploadedCertificate } from '../../pages/UploadCertificate/UploadCertificate';
import { firestoredb } from '../firebase-config';


export class FireStoreDb {
    private collectionName: string;
    private collectionRef: CollectionReference<DocumentData>;
    constructor(collectionName: string) {
        this.collectionName = collectionName;
        this.collectionRef = collection(firestoredb, this.collectionName);
    }
    async uploadFormDetails(uploadCert: IUploadedCertificate) {
        try {
            const userDocRef = doc(this.collectionRef, uploadCert.regdNumber);
            await setDoc(userDocRef, uploadCert);
        } catch (error) {
            console.log("Error while uploading details", error);
            throw error;
        }
    }
    getUserDocRef(userId: string): DocumentReference<DocumentData> {
        return doc(this.collectionRef, userId);
    }
    async readUploadedCertificateData(regdNumber: string): Promise<IUploadedCertificate> {
        const userDocRef = this.getUserDocRef(regdNumber);
        const snapshot = await getDoc(userDocRef);
        return snapshot.data() as IUploadedCertificate;
    }
    async uploadCertificateThubmbnail(thumbnail: thumbnailType) {
        try {
            await addDoc(this.collectionRef, thumbnail);
        } catch (error) {
            console.log("Error while uploading details", error);
            throw error;
        }
    }

    async readAllUserDetails(): Promise<IAllUserData[]> {
        const snapshot = await getDocs(this.collectionRef);
        const documents = snapshot.docs.map(doc => {
            return doc.data() as IAllUserData;
        })
        return documents;
    }
    async updateField(userEmail: string, fieldName: string, fieldValue: any) {
        try {
            const docRef = doc(this.collectionRef, userEmail);
            await updateDoc(docRef, { [fieldName]: fieldValue });
            console.log(`Successfully updated field '${fieldName}' in document '${userEmail}'`);
        } catch (error) {
            console.error(`Error updating field '${fieldName}' in document '${userEmail}': `, error);
        }
    }

    



}