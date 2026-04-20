import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface OutfitRecord {
    id: string
    date: string
    clothingNames: string[]
    createdAt: string
}

function getRecentOutfits(): OutfitRecord[] {
    return []
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function HomePage() {
    const outfits = getRecentOutfits()

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <Container className="py-10">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">최근 착장</h1>
                        <Link href="/outfit">
                            <Button>오늘의 착장 기록하기</Button>
                        </Link>
                    </div>

                    {outfits.length === 0 ? (
                        <div className="text-muted-foreground flex flex-col items-center justify-center py-24 text-center">
                            <p className="mb-4 text-lg">아직 기록된 착장이 없습니다.</p>
                            <p className="mb-8 text-sm">오늘의 착장을 기록해보세요!</p>
                            <Link href="/outfit">
                                <Button variant="outline">첫 착장 기록하기</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {outfits.map(outfit => (
                                <Card key={outfit.id}>
                                    <CardHeader>
                                        <CardTitle className="text-base">{formatDate(outfit.date)}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="text-muted-foreground space-y-1 text-sm">
                                            {outfit.clothingNames.map((name, index) => (
                                                <li key={index}>{name}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </Container>
            </main>
            <Footer />
        </div>
    )
}
