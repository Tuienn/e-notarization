import { useContext } from 'react'
import { NotificationContext } from '../components/providers/NotificationProvider'

const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotification must be used within SnackBarProvider')
    }
    return context.notify
}

export default useNotification
