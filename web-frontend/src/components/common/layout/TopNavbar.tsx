import Button from '@mui/material/Button'
import { Link } from '@tanstack/react-router'
import Logo from '../../../assets/svg/logo.svg?react'
import IconButton from '@mui/material/IconButton'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import AppBar from '@mui/material/AppBar'
import type { INavbarItem } from '../../../types/common'
import TopNavbarActions from './TopNavbarActions'
import SettingDrawer from './SettingDrawer'
import Stack from '@mui/material/Stack'

interface Props {
    items: INavbarItem[]
    activeHrefTo: string
}

const TopNavbar: React.FC<Props> = (props) => {
    const theme = useTheme()
    const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <AppBar position='sticky' sx={{ backgroundColor: 'background.paper' }}>
            <Stack
                className='container'
                direction={'row'}
                py={1}
                alignItems={'center'}
            >
                <Stack direction={'row'} alignItems={'center'} gap={1} flexGrow={1}>
                    <Logo width={25} />

                    {mdScreen && (
                        <>
                            {props.items.map((item) => (
                                <Button
                                    key={item.label}
                                    component={Link}
                                    to={item.hrefTo}
                                    sx={{ fontWeight: 'bold' }}
                                    color={props.activeHrefTo === item.hrefTo ? 'secondary' : 'primary'}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </>
                    )}
                </Stack>
                <Stack direction={'row'} alignItems={'center'}>
                    <TopNavbarActions />

                    <Divider orientation='vertical' flexItem />

                    <SettingDrawer />
                    <IconButton color='warning'>
                        <NotificationsIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </AppBar>
    )
}

export default TopNavbar
