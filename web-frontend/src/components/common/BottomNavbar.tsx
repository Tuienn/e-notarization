import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import BottomNavbarItem from './BottomNavbarItem'
import { useTranslation } from 'react-i18next'
import HomeIcon from '@mui/icons-material/Home'

const BottomNavbar: React.FC = () => {
    const { t } = useTranslation('layout')
    return (
        <AppBar position='fixed' sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar sx={{ justifyContent: 'space-around', backgroundColor: 'background.paper' }}>
                <BottomNavbarItem label={t('home')} icon={<HomeIcon />} hrefTo='/' />
            </Toolbar>
        </AppBar>
    )
}

export default BottomNavbar
