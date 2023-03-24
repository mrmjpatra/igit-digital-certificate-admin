import { Button, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material'
import { Stack } from '@mui/system';
import React, { ChangeEvent, useState } from 'react'

const AllowRejectComponent = () => {
    const [clearance, setClearance] = useState<boolean>(false);
    const [remarkStatus, setRemarkStatus] = useState<boolean>(false);
    const [remark, setRemark] = useState<string>('');
    return (
        <div>
            <Stack spacing={2} >
                <FormGroup>
                    <FormControlLabel control={<Switch onChange={(e: ChangeEvent<HTMLInputElement>) => setClearance(e.target.checked)} />} label="Clearance" />
                    <FormControlLabel control={<Switch onChange={(e: ChangeEvent<HTMLInputElement>) => setRemarkStatus(e.target.checked)} />} label="Do you want to Reject it ?" />
                </FormGroup>
                {remarkStatus && <TextField size='small' fullWidth placeholder='Remark' />}
                <Button variant='contained'>Submit</Button>
            </Stack>
        </div>
    )
}

export default AllowRejectComponent