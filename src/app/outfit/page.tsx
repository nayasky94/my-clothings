import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
    title: '오늘의 착장 | 나의 옷장',
    description: '오늘 입은 옷을 선택하여 착장을 기록합니다',
}

export default function OutfitPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <Container className="py-10">
                    <h1 className="mb-8 text-2xl font-bold">오늘의 착장</h1>
                    <div className="text-muted-foreground flex flex-col items-center justify-center py-24 text-center">
                        <p className="mb-2 text-lg">Notion 연동이 필요합니다.</p>
                        <p className="text-sm">NOTION_API_KEY와 NOTION_DATABASE_ID 환경 변수를 설정해주세요.</p>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    )
}
