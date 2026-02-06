import { useSearch } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import LoginSvg from '../../../assets/svg/illustrations/login.svg'
import RegisterSvg from '../../../assets/svg/illustrations/register.svg'

const fadeAnim = 'opacity .4s ease, transform .4s ease'

const AuthPage: React.FC = () => {
    const { mode = 'login' } = useSearch({ from: '/auth' })
    const isLogin = mode === 'login'

    return (
        <Dialog open maxWidth='md' fullWidth>
            <DialogContent sx={{ p: 0, overflow: 'hidden', position: 'relative', height: 500 }}>
                {/* IMAGE PANEL */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: { xs: 0, md: '50%' },
                        left: isLogin ? 0 : '50%',
                        bgcolor: 'primary.main',
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'left .6s cubic-bezier(0.4,0,0.2,1)'
                    }}
                >
                    <Box
                        component='img'
                        src={LoginSvg}
                        sx={{
                            position: 'absolute',
                            maxWidth: 320,
                            opacity: isLogin ? 1 : 0,
                            transform: isLogin ? 'scale(1)' : 'scale(.8)',
                            transition: fadeAnim,
                            transitionDelay: isLogin ? '.2s' : 0
                        }}
                    />

                    <Box
                        component='img'
                        src={RegisterSvg}
                        sx={{
                            position: 'absolute',
                            maxWidth: 320,
                            opacity: !isLogin ? 1 : 0,
                            transform: !isLogin ? 'scale(1)' : 'scale(.8)',
                            transition: fadeAnim,
                            transitionDelay: !isLogin ? '.2s' : 0
                        }}
                    />
                </Box>

                {/* FORM PANEL */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: { xs: '100%', md: '50%' },
                        left: { xs: 0, md: isLogin ? '50%' : 0 },
                        transition: 'left .6s cubic-bezier(0.4,0,0.2,1)'
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            opacity: isLogin ? 1 : 0,
                            transform: isLogin ? 'none' : 'translateX(-20px)',
                            transition: fadeAnim,
                            pointerEvents: isLogin ? 'auto' : 'none'
                        }}
                    >
                        <LoginForm />
                    </Box>

                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            opacity: !isLogin ? 1 : 0,
                            transform: !isLogin ? 'none' : 'translateX(20px)',
                            transition: fadeAnim,
                            pointerEvents: !isLogin ? 'auto' : 'none'
                        }}
                    >
                        <RegisterForm />
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default AuthPage
