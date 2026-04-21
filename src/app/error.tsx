'use client'

import { useEffect } from 'react'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container className="py-10">
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="mb-4 text-2xl font-semibold">오류가 발생했습니다</h1>
        <p className="text-muted-foreground mb-8">
          예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>
        <Button onClick={reset}>다시 시도</Button>
      </div>
    </Container>
  )
}
