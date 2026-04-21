import { Container } from './container'

export function Footer() {
  return (
    <footer className="border-t">
      <Container>
        <div className="py-6">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              나의 옷장 - Notion 기반 옷장 관리 서비스
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
