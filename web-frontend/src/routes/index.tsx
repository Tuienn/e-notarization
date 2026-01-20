import { createFileRoute } from '@tanstack/react-router'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

export const Route = createFileRoute('/')({
    component: HomePage
})

function HomePage() {
    return (
        <Box>
            <Typography variant='h3' gutterBottom>
                Trang chủ
            </Typography>
            <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant='body1'>Chào mừng bạn đến với ví dụ đơn giản về Tanstack Router!</Typography>
                <Typography variant='body2' sx={{ mt: 2 }}>
                    Sử dụng menu phía trên để điều hướng giữa các trang.
                </Typography>
            </Paper>
        </Box>
    )
}
