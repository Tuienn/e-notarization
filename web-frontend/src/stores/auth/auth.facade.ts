import { decrypt, encrypt } from '../../lib/handleCrypto'
import { useAuthLocalStore } from './authLocal.store'
import { useAuthSessionStore } from './authSession.store'

export const authFacade = {
    login: (accessToken: string, refreshToken: string) => {
        const encryptedAccessToken = encrypt(accessToken)
        const encryptedRefreshToken = encrypt(refreshToken)

        if (!encryptedAccessToken || !encryptedRefreshToken) {
            throw new Error('Failed to encrypt access token or refresh token')
        }

        useAuthSessionStore.getState().setAccessToken(encryptedAccessToken)
        useAuthLocalStore.getState().setRefreshToken(encryptedRefreshToken)
    },

    logout: () => {
        useAuthSessionStore.getState().clearAccessToken()
        useAuthLocalStore.getState().clearRefreshToken()
    },

    getAccessToken: () => {
        const accessToken = useAuthSessionStore.getState().accessToken
        if (!accessToken) {
            return null
        }
        return decrypt(accessToken)
    },

    getRefreshToken: () => {
        const refreshToken = useAuthLocalStore.getState().refreshToken
        if (!refreshToken) {
            return null
        }
        return decrypt(refreshToken)
    }
}
