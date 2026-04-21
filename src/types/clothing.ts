export interface Clothing {
  id: string
  name: string
  category: string
  tags: string[]
  purchasedAt: string | null
  status: string
}

export interface NotionClothingPage {
  id: string
  properties: {
    Title: { title: Array<{ plain_text: string }> }
    Category: { select: { name: string } | null }
    Tags: { multi_select: Array<{ name: string }> }
    Published: { date: { start: string } | null }
    Status: { select: { name: string } | null }
  }
}
