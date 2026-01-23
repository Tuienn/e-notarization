import MainLayout from '../../common/layout/MainLayout'
import GameSelector from './GameSelector'
import mega645Image from '../../../assets/images/mega645.webp'

const HomePage: React.FC = () => {
    return (
        <MainLayout>
            <GameSelector
                status='Nay xổ'
                time={{
                    periodNumber: 1234,
                    weekday: 'Thứ 4',
                    date: '12/12/2024'
                }}
                jackpotValue='29.100.546.500đ'
                countdown={{ hours: '02', minutes: '15', seconds: '34' }}
                hrefTo='/mega645'
                imageUrl={mega645Image}
                primaryColor='red'
            />
        </MainLayout>
    )
}

export default HomePage
