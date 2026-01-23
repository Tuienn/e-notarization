import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { ReactNode } from 'react'

interface Props {
    title?: string
    children: ReactNode

    open: boolean
    onClose: () => void
    footer?: ReactNode
}

const CustomDrawer: React.FC<Props> = (props) => {
    const theme = useTheme()
    const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <Drawer open={props.open} onClose={props.onClose} anchor={mdScreen ? 'right' : 'bottom'}>
            {props.title && (
                <Typography variant='h6' noWrap component='div'>
                    {props.title}
                </Typography>
            )}
            <Box
                p={2}
                minWidth={300}
                minHeight={300}
                overflow={'auto'}
                maxHeight={mdScreen ? '100vh' : '50vh'}
                maxWidth={!mdScreen ? '100vw' : '50vw'}
            >
                {props.children}
            </Box>

            {props.footer && (
                <Box position={'absolute'} right={0} bottom={0} left={0} p={2}>
                    {props.footer}
                </Box>
            )}
        </Drawer>
    )
}

export default CustomDrawer
