import IconButton from '@mui/material/IconButton'
import SettingsIcon from '@mui/icons-material/Settings'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import CustomDrawer from '../mui/CustomDrawer'
import ThemeSwitch from '../setting/ThemeSwitch'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'

const SettingDrawer: React.FC = () => {
    const [open, setOpen] = useState(false)
    const { t } = useTranslation('layout')

    return (
        <>
            <IconButton color='info' onClick={() => setOpen(true)}>
                <SettingsIcon />
            </IconButton>
            <CustomDrawer open={open} onClose={() => setOpen(false)} title='Settings'>
                <Stack direction='row' alignItems='center' justifyContent='space-between' mb={2}>
                    <Typography variant='body1'>{t('settings.theme.title')}</Typography>
                    <ThemeSwitch />
                </Stack>
            </CustomDrawer>
        </>
    )
}

export default SettingDrawer
