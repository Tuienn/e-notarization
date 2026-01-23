import { createFileRoute } from '@tanstack/react-router'
import MainLayout from '../components/common/layout/MainLayout'

export const Route = createFileRoute('/personal')({
    component: PersonalPage
})

function PersonalPage() {
    return <MainLayout>Thong tin ca nhan</MainLayout>
}
