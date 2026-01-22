export interface IAuthSessionState {
    accessToken: string | null
    setAccessToken: (accessToken: string) => void
    clearAccessToken: () => void
}

export interface IAuthLocalState {
    refreshToken: string | null
    setRefreshToken: (refreshToken: string) => void
    clearRefreshToken: () => void
}
