import NavBar from '../../components/NavBar';
import './home.css';
import { Link, Outlet } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import styled from 'styled-components';
import { Box } from '@mui/system';
import { MenuListItem } from './MenuList';
const Home = () => {
    return (
        <>
            <MainContainer >
                <LeftContainer />
                <RenderingCompContainer>
                    <Outlet />
                </RenderingCompContainer>
            </MainContainer>
        </>
    )
}

const LeftContainer = () => {
    return (
        <>
            <NavBar />
            <DrawerContainer>
                <Drawer variant='permanent'>
                    <Box width={'250px'}>
                        <List>
                            {
                                MenuListItem.map((item) => {
                                    return (
                                        <ListItem key={item.id} disablePadding >
                                            <Link to={item.link}>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <item.icon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.menuName} />
                                                </ListItemButton>
                                            </Link>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Box>
                </Drawer>
            </DrawerContainer>
        </>
    )
}




export default Home;

const MainContainer = styled.div`
    display:flex ;
    flex-direction: column;
`;
const RenderingCompContainer = styled.div`
    margin-top: 4.7%;
    margin-left: 17.4%;
`;
const DrawerContainer = styled.div`
    position: absolute;
`;
