import { Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { adminLoggedIn } from '../../state/Admin/admin-slice'
const AdminLogin = () => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const isLoggedIn=useAppSelector(state=>state.admin.isLoggedIn);
    const dispatch = useAppDispatch();
    const AdminCredential = {
        library: { userName: 'library', password: 'password' },
        hostel: { userName: 'hostel', password: 'password' },
        branchdept: { userName: 'branchdept', password: 'password' },
    }
    const handleAdminLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (AdminCredential.library.userName === userName && AdminCredential.library.password === password) {
            dispatch(adminLoggedIn('library'));
            navigate('/home');
        } else if (AdminCredential.hostel.userName === userName && AdminCredential.hostel.password === password) {
            dispatch(adminLoggedIn('hostel'));
            navigate('/home');
        } else if (AdminCredential.branchdept.userName === userName && AdminCredential.branchdept.password === password) {
            dispatch(adminLoggedIn('branchdept'));
            navigate('/home');
        } else {
            alert('Invalid Credential');
        }
    }

    const handleKeyPress: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === 'Enter') {
            handleAdminLogin(e as unknown as FormEvent<HTMLFormElement>);
        }
    }
    useEffect(()=>{
        console.log(typeof isLoggedIn);
        if (isLoggedIn==="true") {
            navigate('/home');
        }
    },[]);

    return (
        <AdminLoginContainer>
            <LoginForm>
                <form onSubmit={handleAdminLogin}>
                    <Stack spacing={1}>
                        <Typography textAlign={'center'} color='blueviolet' variant='h5' >Enter the Credential</Typography>
                        <TextField size='small' label='UserName' onChange={(e) => setUserName(e.target.value)} />
                        <TextField size='small' label='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
                        <Button variant='contained' type='submit'>Login</Button>
                    </Stack>
                </form>
            </LoginForm>
        </AdminLoginContainer>
    )
}

export default AdminLogin;
const AdminLoginContainer = styled.div`
    display: grid;
    place-items: center;
    height:50vh;
`;
const LoginForm = styled.div`
     width: 20%;
`;