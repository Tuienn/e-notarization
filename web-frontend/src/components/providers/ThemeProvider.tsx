import { createTheme } from '@mui/material/styles'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import type { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const ThemeProvider = (props: Props) => {
    const theme = createTheme({
        typography: {
            fontFamily: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'sans-serif'].join(','),
            button: {
                textTransform: 'none', // Không tự động viết hoa
                fontWeight: 500
            }
        }
    })

    return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
}

export default ThemeProvider
