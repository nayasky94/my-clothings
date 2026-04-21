import { Metadata } from 'next'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  title: '옷장',
  description: '보유 중인 옷 목록을 카테고리별로 탐색합니다',
}

export default function WardrobePage() {
  return (
    <Container className="py-10">
      <h1 className="mb-8 text-2xl font-bold">옷장</h1>
      <div className="text-muted-foreground flex flex-col items-center justify-center py-24 text-center">
        <p className="mb-2 text-lg">Notion 연동이 필요합니다.</p>
        <p className="text-sm">
          NOTION_API_KEY와 NOTION_DATABASE_ID 환경 변수를 설정해주세요.
        </p>
      </div>
    </Container>
  )
}
