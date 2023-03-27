import { Button, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { FirebaseStorage } from '../../firebase/CloudStorage/FirebaseStorage';
import { FireStoreDb } from '../../firebase/FireStoreDb/FireStoreDb';
import './uploadCertificate.css';
export type formDetailsType = {
  regdNumber: string,
  type: string,
  branch: string,
  semester?: string,
  fileUrl: string
}
export interface IUploadedCertificate {
  regdNumber: string;
  branch: string;
  certUrl?: string,
  marksheet?: {
    name: string,
    markUrl: string
  }[]
}
const UploadCertificate = () => {
  const [regdNumber, setRegdNumber] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [semester, setSemester] = useState<string>('');
  const [branch, setBranch] = useState<string>('');
  //image
  const [uploadDocument, setUploadDocument] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filedetails, setFiledetails] = useState({
    fileName: '',
    fileType: '',
    fileSize: 0
  });
  const [fileMeta, setFileMeta] = useState({
    contentType: "application/pdf",
  });

  const semesterList: { btech: string[], mca: string[], diploma: string[] } = {
    btech: ['First', 'Second', 'Third', 'Fourth', 'Fifith', 'Sixth', 'Seventh', "Eigth"],
    mca: ['First', 'Second', 'Third', 'Fourth'],
    diploma: ['First', 'Second', 'Third', 'Fourth', 'Fifith', 'Sixth']
  };

  const handleType = (e: SelectChangeEvent) => {
    setType(e.target.value)
  }

  const handleBranch = (event: SelectChangeEvent) => {
    setBranch(event.target.value);
  };
  const handleSemester = (event: SelectChangeEvent) => {
    setSemester((event.target.value).toLowerCase());
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      const fileType = e.target.files[0].type;
      const fileSize = e.target.files[0].size;
      setFiledetails({ fileName, fileSize, fileType });
      setFileMeta({
        contentType: fileType,
      });
      setSelectedFile(e.target.files[0]);
    }
  }

  const uploadFileGetUrl = async (): Promise<string> => {
    const userPhotoLink = new FirebaseStorage('certificates');
    const fileUrl = userPhotoLink.storeFileGetUrl(filedetails.fileName, selectedFile, fileMeta);
    return fileUrl;
  }

  const handleUpload = async () => {
    const formDetails = new FireStoreDb('UploadedCertificates');
    const fileUrl = await uploadFileGetUrl();

    const uploadedCertificate: IUploadedCertificate = await formDetails.readUploadedCertificateData(regdNumber);

    let newUploadCert: IUploadedCertificate = {
      regdNumber,
      branch
    };

    if (type === "certificate") {
      newUploadCert.certUrl = fileUrl;
    } else {
      if (!uploadedCertificate) {
        newUploadCert.marksheet = [
          {
            name: semester,
            markUrl: fileUrl
          }
        ]
      } else {
        if (uploadedCertificate.certUrl) {
          newUploadCert.certUrl = uploadedCertificate.certUrl;
        }
        newUploadCert.marksheet = [
          ...uploadedCertificate.marksheet ?? [],
          {
            name: semester,
            markUrl: fileUrl
          }
        ]
      }
    }
    try {
      await formDetails.uploadFormDetails(newUploadCert);
      alert("Certificate uploaded")
    } catch (error) {
      console.log("Error while uploading formdetails", error);
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

          <TextField id="outlined-basic" label="Registration Number" size='small' variant="outlined" onChange={(e) => setRegdNumber(e.target.value)} />

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

          <div className='image__upload'>
            <InputLabel id="demo-simple-select-label">Choose the Thumbnail</InputLabel>
            <input type="file" onChange={handleImageChange} />
          </div>
          <Button variant='contained' onClick={handleUpload} >Upload</Button>
        </form>
      </div>
    </div>
  )
}

export default UploadCertificate;