import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import { FireStoreDb } from '../firebase/FireStoreDb/FireStoreDb';
import * as XLSX from 'xlsx';
const Marksheet = () => {
  const [branch, setBranch] = useState<string>('');
    const [jsonData, setJsonData] = useState<any[]>([]);
    const [uploadDocument, setUploadDocument] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filedetails, setFiledetails] = useState({
        fileName: '',
        fileType: '',
        fileSize: 0
    });
    const [fileMeta, setFileMeta] = useState({
        contentType: "application/vnd.ms-excel",
    });
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onload = async (e) => {
                if (e.target?.result) {
                    const data = new Uint8Array(e.target.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    setJsonData(jsonData)
                    reader.readAsArrayBuffer(file);
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }
    const handleUpload = async () => {
        const marksheets = new FireStoreDb('marksheets');
        const data = await marksheets.storeData(jsonData,branch);
        console.log(data)
    }
    return (
        <div className='add__documents__container'>
            <div className="form__container">
                <Typography textAlign={'center'} variant='h4'>Upload Marksheet File</Typography>
                <form action="">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={branch}
                            label="Age"
                            onChange={(e)=>setBranch(e.target.value)}
                        >
                            <MenuItem value={'mca'}>MCA</MenuItem>
                            <MenuItem value={'btech'}>B.Tech</MenuItem>
                            <MenuItem value={'diploma'}>Diploma</MenuItem>
                        </Select>
                    </FormControl>
                    <div className='image__upload'>
                        <InputLabel id="demo-simple-select-label">Choose the Thumbnail</InputLabel>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <Button variant='contained' onClick={handleUpload} >Upload</Button>
                </form>
            </div>
        </div>
    )
}

export default Marksheet