import Button from '@mui/material/Button'
import { Link } from '@tanstack/react-router'

const HomePage: React.FC = () => {
    return (
        <div>
            <Button variant='contained'>
                <Link to='/lotto535' style={{ textDecoration: 'none', color: 'white' }}>
                    Go to test page
                </Link>
            </Button>
        </div>
    )
}

export default HomePage
