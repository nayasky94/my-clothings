import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없음',
}

export default function NotFound() {
  return (
    <Container className="py-10">
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-muted-foreground mb-4 text-6xl font-bold">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-muted-foreground mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <Link href="/">
          <Button>홈으로 돌아가기</Button>
        </Link>
      </div>
    </Container>
  )
}
