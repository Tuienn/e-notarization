import { createFileRoute } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

export const Route = createFileRoute('/contact')({
    component: ContactPage
})

function ContactPage() {
    return (
        <Box>
            <Typography variant='h3' gutterBottom>
                Liên hệ
            </Typography>
            <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant='body1' gutterBottom>
                    Gửi tin nhắn cho chúng tôi:
                </Typography>
                <Box component='form' sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label='Tên của bạn' fullWidth />
                    <TextField label='Email' type='email' fullWidth />
                    <TextField label='Tin nhắn' multiline rows={4} fullWidth />
                    <Button variant='contained' sx={{ alignSelf: 'flex-start' }}>
                        Gửi
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}
