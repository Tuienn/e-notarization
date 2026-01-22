import { create } from 'zustand'
import { type IAuthLocalState } from './auth.types'
import { persist } from 'zustand/middleware'
import { getDataStorage, removeDataStorage, saveDataStorage } from '../../lib/handleStorage'

export const useAuthLocalStore = create<IAuthLocalState>()(
    persist(
        (set) => ({
            refreshToken: null,
            setRefreshToken: (token) => set({ refreshToken: token }),
            clearRefreshToken: () => set({ refreshToken: null })
        }),
        {
            name: 'auth-local',
            storage: {
                getItem: (key) => getDataStorage(key, 'local'),
                setItem: (key, value) => saveDataStorage(key, value, 'local'),
                removeItem: (key) => removeDataStorage(key, 'local')
            }
        }
    )
)
