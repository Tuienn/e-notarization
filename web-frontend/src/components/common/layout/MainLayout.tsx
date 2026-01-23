import Box from '@mui/material/Box'
import type { ReactNode } from 'react'
import TopNavbar from './TopNavbar'
import BottomNavbar from './BottomNavbar'
import type { INavbarItem } from '../../../types/common'
import { useTranslation } from 'react-i18next'
import HomeIcon from '@mui/icons-material/Home'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import PersonIcon from '@mui/icons-material/Person'
import { useRouterState } from '@tanstack/react-router'

interface Props {
    children: ReactNode
}

const MainLayout: React.FC<Props> = (props) => {
    const { t } = useTranslation('layout')
    const theme = useTheme()
    const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

    const routerState = useRouterState()
    const activeHrefTo = routerState.location.pathname

    const navbarItems: INavbarItem[] = [
        { label: t('home'), hrefTo: '/', icon: <HomeIcon /> },
        {
            label: t('personal'),
            hrefTo: '/personal',
            icon: <PersonIcon />
        }
    ]

    return (
        <Box>
            <TopNavbar items={navbarItems} activeHrefTo={activeHrefTo} />
            <Box className='container' pt={2}>
                {props.children}
            </Box>
            {!mdScreen && <BottomNavbar items={navbarItems} activeHrefTo={activeHrefTo} />}
        </Box>
    )
}

export default MainLayout
