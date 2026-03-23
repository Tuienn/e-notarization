import Container from '@mui/material/Container'
import PageHeader from '../../common/layout/PageHeader'
import MarqueeBanner from '../../common/layout/MarqueeBanner'
import Stack from '@mui/material/Stack'
import RowTicket from './RowTicket'

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
                <Stack spacing={1.5}>
                    <RowTicket numbers={['01', '60', '12', '01', '60', '12']} color='green' />
                    <RowTicket numbers={['01', '60', '12', '01', '60', '12']} color='blue' />
                    <RowTicket numbers={['01', '60', '12', '01', '60', '12']} color='orange' />
                </Stack>
            </Container>
        </main>
    )
}

export default Lotto535Page
