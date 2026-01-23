import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import type { INavbarItem } from '../../../types/common'
import Button from '@mui/material/Button'
import { Link } from '@tanstack/react-router'

interface Props {
    items: INavbarItem[]
    activeHrefTo: string
}

const BottomNavbar: React.FC<Props> = (props) => {
    return (
        <AppBar position='fixed' sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar sx={{ justifyContent: 'space-around', backgroundColor: 'background.paper' }}>
                {props.items.map((item) => (
                    <Button
                        key={item.hrefTo}
                        to={item.hrefTo}
                        component={Link}
                        sx={{ flexDirection: 'column', fontWeight: 'bold' }}
                        color={props.activeHrefTo === item.hrefTo ? 'secondary' : 'primary'}
                    >
                        {item.icon}
                        {item.label}
                    </Button>
                ))}
            </Toolbar>
        </AppBar>
    )
}

export default BottomNavbar
