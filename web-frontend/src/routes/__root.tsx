import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
    component: () => (
        <Box>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' sx={{ flexGrow: 1 }}>
                        Tanstack Router Demo
                    </Typography>
                    <Button color='inherit' component={Link} to='/'>
                        Home
                    </Button>
                    <Button color='inherit' component={Link} to='/about'>
                        About
                    </Button>
                    <Button color='inherit' component={Link} to='/contact'>
                        Contact
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ p: 3 }}>
                <Outlet />
            </Box>
        </Box>
    )
})
