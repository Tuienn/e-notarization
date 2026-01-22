import Button from '@mui/material/Button'
import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface Props {
    label: string
    icon: ReactNode
    hrefTo: string
}

const BottomNavbarItem: React.FC<Props> = (props) => {
    return (
        <Button
            startIcon={props.icon}
            to={props.hrefTo}
            component={Link}
            sx={{ flexDirection: 'column', fontWeight: 'bold' }}
        >
            {props.label}
        </Button>
    )
}

export default BottomNavbarItem
