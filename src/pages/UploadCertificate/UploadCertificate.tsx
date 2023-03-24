import { Button, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { FirebaseStorage } from '../../firebase/CloudStorage/FirebaseStorage';
import { FireStoreDb } from '../../firebase/FireStoreDb/FireStoreDb';
import './uploadCertificate.css';
export type formDetailsType={
  type:string,
  title:string,
  branch:string,
  semester?:string,
  availbility:boolean,
  clearance:boolean,
  imageUrl:string
}
const UploadCertificate = () => {
  const [title, setTitle] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [availbility, setAvailbility] = useState<boolean>(false);
  const [clearance, setClearance] = useState<boolean>(false);
  const [semester, setSemester] = useState<string>('');
  const [branch, setBranch] = useState<string>('');
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

  const semesterList: { btech: string[], mca: string[], diploma: string[] } = {
    btech: ['First', 'Second', 'Third', 'Fourth', 'Fifith', 'Sixth', 'Seventh', "Eigth"],
    mca: ['First', 'Second', 'Third', 'Fourth'],
    diploma: ['First', 'Second', 'Third', 'Fourth', 'Fifith', 'Sixth']
  };


  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const handleType = (e: SelectChangeEvent) => {
    setType(e.target.value)
  }
  const handleAvailbility = (e: ChangeEvent<HTMLInputElement>) => {
    setAvailbility(e.target.checked);
  }
  const handleClearance = (e: ChangeEvent<HTMLInputElement>) => {
    setClearance(e.target.checked);
  }

  const handleBranch = (event: SelectChangeEvent) => {
    setBranch(event.target.value);
  };
  const handleSemester = (event: SelectChangeEvent) => {
    setSemester(event.target.value);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
    const userPhotoLink = new FirebaseStorage('certificates');
    const PhotoUrl = await userPhotoLink.storeImageGetUrl(imageDetails.fileName, selectedFile, imageMeta);
    return PhotoUrl;
  }

  const handleUpload = async () => {
    const imageUrl = await uploadPhotoGetUrl();
    const formData: formDetailsType = {
      type,
      title,
      branch,
      semester,
      availbility,
      clearance,
      imageUrl
    }
    try {
      const formDetails = new FireStoreDb('UploadedCertificates');
      const uploadFormDetails = formDetails.uploadFormDetails(formData);
      alert("Certificate uploaded")
    } catch (error) {
          console.log("Error while uploading formdetails",error);
    }
  }

  return (
    <div className='add__documents__container'>
      <div className="form__container">
        <Typography textAlign={'center'} variant='h4'>Upload Certificate</Typography>
        <form>
          <FormControl sx={{ m: 0, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type"
              size='small'
              onChange={handleType}
            >
              <MenuItem value={'certificate'}>Certificate</MenuItem>
              <MenuItem value={'marksheet'}>Marksheet</MenuItem>
            </Select>
          </FormControl>
          
          <TextField id="outlined-basic" label="Title" size='small' variant="outlined" onChange={handleTitle} />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Branch</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={branch}
              label="Age"
              onChange={handleBranch}
            >
              <MenuItem value={'mca'}>MCA</MenuItem>
              <MenuItem value={'btech'}>B.Tech</MenuItem>
              <MenuItem value={'diploma'}>Diploma</MenuItem>
            </Select>
          </FormControl>
          {
            (type === 'marksheet') &&
            <>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Semester</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={semester}
                  label="Age"
                  onChange={handleSemester}
                >
                  {
                    semesterList[branch as keyof typeof semesterList]?.map((b, index) => <MenuItem key={index} value={b}>{b}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </>
          }

          <FormGroup>
            <FormControlLabel control={<Switch onChange={handleAvailbility} />} label="Availbility" />
            <FormControlLabel control={<Switch onChange={handleClearance} />} label="Clearance" />
          </FormGroup>
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

export default UploadCertificate;