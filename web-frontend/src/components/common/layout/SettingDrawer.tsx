import IconButton from '@mui/material/IconButton'
import SettingsIcon from '@mui/icons-material/Settings'
import { useState } from 'react'
import CustomDrawer from '../mui/CustomDrawer'

const SettingDrawer: React.FC = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <IconButton color='info' onClick={() => setOpen(true)}>
                <SettingsIcon />
            </IconButton>
            <CustomDrawer open={open} onClose={() => setOpen(false)}>
                Test content
            </CustomDrawer>
        </>
    )
}

export default SettingDrawer
