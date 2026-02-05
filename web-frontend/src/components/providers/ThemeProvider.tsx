import { createTheme } from '@mui/material/styles'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { COLOR_PALETTES } from '../../constants/theme'
import { useThemeColor } from '../../stores/themeColor/themeColor.selector'

interface Props {
    children: ReactNode
}

const ThemeProvider: React.FC<Props> = (props) => {
    const themeColor = useThemeColor()

    const theme = useMemo(() => {
        const palette = COLOR_PALETTES[themeColor as keyof typeof COLOR_PALETTES] || COLOR_PALETTES.blue

        return createTheme({
            cssVariables: {
                colorSchemeSelector: 'data-mui-color-scheme'
            },
            colorSchemes: {
                light: {
                    palette: {
                        primary: palette.primary,
                        secondary: palette.secondary
                    }
                },
                dark: {
                    palette: {
                        primary: palette.primary,
                        secondary: palette.secondary
                    }
                }
            },
            typography: {
                fontFamily: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'sans-serif'].join(','),
                button: {
                    textTransform: 'none',
                    fontWeight: 500
                }
            },
            breakpoints: {
                values: {
                    xs: 0,
                    sm: 640,
                    md: 768,
                    lg: 1024,
                    xl: 1280
                }
            }
        })
    }, [themeColor])

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </MuiThemeProvider>
    )
}

export default ThemeProvider
