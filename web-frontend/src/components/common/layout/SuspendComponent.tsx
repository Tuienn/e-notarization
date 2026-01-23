import Stack from '@mui/material/Stack'
import svgLoading from '../../../assets/svg/loading.svg'

const SuspendComponent: React.FC = () => {
    return (
        <Stack minHeight='100vh' alignItems='center' justifyContent='center' gap={1}>
            <img src={svgLoading} alt='loading' width={40} />
        </Stack>
    )
}

export default SuspendComponent
