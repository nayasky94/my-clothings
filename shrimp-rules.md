# Development Guidelines — 나의 옷장

## Project Overview

- **Service**: 1인용 의류 관리 + 착장 기록 웹 앱 (인증 불필요)
- **CMS**: Notion API (의류 데이터 단일 출처)
- **Stack**: Next.js 15.5.3 App Router + React 19 + TypeScript 5 + TailwindCSS v4 + shadcn/ui (new-york)

---

## Project Architecture

### Directory Map

```
src/
├── app/                  # App Router pages & layouts
│   ├── layout.tsx        # Root layout (수정 시 providers/ 확인 필수)
│   ├── page.tsx          # 홈: 최근 착장 표시
│   ├── outfit/page.tsx   # 오늘의 착장 선택
│   └── wardrobe/page.tsx # 의류 목록 조회
├── components/
│   ├── ui/               # shadcn/ui 자동 생성 컴포넌트 (직접 편집 금지)
│   ├── layout/           # Header, Footer, Container
│   ├── navigation/       # MainNav, MobileNav
│   └── providers/        # ThemeProvider
├── lib/
│   ├── notion.ts         # Notion API 클라이언트 (서버 전용)
│   ├── env.ts            # 환경변수 Zod 검증 (환경변수 접근 시 반드시 사용)
│   └── utils.ts          # cn() 유틸리티
docs/
├── PRD.md                # 기능 요구사항 (기능 추가 전 반드시 확인)
├── ROADMAP.md            # 개발 단계 및 태스크 (작업 완료 시 업데이트)
└── guides/               # 코딩 가이드 (구현 전 참조)
```

### Path Alias

- 모든 import에 `@/` 사용: `@/components/ui/button`, `@/lib/utils`
- 상대 경로(`../`) 사용 금지

---

## Code Standards

### Naming

- **파일명**: `kebab-case.tsx` (예: `clothing-card.tsx`, `use-wardrobe.ts`)
- **컴포넌트명**: PascalCase (예: `ClothingCard`)
- **변수/함수**: camelCase, 함수는 동사로 시작 (예: `getClothingList`, `handleSubmit`)
- **타입/인터페이스**: PascalCase (예: `ClothingItem`, `OutfitRecord`)

### Formatting

- 들여쓰기: **4칸 스페이스**
- 커밋 메시지: **한글** 작성, 이모지 허용
- 주석: 최소화, 필요 시 한글 가능

---

## Component Rules

### Server vs Client 컴포넌트

- **기본값**: Server Component (최상단에 `'use client'` 없음)
- **Client Component 필수 조건**: `useState`, `useEffect`, `useRouter`, 이벤트 핸들러 사용 시
- Notion API 호출은 **반드시 Server Component 또는 Server Action**에서만
- Client Component에서 `src/lib/notion.ts` 직접 import 금지

### 컴포넌트 위치 규칙

| 상황                   | 위치                                             |
| ---------------------- | ------------------------------------------------ |
| shadcn/ui 신규 설치    | `src/components/ui/` (자동 생성, 직접 편집 금지) |
| 페이지 공통 레이아웃   | `src/components/layout/`                         |
| 네비게이션 관련        | `src/components/navigation/`                     |
| Context/Provider       | `src/components/providers/`                      |
| 페이지 전용 컴포넌트   | `src/app/[route]/_components/`                   |
| 여러 페이지에서 재사용 | `src/components/[feature]/`                      |

---

## Notion API Usage

### 환경변수 접근

- 환경변수는 반드시 `src/lib/env.ts`의 `env` 객체를 통해 접근
- `process.env.NOTION_API_KEY` 직접 접근 금지

```typescript
// 올바름
import { env } from '@/lib/env'
const key = env.NOTION_API_KEY

// 금지
const key = process.env.NOTION_API_KEY
```

### Notion 클라이언트

- Notion 클라이언트 인스턴스는 `src/lib/notion.ts`에서만 생성
- 신규 Notion 함수는 `src/lib/notion.ts`에 추가

### ClothingItem 데이터 모델

```typescript
interface ClothingItem {
  id: string
  name: string
  category: string
  tags: string[]
  purchasedAt: string | null
  status: string // '보유중' 필터 기준
}
```

---

## Styling Rules

### TailwindCSS v4

- **설정 파일 없음** — `tailwind.config.*` 생성 금지
- 유틸리티 클래스 우선, inline style 금지
- CSS 변수는 `src/app/globals.css`에만 정의
- 커스텀 색상은 CSS 변수로 추가: `--color-custom: oklch(...)` 형식

