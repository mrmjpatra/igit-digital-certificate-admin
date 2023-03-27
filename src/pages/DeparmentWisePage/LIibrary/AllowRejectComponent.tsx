import { Button, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material'
import { Stack } from '@mui/system';
import React, { ChangeEvent, useState } from 'react'
import { FireStoreDb } from '../../../firebase/FireStoreDb/FireStoreDb';
import { useAppSelector } from '../../../state/hooks';
import { IAllUserData, IClearance } from './LibraryComponent';
interface IAllowRejectComponentProps {
    user: IAllUserData;
}
const AllowRejectComponent = ({ user }: IAllowRejectComponentProps) => {
    const { emailId, clearance } = user;
    const adminType: string = useAppSelector(state => state.admin.adminType);
    const adminTypeDetails = clearance[adminType as keyof IClearance];
    const [giveClearance, setgiveClearance] = useState<boolean>(adminTypeDetails.clearance);
    const [remarkStatus, setRemarkStatus] = useState<boolean>(adminTypeDetails.remarkStatus);
    const [remark, setRemark] = useState<string>(adminTypeDetails.remark);
    const users = new FireStoreDb('Users');
    const handleVerify = () => {
        if (giveClearance) {
            setRemark("");
            setRemarkStatus(true);
        }
        let updatedClearanceList;
        if (adminType === 'hostel') {
            updatedClearanceList = {
                ...clearance, [adminType]: {
                    ...clearance[adminType as keyof IClearance],
                    clearance: giveClearance,
                    remarkStatus,
                    remark
                }
            }
        } else {
            updatedClearanceList = {
                ...clearance, [adminType]: {
                    clearance: giveClearance,
                    remarkStatus,
                    remark
                }
            }
        }
        users.updateField(emailId, "clearance", updatedClearanceList);
    }
    return (
        <React.Fragment>
            <Stack spacing={2} >
                <FormGroup>
                    <FormControlLabel control={<Switch checked={giveClearance} onChange={(e: ChangeEvent<HTMLInputElement>) => setgiveClearance(e.target.checked)} />} label="Clearance" />
                    {!giveClearance && <>
                        <FormControlLabel control={<Switch checked={remarkStatus} onChange={(e: ChangeEvent<HTMLInputElement>) => setRemarkStatus(e.target.checked)} />} label="Do you want to Reject it ?" />
                        {!remarkStatus && <TextField size='small' fullWidth placeholder='Remark' onChange={(e) => setRemark(e.target.value)} />}
                    </>}


                </FormGroup>
                <Button variant='contained' onClick={handleVerify}>Submit</Button>
            </Stack>
        </React.Fragment>
    )
}

export default AllowRejectComponent