import { useColorScheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const ThemeSwitch = () => {
    const { mode, setMode } = useColorScheme()
    const { t } = useTranslation('layout')

    const handleToggle = () => {
        setMode(mode === 'light' ? 'dark' : 'light')
    }

    return (
        <Select value={mode} onChange={handleToggle} sx={{ width: 100 }} variant='standard'>
            <MenuItem value='light'>{t('settings.theme.light')}</MenuItem>
            <MenuItem value='dark'>{t('settings.theme.dark')}</MenuItem>
            <MenuItem value='system'>{t('settings.theme.system')}</MenuItem>
        </Select>
    )
}

export default ThemeSwitch
