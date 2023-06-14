import {Home,DocumentScannerOutlined,FileUpload,Info, MarkAsUnreadSharp} from '@mui/icons-material'
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
        link:'/home'
    },
    {
        id:2,
        menuName:'Add Thumbnail',
        icon:DocumentScannerOutlined,
        link:'/home/add'
    },
    {
        id:3,
        menuName:'Upload Certificates',
        icon:FileUpload,
        link:'/home/upload'
    },
    {
        id:4,
        menuName:'Pending Document',
        icon:Info,
        link:'/home/pending'
    },
    {
        id:5,
        menuName:'Marksheets Upload',
        icon:MarkAsUnreadSharp,
        link:'/home/marksheet'
    },
]