import { create } from 'zustand'
import type { IAuthSessionState } from './auth.types'
import { persist } from 'zustand/middleware'
import { getDataStorage, removeDataStorage, saveDataStorage } from '../../lib/handleStorage'

export const useAuthSessionStore = create<IAuthSessionState>()(
    persist(
        (set) => ({
            accessToken: null,
            setAccessToken: (token) => set({ accessToken: token }),
            clearAccessToken: () => set({ accessToken: null })
        }),
        {
            name: 'auth-session',
            storage: {
                getItem: (key) => getDataStorage(key, 'session'),
                setItem: (key, value) => saveDataStorage(key, value, 'session'),
                removeItem: (key) => removeDataStorage(key, 'session')
            }
        }
    )
)
