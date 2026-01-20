import { createTheme } from '@mui/material/styles'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import type { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export default function ThemeProvider(props: Props) {
    const theme = createTheme({
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"'
            ].join(',')
        }
    })

    return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
}
