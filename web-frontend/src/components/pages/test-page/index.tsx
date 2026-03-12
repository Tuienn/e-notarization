import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import PageHeader from '../../common/layout/PageHeader'

const TestPage: React.FC = () => {
    return (
        <main>
            <PageHeader title='Test Page' hasBackButton />
            <Container className='children-main-layout' maxWidth='lg'>
                <Button variant='contained'>Click me in test page</Button>
            </Container>
        </main>
    )
}

export default TestPage
