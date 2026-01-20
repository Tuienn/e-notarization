import { createFileRoute } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

export const Route = createFileRoute('/about')({
    component: AboutPage
})

function AboutPage() {
    return (
        <Box>
            <Typography variant='h3' gutterBottom>
                Giới thiệu
            </Typography>
            <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant='body1'>Đây là trang giới thiệu của ứng dụng.</Typography>
                <Typography variant='body2' sx={{ mt: 2 }}>
                    Tanstack Router cung cấp type-safe routing cho React applications.
                </Typography>
            </Paper>
        </Box>
    )
}
