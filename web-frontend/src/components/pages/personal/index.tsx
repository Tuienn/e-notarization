import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import AuthService from '../../../services/gin/auth.service'

const PersonalPage: React.FC = () => {
    const { t } = useTranslation('personal')

    const queryUserProfile = useQuery({
        queryKey: ['userProfile'],
        queryFn: () => AuthService.getUserProfile(),
        retry: 1
    })

    if (queryUserProfile.isPending) {
        return (
            <Paper sx={{ p: 2 }}>
                <Stack spacing={1}>
                    <Skeleton width='40%' height={40} />
                    <Skeleton width='60%' height={40} />
                    <Skeleton width='70%' height={40} />
                </Stack>
            </Paper>
        )
    }

    if (queryUserProfile.isError) {
        return <Alert severity='error'>{t('error.loadFailed')}</Alert>
    }

    const user = queryUserProfile.data

    return (
        <Box p={3}>
            <Card>
                <Box p={2}>
                    <Stack spacing={2}>
                        <Typography variant='h5' fontWeight='bold'>
                            {t('title')}
                        </Typography>
                        <Stack spacing={1}>
                            <Typography variant='body1'>
                                <strong>{t('fields.name')}:</strong> {user?.name}
                            </Typography>
                            <Typography variant='body1'>
                                <strong>{t('fields.email')}:</strong> {user?.email}
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
            </Card>
        </Box>
    )
}

export default PersonalPage
