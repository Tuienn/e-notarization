import { useState } from 'react'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Switch from '@mui/material/Switch'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Notifications from '@mui/icons-material/Notifications'
import Language from '@mui/icons-material/Language'
import Lock from '@mui/icons-material/Lock'
import DarkMode from '@mui/icons-material/DarkMode'
import Logout from '@mui/icons-material/Logout'
import Person from '@mui/icons-material/Person'
import InfoUser from './InfoUser'
import SettingItem from './SettingItem'
import SettingItemGroup from './SettingItemGroup'
import AlertDialog from '../../common/mui/AlertDialog'
import { useNavigate } from '@tanstack/react-router'
import { tokenFacade } from '../../../stores/token/token.facade'
import { useNotify } from '../../../stores/notification/notification.selector'
import { useTranslation } from 'react-i18next'
import ThemeSwitch from '../../common/setting/ThemeSwitch'
import LanguageSelector from '../../common/setting/LanguageSelector'

const PersonalPage: React.FC = () => {
    const { t } = useTranslation('personal')
    const { t: tCommon } = useTranslation('common')
    const navigate = useNavigate()
    const notify = useNotify()
    const [showLogoutDialog, setShowLogoutDialog] = useState(false)

    // TODO: Replace with real user data from API/store
    const user = {
        name: 'Nguyễn Văn A',
        phone: '+84 123 456 789',
        avatar: undefined // Optional: add avatar URL here
    }

    const handleLogout = () => {
        setShowLogoutDialog(true)
    }

    const handleConfirmLogout = () => {
        tokenFacade.logout()
        notify(t('logout.success'), 'success')
        navigate({ to: '/' })
        setShowLogoutDialog(false)
    }

    return (
        <Container maxWidth='lg' className='children-main-layout' sx={{ py: 4 }}>
            <Grid container spacing={3}>
                {/* Left Column - User Info & Logout */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={3} sx={{ height: '100%' }}>
                        <InfoUser name={user.name} phone={user.phone} avatar={user.avatar} />
                        <Button
                            variant='outlined'
                            color='error'
                            size='large'
                            startIcon={<Logout />}
                            onClick={handleLogout}
                            fullWidth
                            sx={{
                                borderRadius: 3,
                                py: 1.5,
                                fontWeight: 600,
                                mt: 'auto'
                            }}
                        >
                            {t('settings.logout')}
                        </Button>
                    </Stack>
                </Grid>

                {/* Right Column - Settings */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Stack spacing={3}>
                        {/* Account Settings */}
                        <SettingItemGroup title={t('settings.account.title')}>
                            <SettingItem
                                icon={<Person />}
                                title={t('settings.account.profile')}
                                action={
                                    <IconButton size='small' onClick={() => console.log('Navigate to profile edit')}>
                                        <ChevronRight />
                                    </IconButton>
                                }
                            />
                            <SettingItem
                                icon={<Lock />}
                                title={t('settings.account.changePassword')}
                                action={
                                    <IconButton size='small' onClick={() => console.log('Navigate to change password')}>
                                        <ChevronRight />
                                    </IconButton>
                                }
                            />
                        </SettingItemGroup>

                        {/* Preferences */}
                        <SettingItemGroup title={t('settings.preferences.title')}>
                            <SettingItem
                                icon={<Notifications />}
                                title={t('settings.preferences.notifications')}
                                action={<Switch />}
                            />
                            <SettingItem
                                icon={<DarkMode />}
                                title={t('settings.preferences.darkMode')}
                                action={<ThemeSwitch />}
                            />
                            <SettingItem
                                icon={<Language />}
                                title={t('settings.preferences.language')}
                                action={<LanguageSelector />}
                            />
                        </SettingItemGroup>
                    </Stack>
                </Grid>
            </Grid>

            {/* Logout Confirmation Dialog */}
            <AlertDialog
                open={showLogoutDialog}
                onClose={() => setShowLogoutDialog(false)}
                onOk={handleConfirmLogout}
                title={tCommon('logout.confirmTitle')}
                description={tCommon('logout.confirmMessage')}
            />
        </Container>
    )
}

export default PersonalPage