### 클래스 병합

```typescript
import { cn } from '@/lib/utils'
// cn()으로 조건부 클래스 처리, clsx/twMerge 직접 import 금지
```

### 다크 모드

- `dark:` 변형 사용, `next-themes` ThemeProvider 이미 적용됨
- CSS 변수 방식 사용 (`.dark { --background: ... }` in globals.css)

### shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add [component-name]
# 설치 후 src/components/ui/에 자동 생성됨 — 직접 편집 금지
```

---

## Functionality Implementation

### 새 페이지 추가

1. `src/app/[route]/page.tsx` 생성
2. `generateMetadata` 또는 `metadata` export 추가
3. `src/components/navigation/main-nav.tsx`의 navItems 배열에 경로 추가
4. `src/components/navigation/mobile-nav.tsx`의 navItems 배열에 동일하게 추가

### 새 Notion 데이터 함수 추가

1. `src/lib/notion.ts`에 함수 추가
2. 반환 타입 인터페이스를 같은 파일에 정의
3. Server Component에서 직접 호출 또는 Server Action으로 래핑

### Server Actions

- `src/app/[route]/actions.ts` 또는 `src/lib/actions/` 에 위치
- 파일 최상단 `'use server'` 선언 필수
- Zod로 입력값 검증 후 처리

### Form 구현

- React Hook Form + Zod + Server Action 조합 사용
- `src/components/ui/form.tsx` 기반 컴포넌트 사용
- `useFormStatus`, `useActionState` 활용 (React 19)

---

## Multi-File Coordination

| 변경 사항                  | 동시 수정 필요 파일                                |
| -------------------------- | -------------------------------------------------- |
| 네비게이션 항목 추가/제거  | `main-nav.tsx` + `mobile-nav.tsx`                  |
| 환경변수 추가              | `src/lib/env.ts` + `env.example`                   |
| Notion 필드 변경           | `src/lib/notion.ts` (인터페이스 + 파싱 로직)       |
| 새 shadcn/ui 컴포넌트 설치 | `components.json` 자동 업데이트됨 (직접 수정 금지) |
| 태스크 완료                | `docs/ROADMAP.md` 상태 업데이트                    |
| 기능 추가                  | `docs/PRD.md` F00X 항목 확인 후 진행               |

---

## Workflow

### 작업 완료 체크리스트

```bash
npm run check-all   # typecheck + lint + format:check 통합 실행
npm run build       # 프로덕션 빌드 성공 확인
```

### 브랜치 전략

- 새 기능: `feature/기능명` 브랜치에서 작업
- main 브랜치에 직접 커밋 금지

### 개발 서버

```bash
npm run dev   # Turbopack 기반 개발 서버 (localhost:3000)
```

---

## AI Decision Rules

### 컴포넌트 위치 결정 우선순위

1. shadcn/ui 범주 → `src/components/ui/` (설치 명령 사용)
2. 특정 페이지에서만 사용 → `src/app/[route]/_components/`
3. 2개 이상 페이지 공유 → `src/components/[feature]/`
4. 전역 레이아웃 → `src/components/layout/`

### Server vs Client 결정

- 데이터 패칭, Notion 호출 → Server Component
- 사용자 인터랙션(클릭, 입력, 상태) → Client Component (`'use client'`)
- 혼합 필요 시 → Server Component가 데이터 fetch 후 Client Component에 props로 전달

### 모호한 상황 처리

- 기능 요구사항 불명확 → `docs/PRD.md` F00X 항목 우선 참조
- 구현 방법 불명확 → `docs/guides/` 해당 가이드 참조
- UI 패턴 불명확 → `docs/guides/component-patterns.md` 참조

---

## Prohibited Actions

- `src/components/ui/` 파일 직접 편집 (shadcn/ui 자동 생성 파일)
- `tailwind.config.*` 파일 생성
- `process.env` 직접 접근 (`src/lib/env.ts` 통해서만)
- Client Component에서 `src/lib/notion.ts` import
- `@/` 대신 상대 경로(`../`) 사용
- inline style 사용 (`style={{ }}`)
- `components.json` 직접 수정
- 인증/로그인 기능 추가 (1인용 서비스, 인증 불필요)
- `console.log` 프로덕션 코드에 잔류 (디버깅 후 제거)
- 이모지를 주석이나 변수명에 사용
