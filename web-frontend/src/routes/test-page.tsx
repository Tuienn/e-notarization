import { createFileRoute } from '@tanstack/react-router'
import TestPage from '../components/pages/test-page'

export const Route = createFileRoute('/test-page')({
    component: TestPage
})
