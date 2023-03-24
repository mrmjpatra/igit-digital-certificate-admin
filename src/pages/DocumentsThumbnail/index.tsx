import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField, Typography } from '@mui/material';
import { FirebaseStorage } from '../../firebase/CloudStorage/FirebaseStorage';
import { FireStoreDb } from '../../firebase/FireStoreDb/FireStoreDb';
export type thumbnailType = {
    title: string,
    type:string,
    branch: string,
    imageUrl: string
}
const DocumentsThumbnail = () => {
    const [title, setTitle] = useState<string>('');
    const [branch, setBranch] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageDetails, setImageDetails] = useState({
        fileName: '',
        fileType: '',
        fileSize: 0
    });
    const [imageMeta, setImageMeta] = useState({
        contentType: "image/*",
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files?.[0];

        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result?.toString() ?? null);
        };

        if (selectedImage) {
            reader.readAsDataURL(selectedImage);
        } else {
            setImage(null);
        }
        if (e.target.files && e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            const fileType = e.target.files[0].type;
            const fileSize = e.target.files[0].size;
            setImageDetails({ fileName, fileSize, fileType });
            setImageMeta({
                contentType: fileType,
            });
            setSelectedFile(e.target.files[0]);
        }
    }
    const uploadPhotoGetUrl = async (): Promise<string> => {
        const userPhotoLink = new FirebaseStorage('certificatesThumbnails');
        const PhotoUrl = await userPhotoLink.storeImageGetUrl(imageDetails.fileName, selectedFile, imageMeta);
        return PhotoUrl;
    }

    const handleUpload = async () => {
        const imageUrl = await uploadPhotoGetUrl();
        const thumbnailData: thumbnailType = {
            title,
            type,
            branch,
            imageUrl
        };
        const thumbnail = new FireStoreDb('providedCertificates');
        const uploadThumbnail = thumbnail.uploadCertificateThubmbnail(thumbnailData);
        alert('Uploaded the thumbnail');
    }
    return (
        <div className='documents__thumbnail'>
            <div className="form__container">
                <Typography textAlign={'center'} variant='h4'>Document Thumbanail</Typography>
                <form>
                    <TextField id="outlined-basic" label="Title" size='small' variant="outlined" onChange={(e) => setTitle(e.target.value)} />
                    <FormControl sx={{ m: 0, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Type"
                            size='small'
                            onChange={(e:SelectChangeEvent)=>setType(e.target.value)}
                        >
                            <MenuItem value={'certificate'}>Certificate</MenuItem>
                            <MenuItem value={'marksheet'}>Marksheet</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={branch}
                            label="Branch"
                            onChange={(e) => setBranch(e.target.value)}
                        >
                            <MenuItem value={'mca'}>MCA</MenuItem>
                            <MenuItem value={'btech'}>B.Tech</MenuItem>
                            <MenuItem value={'diploma'}>Diploma</MenuItem>
                        </Select>
                    </FormControl>
                    <div className='image__upload'>
                        <InputLabel id="demo-simple-select-label">Choose the Thumbnail</InputLabel>
                        <input type="file" onChange={handleImageChange} />
                        <div className="preview__image">
                            {image && <img src={image} alt="Selected file preview" />}
                        </div>
                    </div>
                    <Button variant='contained' onClick={handleUpload} >Upload</Button>
                </form>
            </div>
        </div>
    )
}

export default DocumentsThumbnail;