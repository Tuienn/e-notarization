import ResponsiveButton from '../../common/mui/ResponsiveButton'
import ThemeSwitch from '../../common/setting/ThemeSwitch'
import SettingsIcon from '@mui/icons-material/Settings'

const HomePage: React.FC = () => {
    return (
        <div>
            <div className='container children-main-layout'>
                Test content <ThemeSwitch />
                <ResponsiveButton icon={<SettingsIcon />} variant='contained' color='error'>
                    Settings
                </ResponsiveButton>
                <div>
                    Test personal page
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content</p>
                    <p>Test personal page content1</p>
                </div>
            </div>
        </div>
    )
}

export default HomePage
