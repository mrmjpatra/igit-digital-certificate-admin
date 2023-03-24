import { Avatar, Box, IconButton, Menu, MenuItem, Paper, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { removeAdminLogin } from '../state/Admin/admin-slice';
import { useAppDispatch } from '../state/hooks';

const NavBar = () => {
    const dispatch=useAppDispatch();
    const navigate=useNavigate();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handelLogOut=()=>{
        dispatch(removeAdminLogin());
        navigate('/');
    }
    
    return (
        <div>
            <Paper elevation={3} style={{ position: 'fixed', width: '100%', top: '0', zIndex: '100', left: '0' }} square>

                <HeaderContainer>
                    <Link to='/'>
                        <Logo>
                            <img src="https://igitsarang.ac.in/assets/frontend//images/logo.png" alt="" />
                            <Typography >Digital Certificate</Typography>
                        </Logo>
                    </Link>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"  >Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"  >Setting</Typography>
                            </MenuItem>
                            <MenuItem onClick={()=>{
                                handleCloseUserMenu();
                                handelLogOut();
                            }
                            }>
                                <Typography textAlign="center"  >Log Out</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </HeaderContainer>
            </Paper>
        </div>
    )
}

export default NavBar;

const HeaderContainer = styled.div`
margin-left: 3rem;
  width: 100%;
  display: grid;
  grid-template-columns:5fr 1fr;
  gap: 60%;
  align-items: center;
  padding: .5rem 1rem;
  p{
    color: black;
  }
  @media screen and (max-width: 780px)  {
      justify-content: space-evenly;
      padding: 10px 0;
  }
`;
const Logo = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    p{
      margin-left: 1rem;
      font-size: 2rem;
      font-weight: 800;
    }
      img{
        width: 3rem;
        height: 3rem;
      }
      @media screen and (max-width: 780px)  {
        margin-left: 0;
          p{
            margin: 0;
            margin-left: 10px;
            font-size: 1rem;
            font: 100;
          }
          img{
            width: 2rem;
            height: 2rem;
          }
        
      }

`;


