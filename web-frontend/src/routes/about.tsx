import { createFileRoute } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useNotify, useStopNotify } from '../stores/notification/notification.selector'

export const Route = createFileRoute('/about')({
    component: AboutPage
})

function AboutPage() {
    const notify = useNotify()
    const stopNotify = useStopNotify()
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

            <Button onClick={() => notify('Hello, world!', 'loading')}>Notify</Button>
            <Button onClick={stopNotify}>Stop Notify</Button>
        </Box>
    )
}
