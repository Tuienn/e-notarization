import { useColorScheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import type { SelectChangeEvent } from '@mui/material/Select'

const ThemeSwitch: React.FC = () => {
    const { mode, setMode } = useColorScheme()
    const { t } = useTranslation('layout')

    const handleChange = (event: SelectChangeEvent) => {
        const newMode = event.target.value as 'light' | 'dark' | 'system'
        setMode(newMode)
    }

    return (
        <Select value={mode} onChange={handleChange} sx={{ width: 120 }} variant='standard' size='small'>
            <MenuItem value='light'>{t('settings.theme.light')}</MenuItem>
            <MenuItem value='dark'>{t('settings.theme.dark')}</MenuItem>
            <MenuItem value='system'>{t('settings.theme.system')}</MenuItem>
        </Select>
    )
}

export default ThemeSwitch
