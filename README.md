# OneWave

스타트업 아이디어를 AI로 분석하고, 팀을 구성하고, 로드맵을 생성하는 플랫폼입니다.

## 기능

- **아이디어 등록 & AI 분석** - 아이디어를 입력하면 AI가 시장성, 실현 가능성 등을 분석
- **피드** - 커뮤니티에서 아이디어를 공유하고 업보트
- **팀 빌딩** - 아이디어에 맞는 팀원을 모집하고 참여
- **로드맵 생성** - 팀 규모, 예산, 일정에 맞는 실행 로드맵 생성

## 기술 스택

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State**: React Hooks

## 시작하기

```bash
# 패키지 설치
npm install

# 환경 변수 설정
cp .env.example .env.local

# 개발 서버 실행
npm run dev
```

http://localhost:3000 에서 확인

## 환경 변수

| 변수명                | 설명           | 기본값                             |
| --------------------- | -------------- | ---------------------------------- |
| `NEXT_PUBLIC_API_URL` | 백엔드 API URL | `https://onewave.syu-likelion.org` |

## 페이지 구조

| 경로          | 설명                                    |
| ------------- | --------------------------------------- |
| `/`           | 메인 랜딩 페이지                        |
| `/feed`       | 아이디어 피드 (로그인 필요)             |
| `/ideas/new`  | 새 아이디어 등록                        |
| `/ideas/[id]` | 아이디어 상세 & AI 분석                 |
| `/roadmap`    | 로드맵 생성                             |
| `/mypage`     | 마이페이지 (아이디어, 로드맵, 팀, 설정) |
| `/login`      | 로그인                                  |
| `/signup`     | 회원가입                                |

## 스크립트

```bash
npm run dev    # 개발 서버
npm run build  # 프로덕션 빌드
npm run start  # 프로덕션 실행
npm run lint   # ESLint 검사
```

## 팀

- 삼육대학교 멋쟁이사자처럼 T17
