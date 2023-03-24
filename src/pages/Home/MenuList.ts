import {Home,DocumentScannerOutlined,FileUpload,Info} from '@mui/icons-material'
import SvgIcon from '@mui/material/SvgIcon';
type SvgIconComponent = typeof SvgIcon;

export interface MenuItemType{
    id:number,
    menuName:string,
    icon:SvgIconComponent,
    link:string
}

export const MenuListItem:MenuItemType[]=[
    {
        id:1,
        menuName:'Home',
        icon:Home,
        link:'/'
    },
    {
        id:2,
        menuName:'Add Thumbnail',
        icon:DocumentScannerOutlined,
        link:'/add'
    },
    {
        id:3,
        menuName:'Upload Certificates',
        icon:FileUpload,
        link:'/upload'
    },
    {
        id:4,
        menuName:'Pending Document',
        icon:Info,
        link:'/pending'
    },
]