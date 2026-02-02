import { createTheme } from '@mui/material/styles'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import type { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const ThemeProvider: React.FC<Props> = (props) => {
    const theme = createTheme({
        cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme'
        },
        colorSchemes: {
            light: true,
            dark: true
        },
        typography: {
            fontFamily: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'sans-serif'].join(','),
            button: {
                textTransform: 'none',
                fontWeight: 500
            }
        }
    })

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </MuiThemeProvider>
    )
}

export default ThemeProvider
