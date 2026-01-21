import type { AlertColor } from '@mui/material/Alert'

export type NotificationSeverity = AlertColor | 'loading'

export interface NotificationState {
    open: boolean
    message: string
    severity: NotificationSeverity

    notify: (message: string, severity?: NotificationSeverity) => void
    stopNotify: () => void
}
