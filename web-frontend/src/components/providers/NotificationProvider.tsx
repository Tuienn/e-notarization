import Snackbar from '@mui/material/Snackbar'
import { createContext, useCallback, useState, type ReactNode } from 'react'
import Alert, { type AlertColor } from '@mui/material/Alert'

interface INotificationContext {
    notify: (message: string, severity?: AlertColor) => void
}

interface Props {
    children: ReactNode
}

export const NotificationContext = createContext<INotificationContext | undefined>(undefined)

export default function NotificationProvider(props: Props) {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState<AlertColor>('info')

    const notify = useCallback((msg: string, sev: AlertColor = 'info') => {
        setMessage(msg)
        setSeverity(sev)
        setOpen(true)
    }, [])

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setOpen(false)
    }

    return (
        <NotificationContext.Provider value={{ notify }}>
            {props.children}
            <Snackbar
                open={open}
                autoHideDuration={severity === 'error' ? null : 4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert elevation={6} onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    )
}
