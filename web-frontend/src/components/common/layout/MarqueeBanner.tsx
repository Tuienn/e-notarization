import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface Props {
    content: string[]
}

const MarqueeBanner: React.FC<Props> = (props) => {
    return (
        <Box
            sx={{
                width: '100%',
                overflow: 'hidden',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                whiteSpace: 'nowrap',
                py: 1
            }}
        >
            <Box
                sx={{
                    display: 'inline-flex',
                    animation: 'marquee 20s linear infinite'
                }}
            >
                {props.content.map((text, index) => (
                    <Typography sx={{ mx: 2 }} key={index}>
                        {text}
                    </Typography>
                ))}
            </Box>
        </Box>
    )
}

export default MarqueeBanner
