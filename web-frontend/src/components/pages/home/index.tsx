import MainLayout from '../../common/layout/MainLayout'
import GameSelectorItem from './GameSelectorItem'

const HomePage: React.FC = () => {
    return (
        <MainLayout>
            <GameSelectorItem
                badge='Nay xổ'
                gameName='Mega 6/45'
                drawCode='#01462'
                drawDate='Thứ 6, 23/01/2026'
                jackpot='29.100.546.500đ'
                numbers={[17, 53, 15]}
                countdown={{ hours: 17, minutes: 53, seconds: 15 }}
                onPlay={() => console.log('Play game')}
            />
        </MainLayout>
    )
}

export default HomePage
