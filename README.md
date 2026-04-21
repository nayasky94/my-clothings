# 나의 옷장

Notion을 CMS로 활용하여 보유 중인 옷을 체계적으로 정리하고 오늘의 착장을 기록하는 1인용 옷장 관리 서비스입니다.

## 프로젝트 개요

**목적**: Notion 데이터베이스를 옷장 CMS로 활용하여 보유 의류를 관리하고 매일 착장을 기록한다

**사용자**: 자신의 옷을 디지털로 관리하고 매일 착장을 기록하고 싶은 1인 사용자

**범위**: 인증 없이 단일 사용자가 사용하는 개인 서비스 (Notion 직접 편집으로 데이터 관리)

## 주요 페이지

1. **홈** (`/`) - 최근 기록된 착장 목록을 날짜 내림차순 카드로 표시
2. **오늘의 착장** (`/outfit`) - Notion 옷장에서 오늘 입은 옷을 다중 선택하여 로컬 스토리지에 기록
3. **옷장** (`/wardrobe`) - Notion 데이터베이스 전체 옷 목록 조회, 카테고리 필터 및 키워드 검색

## 핵심 기능

- Notion API 연동으로 옷 목록 실시간 조회 (F001)
- 카테고리 필터링 - 상의/하의/아우터/신발/액세서리 (F002)
- 옷 이름 및 태그 기준 키워드 검색 (F003)
- 오늘의 착장 다중 선택 및 로컬 스토리지 저장 (F004)
- 최근 착장 기록 홈 화면 카드 목록 표시 (F005)
- 모바일/태블릿/데스크톱 반응형 레이아웃 (F011)

## 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui (new-york style) + Lucide React
- **CMS**: Notion API (`@notionhq/client`)
- **데이터 저장**: 로컬 스토리지 (착장 기록)
- **폼**: React Hook Form + Zod
- **배포**: Vercel

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. Notion 설정

1. [Notion My Integrations](https://www.notion.so/my-integrations) 접속 후 새 통합 생성
2. API 키 발급
3. Notion 데이터베이스 페이지 우상단 `...` > 연결 > 생성한 통합 연결
4. 데이터베이스 URL에서 Database ID 추출

### 3. 환경 변수 설정

`env.example`을 참고하여 `.env.local` 파일을 생성합니다.

```bash
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Notion 데이터베이스 스키마

| 필드명    | Notion 타입  | 설명                                   |
| --------- | ------------ | -------------------------------------- |
| Title     | title        | 옷 이름                                |
| Category  | select       | 상의 / 하의 / 아우터 / 신발 / 액세서리 |
| Tags      | multi_select | 캐주얼, 여름, 면 등                    |
| Published | date         | 구매일                                 |
| Status    | select       | 보유중 / 처분                          |

### 5. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인합니다.

### 6. 빌드

```bash
npm run build
```

## 개발 상태

- 기본 프로젝트 구조 설정 완료
- 페이지 라우트 생성 완료 (홈, 오늘의 착장, 옷장)
- Notion API 클라이언트 라이브러리 구성 완료
- Notion 실제 데이터 연동 구현 예정
- 옷 카드 그리드 UI 구현 예정
- 착장 선택 및 저장 로직 구현 예정
- 카테고리 필터 및 검색 구현 예정

## 문서

- [PRD 문서](./docs/PRD.md) - 상세 요구사항
- [개발 로드맵](./docs/ROADMAP.md) - 개발 계획
- [개발 가이드](./CLAUDE.md) - 개발 지침
