import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export interface ClothingItem {
    id: string
    name: string
    category: string
    tags: string[]
    purchasedAt: string | null
    status: string
}

type SearchResultItem = Awaited<ReturnType<typeof notion.search>>['results'][number]

function isFullPage(item: SearchResultItem): boolean {
    return item.object === 'page' && 'properties' in item
}

function getStringProp(props: Record<string, unknown>, key: string, type: string): unknown {
    const prop = props[key]
    if (typeof prop === 'object' && prop !== null && (prop as Record<string, unknown>).type === type) {
        return prop
    }
    return null
}

function extractName(props: Record<string, unknown>): string {
    const prop = getStringProp(props, 'Title', 'title') as { title: Array<{ plain_text: string }> } | null
    return prop?.title?.[0]?.plain_text ?? ''
}

function extractSelect(props: Record<string, unknown>, key: string): string {
    const prop = getStringProp(props, key, 'select') as { select: { name: string } | null } | null
    return prop?.select?.name ?? ''
}

function extractMultiSelect(props: Record<string, unknown>, key: string): string[] {
    const prop = getStringProp(props, key, 'multi_select') as { multi_select: Array<{ name: string }> } | null
    return prop?.multi_select?.map(t => t.name) ?? []
}

function extractDate(props: Record<string, unknown>, key: string): string | null {
    const prop = getStringProp(props, key, 'date') as { date: { start: string } | null } | null
    return prop?.date?.start ?? null
}

export async function getClothingList(): Promise<ClothingItem[]> {
    const response = await notion.search({
        filter: { property: 'object', value: 'page' },
        sort: { direction: 'descending', timestamp: 'last_edited_time' },
    })

    return response.results
        .filter(isFullPage)
        .map(item => {
            const page = item as SearchResultItem & { properties: Record<string, unknown> }
            const props = page.properties
            return {
                id: page.id,
                name: extractName(props),
                category: extractSelect(props, 'Category'),
                tags: extractMultiSelect(props, 'Tags'),
                purchasedAt: extractDate(props, 'Published'),
                status: extractSelect(props, 'Status'),
            }
        })
        .filter(item => item.status === '보유중')
}
