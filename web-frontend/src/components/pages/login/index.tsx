import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Logo from '../../../assets/svg/logo.svg?react'

const LoginPage: React.FC = () => {
    const { t } = useTranslation('auth')
    const [showPassword, setShowPassword] = useState(false)

    const loginSchema = useMemo(
        () =>
            z.object({
                username: z.string().min(1, t('login.error.usernameRequired')),
                password: z.string().min(1, t('login.error.passwordRequired'))
            }),
        [t]
    )

    type LoginFormData = z.infer<typeof loginSchema>

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginFormData) => {
        try {
            console.log('Login data:', data)
            // TODO: Integrate with auth service
            // const response = await AuthService.login(data);
            // Handle success
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <Dialog open={true} maxWidth='xs' fullWidth>
            <DialogContent>
                <Stack spacing={3}>
                    <Stack alignItems='center' spacing={2}>
                        <Logo width={30} />
                        <Stack spacing={1} alignItems='center'>
                            <Typography variant='h4' component='h1' fontWeight='bold'>
                                {t('login.title')}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                {t('login.subtitle')}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack component='form' onSubmit={handleSubmit(onSubmit)} spacing={2} noValidate>
                        <TextField
                            {...register('username')}
                            label={t('login.username')}
                            error={!!errors.username}
                            helperText={errors.username?.message || ''}
                            fullWidth
                            autoComplete='username'
                            autoFocus
                            required
                        />

                        <TextField
                            {...register('password')}
                            label={t('login.password')}
                            type={showPassword ? 'text' : 'password'}
                            error={!!errors.password}
                            helperText={errors.password?.message || ''}
                            fullWidth
                            autoComplete='current-password'
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                onClick={handleTogglePasswordVisibility}
                                                edge='end'
                                                aria-label='toggle password visibility'
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                            required
                        />

                        <Button type='submit' variant='contained' size='large' disabled={isSubmitting} fullWidth>
                            {t('login.submit')}
                        </Button>
                    </Stack>

                    <Stack direction='row' spacing={0.5} justifyContent='center'>
                        <Typography variant='body2' color='text.secondary'>
                            {t('login.noAccount')}
                        </Typography>
                        <Link to='/register'>
                            <Typography variant='body2' color='primary' fontWeight='medium'>
                                {t('login.signUp')}
                            </Typography>
                        </Link>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default LoginPage
