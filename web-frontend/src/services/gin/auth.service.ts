import { ginApiService } from '.'
import type { IUser } from '../../types/common'

export default class AuthService {
    private static readonly BASE_URL = '/auth'

    static getUserProfile = async (): Promise<IUser> => {
        const res = await ginApiService<{ data: IUser }>(`${this.BASE_URL}`)
        return res.data
    }

    static login = async (username: string, password: string) => {
        const res = await ginApiService(`${this.BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password })
        })
        return res.data
    }

    static register = async (username: string, password: string) => {
        const res = await ginApiService(`${this.BASE_URL}/register`, {
            method: 'POST',
            body: JSON.stringify({ username, password })
        })
        return res.data
    }
}
