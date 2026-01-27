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

const RegisterPage: React.FC = () => {
    const { t } = useTranslation('auth')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()
    const notify = useNotify()

    const registerSchema = useMemo(
        () =>
            z
                .object({
                    username: z
                        .string()
                        .min(1, t('register.error.usernameRequired'))
                        .min(3, t('register.error.usernameMinLength')),
                    password: z
                        .string()
                        .min(1, t('register.error.passwordRequired'))
                        .min(6, t('register.error.passwordMinLength')),
                    confirmPassword: z.string().min(1, t('register.error.confirmPasswordRequired'))
                })
                .refine((data) => data.password === data.confirmPassword, {
                    message: t('register.error.passwordsNotMatch'),
                    path: ['confirmPassword']
                }),
        [t]
    )

    type RegisterFormData = z.infer<typeof registerSchema>

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    })

    const mutationRegiser = useMutation({
        mutationFn: (data: RegisterFormData) => AuthService.register(data.username, data.password),
        onSuccess: (data) => {
            notify(t('register.success.registerSuccess'), 'success')
            tokenFacade.login(data.accessToken, data.refreshToken)
            setTimeout(() => {
                navigate({ to: '/' })
            }, 500)
        },
        onError: () => {
            notify(t('register.error.registerFailed'), 'error')
        }
    })

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev)
    }

    return (
        <Dialog open={true} maxWidth='xs' fullWidth>
            <DialogContent>
                <Stack spacing={3}>
                    <Stack alignItems='center' spacing={1}>
                        <Logo width={30} onClick={() => navigate({ to: '/' })} style={{ cursor: 'pointer' }} />
                        <Typography variant='h4' fontWeight='bold'>
                            {t('register.title')}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            {t('register.subtitle')}
                        </Typography>
                    </Stack>

                    <Stack
                        component='form'
                        onSubmit={form.handleSubmit((data) => mutationRegiser.mutate(data))}
                        spacing={2}
                        noValidate
                    >
                        <TextField
                            {...form.register('username')}
                            label={t('register.username')}
                            error={!!form.formState.errors.username}
                            helperText={form.formState.errors.username?.message || ''}
                            fullWidth
                            autoComplete='username'
                            autoFocus
                            required
                        />

                        <TextField
                            {...form.register('password')}
                            label={t('register.password')}
                            type={showPassword ? 'text' : 'password'}
                            error={!!form.formState.errors.password}
                            helperText={form.formState.errors.password?.message || ''}
                            fullWidth
                            autoComplete='new-password'
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

                        <TextField
                            {...form.register('confirmPassword')}
                            label={t('register.confirmPassword')}
                            type={showConfirmPassword ? 'text' : 'password'}
                            error={!!form.formState.errors.confirmPassword}
                            helperText={form.formState.errors.confirmPassword?.message || ''}
                            fullWidth
                            autoComplete='new-password'
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                onClick={handleToggleConfirmPasswordVisibility}
                                                edge='end'
                                                aria-label='toggle confirm password visibility'
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                            {t('register.submit')}
                        </Button>
                    </Stack>

                    <Stack direction='row' spacing={0.5} justifyContent='center'>
                        <Typography variant='body2' color='text.secondary'>
                            {t('register.hasAccount')}
                        </Typography>
                        <Link to='/login'>
                            <Typography variant='body2' color='primary' fontWeight='medium'>
                                {t('register.signIn')}
                            </Typography>
                        </Link>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default RegisterPage
