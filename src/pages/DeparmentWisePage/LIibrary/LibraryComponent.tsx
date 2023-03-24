import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { FireStoreDb } from '../../../firebase/FireStoreDb/FireStoreDb';
import AllowRejectComponent from './AllowRejectComponent';

export interface IUserDetails {
    emailId: string,
    gender: string,
    branch: string,
    mobileNumber: string,
    name: string,
    passYear: string,
    regdNo: string,
    rollNo: string,
    verifyed: boolean,
    apply: boolean,
    pending: boolean,
}
interface applyCertFormType {
    isHosteller: boolean,
    hostelName?: string,
    dept: string
}
interface IClearance {
    library: {
        clerance: boolean;
        remarkStatus: boolean;
        remark: string;
    };
    hostel: {
        formData: applyCertFormType;
        clerance: boolean;
        remarkStatus: boolean;
        remark: string;
    };
    branchdept: {
        clerance: boolean;
        remarkStatus: boolean;
        remark: string;
    };
}
interface fieldType {
    clearance: IClearance,
    apply: boolean;
    pending: boolean;
}

export interface IAllUserData extends IUserDetails, fieldType {

}

const LibraryComponent = () => {
    const [allUserDetails, setAllUserDetails] = useState<IAllUserData[]>([]);
    const [show, setShow] = useState(false);
    const fetchAllUsers = async () => {
        const users = new FireStoreDb('Users');
        const allUsers: IAllUserData[] = await users.readAllUserDetails();
        const pendingStudentList = allUsers.filter(user => user.apply === true);
        setAllUserDetails(pendingStudentList);
    }
    const handelAllowRejectComponent = (user: IUserDetails) => {
        setShow(true);
    }
    useEffect(() => {
        fetchAllUsers();
    }, []);
    return (
        <LibraryComponentContainer>
            <StudentDetailsContainer>
                {
                    allUserDetails.map(user => {
                        return (
                            <Accordion>
                                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMore />} >
                                    <Typography>{user.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <dl className='user__details'>
                                        <dd> <img draggable='false' src={require('./dp.jpg')} alt="my Profile" /> </dd>
                                        <div className="details name">
                                            <dt>Name</dt>
                                            <dd><TextField size='small' placeholder={user.branch} InputProps={{
                                                readOnly: true,
                                            }} /> </dd>
                                        </div>
                                        <div className="details branch">
                                            <dt>Branch</dt>
                                            <dd><TextField size='small' placeholder={user.name} InputProps={{
                                                readOnly: true,
                                            }} /></dd>
                                        </div>
                                        <div className="details regd__no">
                                            <dt>Regd No</dt>
                                            <dd><TextField size='small' placeholder={user.regdNo} InputProps={{
                                                readOnly: true,
                                            }} />
                                            </dd>
                                        </div>
                                        <div className="details roll__no">
                                            <dt>Roll No</dt>
                                            <dd><TextField size='small' placeholder={user.rollNo} InputProps={{
                                                readOnly: true,
                                            }} />
                                            </dd>
                                        </div>
                                        <div className="details mobile">
                                            <dt>Mobile Number</dt>
                                            <dd><TextField size='small' placeholder={user.mobileNumber} InputProps={{
                                                readOnly: true,
                                            }} />
                                            </dd>
                                        </div>
                                        <div className="details passing__year">
                                            <dt>Passing Year</dt>
                                            <dd><TextField size='small' placeholder={user.passYear} InputProps={{
                                                readOnly: true,
                                            }} /></dd>
                                        </div>
                                        {user.clearance.hostel.formData.isHosteller && <div className="details hostel">
                                            <dt>Hostel</dt>
                                            <dd><TextField size='small' placeholder={user.clearance.hostel.formData.hostelName} InputProps={{
                                                readOnly: true,
                                            }} /></dd>
                                        </div>}
                                        <Button variant='outlined' color='success' onClick={(e) => handelAllowRejectComponent(user)} >Verify</Button>
                                    </dl>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </StudentDetailsContainer>
            <ResponseContainer style={{ display: show ? 'block' : 'none' }} >
                <AllowRejectComponent />
            </ResponseContainer>
        </LibraryComponentContainer>
    )
}

export default LibraryComponent;

const LibraryComponentContainer = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
`;
const StudentDetailsContainer = styled.div`
    padding: 1rem 2rem;
        dl.user__details{
            padding: 1rem;
            display: grid;
            row-gap: 1rem;
            dd{
               justify-self: center;
               align-self: center;
            }
            dd img{
                width: 6rem;
                height: 6rem;
                border-radius: 50%;
            }
        }
      .details{
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
      }
`;
const ResponseContainer = styled.div`
    padding: 1rem;

`;