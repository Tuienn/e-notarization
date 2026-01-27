import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from '@tanstack/react-router'
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
import { useMutation } from '@tanstack/react-query'
import AuthService from '../../../services/nestJS/auth.service'
import { tokenFacade } from '../../../stores/token/token.facade'
import { useNotify } from '../../../stores/notification/notification.selector'

const LoginPage: React.FC = () => {
    const { t } = useTranslation('auth')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const notify = useNotify()

    const loginSchema = useMemo(
        () =>
            z.object({
                username: z.string().min(1, t('login.error.usernameRequired')),
                password: z.string().min(1, t('login.error.passwordRequired'))
            }),
        [t]
    )

    type LoginFormData = z.infer<typeof loginSchema>

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const mutationLogin = useMutation({
        mutationFn: (data: LoginFormData) => AuthService.login(data.username, data.password),
        onSuccess: (data) => {
            notify(t('login.success.loginSuccess'), 'success')
            tokenFacade.login(data.accessToken, data.refreshToken)
            setTimeout(() => {
                navigate({ to: '/' })
            }, 500)
        },
        onError: () => {
            notify(t('login.error.invalidCredentials'), 'error')
        }
    })

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <Dialog open={true} maxWidth='xs' fullWidth>
            <DialogContent>
                <Stack spacing={3}>
                    <Stack alignItems='center' spacing={1}>
                        <Logo width={30} onClick={() => navigate({ to: '/' })} style={{ cursor: 'pointer' }} />
                        <Typography variant='h4' fontWeight='bold'>
                            {t('login.title')}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            {t('login.subtitle')}
                        </Typography>
                    </Stack>

                    <Stack
                        component='form'
                        onSubmit={form.handleSubmit((data) => mutationLogin.mutate(data))}
                        spacing={2}
                    >
                        <TextField
                            {...form.register('username')}
                            label={t('login.username')}
                            error={!!form.formState.errors.username}
                            helperText={form.formState.errors.username?.message || ''}
                            fullWidth
                            autoComplete='username'
                            autoFocus
                            required
                        />

                        <TextField
                            {...form.register('password')}
                            label={t('login.password')}
                            type={showPassword ? 'text' : 'password'}
                            error={!!form.formState.errors.password}
                            helperText={form.formState.errors.password?.message || ''}
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

                        <Button
                            type='submit'
                            variant='contained'
                            size='large'
                            loading={form.formState.isSubmitting}
                            fullWidth
                        >
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
