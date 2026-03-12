import Container from '@mui/material/Container'
import PageHeader from '../../common/layout/PageHeader'
import MarqueeBanner from '../../common/layout/MarqueeBanner'
import Ball3D from '../../common/common/Ball3D'
import Stack from '@mui/material/Stack'

const Lotto535Page: React.FC = () => {
    return (
        <main>
            <PageHeader title='Lotto 5/35' hasBackButton />
            <MarqueeBanner
                content={[
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                ]}
            />
            <Container className='children-main-layout' maxWidth='lg'>
                <Stack direction='row' spacing={1.5}>
                    <Ball3D content="01" color="green" />
                    <Ball3D content="60" color="blue" />
                    <Ball3D content="12" color="orange" />
                    <Ball3D content="01" color="green" />
                    <Ball3D content="60" color="blue" />
                    <Ball3D content="12" color="orange" />
                </Stack>
            </Container>
        </main>
    )
}

export default Lotto535Page
