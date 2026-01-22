import Box from '@mui/material/Box'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import TopNavbar from '../components/common/TopNavbar'
import BottomNavbar from '../components/common/BottomNavbar'

export const Route = createRootRoute({
    component: () => (
        <Box>
            <TopNavbar />
            <Box sx={{ p: 3 }}>
                <Outlet />
            </Box>
            <BottomNavbar />
        </Box>
    )
})
