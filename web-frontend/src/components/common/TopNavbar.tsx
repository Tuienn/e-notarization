import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link } from '@tanstack/react-router'
import logo from '../../assets/svg/logo.svg'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import LanguageIcon from '@mui/icons-material/Language'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MenuSelector from './MenuSelector'
import i18n from '../../i18n'
import Divider from '@mui/material/Divider'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import AppBar from '@mui/material/AppBar'

const TopNavbar: React.FC = () => {
    const { t } = useTranslation('layout')
    const theme = useTheme()
    const smScreen = useMediaQuery(theme.breakpoints.up('sm'))

    return (
        <AppBar position='static'>
            <Toolbar sx={{ backgroundColor: 'background.paper' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                    <img
                        src={logo}
                        alt='logo'
                        style={{
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            height: '100%'
                        }}
                    />

                    {smScreen && (
                        <>
                            <Button color='primary' component={Link} to='/' sx={{ fontWeight: 'bold' }}>
                                {t('home')}
                            </Button>
                        </>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MenuSelector
                        items={[
                            {
                                label: t('language.en'),
                                onClick: () => {
                                    i18n.changeLanguage('en')
                                }
                            },
                            {
                                label: t('language.vi'),
                                onClick: () => {
                                    i18n.changeLanguage('vi')
                                }
                            }
                        ]}
                    >
                        <IconButton color='success'>
                            <LanguageIcon />
                        </IconButton>
                    </MenuSelector>
                    <IconButton color='info'>
                        <SettingsIcon />
                    </IconButton>
                    <IconButton color='warning'>
                        <NotificationsIcon />
                    </IconButton>

                    <Divider orientation='vertical' flexItem />

                    {!smScreen ? (
                        <IconButton color='info'>
                            <LoginIcon />
                        </IconButton>
                    ) : (
                        <Button
                            color='primary'
                            variant='outlined'
                            component={Link}
                            to='/login'
                            sx={{ mx: 1 }}
                            startIcon={<LoginIcon />}
                        >
                            {t('login')}
                        </Button>
                    )}
                    {!smScreen ? (
                        <IconButton color='success'>
                            <PersonAddIcon />
                        </IconButton>
                    ) : (
                        <Button
                            color='primary'
                            variant='contained'
                            component={Link}
                            to='/register'
                            startIcon={<PersonAddIcon />}
                        >
                            {t('register')}
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default TopNavbar
