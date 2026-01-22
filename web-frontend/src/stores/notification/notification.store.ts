import { create } from 'zustand'
import type { AlertColor } from '@mui/material/Alert'
import type { INotificationState } from './notification.types'

export type NotificationSeverity = AlertColor | 'loading'

export const useNotificationStore = create<INotificationState>((set) => ({
    open: false,
    message: '',
    severity: 'info',

    notify: (message, severity = 'info') =>
        set({
            open: true,
            message,
            severity
        }),

    stopNotify: () =>
        set({
            open: false
        })
}))
