// 로드맵 목업 데이터

import type { Roadmap, RoadmapFormData, getCaseKey } from './types';

// 솔로 + 0원 + 1개월 케이스 (기본)
const SOLO_ZERO_1MONTH: Roadmap = {
  id: 'solo_zero_1month',
  caseKey: 'solo_zero_1month',
  title: '🚀 솔로 부트스트래핑 로드맵',
  description: '혼자서 0원으로 1개월 안에 MVP를 만들고 검증하는 로드맵입니다.',
  totalCost: 0,
  weeks: [
    {
      week: 1,
      title: '아이디어 검증 + 마켓 조사',
      goal: '타겟 고객 10명 인터뷰 → 시장 수요 확인 → 경쟁 분석',
      estimatedCost: 0,
      days: [
        {
          day: '월요일',
          tasks: [
            {
              title: '타겟 고객 5가지 특징 정하기',
              duration: '30분',
              description:
                '예: "취업 준비 중인 개발자, 25-35세, 한국, 부트캠프 수료생"',
              tools: [{ name: 'Notion', url: 'https://www.notion.so/' }],
            },
            {
              title: '인터뷰 질문 5개 만들기',
              duration: '30분',
              description:
                '핵심 질문: 가장 힘든 점, 현재 사용 서비스, 지불 의향 등',
            },
            {
              title: '인터뷰 일정 잡기',
              duration: '1시간',
              description: 'LinkedIn, Twitter, 개발 커뮤니티에서 모집',
              tools: [
                { name: '디스코드', url: 'https://discord.com/' },
                { name: '당근마켓', url: 'https://www.daangn.com/' },
              ],
            },
          ],
        },
        {
          day: '화~목요일',
          tasks: [
            {
              title: '타겟 고객 인터뷰 5명',
              duration: '1.5시간',
              description: '1인당 15분, Google Meet으로 진행',
              tools: [
                { name: 'Google Meet', url: 'https://meet.google.com/' },
                { name: 'Google Docs', url: 'https://docs.google.com/' },
              ],
            },
            {
              title: '주요 인사이트 정리',
              duration: '30분',
              description: '공통된 문제 3개 추출',
            },
          ],
        },
        {
          day: '금요일',
          tasks: [
            {
              title: '경쟁사 5개 분석',
              duration: '2시간',
              description: 'SWOT 분석, 장단점 비교표 작성',
              tools: [
                { name: 'Google Sheets', url: 'https://sheets.google.com/' },
              ],
            },
            {
              title: '랜딩페이지 만들기',
              duration: '2시간',
              description: '노코드로 빠르게 제작',
              tools: [
                { name: 'Notion', url: 'https://www.notion.so/' },
                { name: 'Carrd', url: 'https://carrd.co/' },
              ],
            },
            {
              title: 'SNS 테스트 게시',
              duration: '30분',
              description: 'Twitter, 개발자 커뮤니티에 공유',
            },
          ],
        },
      ],
      summary: [
        '인터뷰 데이터: 5명, 공통 pain point 3개 추출',
        '경쟁사 분석: 5개사 SWOT 완성',
        '랜딩페이지: 라이브',
        '초기 관심: 50명 (목표)',
      ],
      tips: [
        '인터뷰는 "왜?"를 3번 이상 물어보세요',
        '경쟁사 분석은 "우리가 더 잘할 수 있는 점"에 집중',
      ],
    },
    {
      week: 2,
      title: 'MVP 개발 (핵심 기능 3개만)',
      goal: '아이디어 검증 + 팀 매칭 + 자금 로드맵 기본 버전 완성',
      estimatedCost: 0,
      days: [
        {
          day: '월~화요일',
          tasks: [
            {
              title: '아이디어 검증 AI 코치 개발',
              duration: '6시간',
              description: 'OpenAI API 연동 + 채팅 UI',
              tools: [
                { name: 'OpenAI API', url: 'https://platform.openai.com/' },
                {
                  name: 'react-markdown',
                  url: 'https://github.com/remarkjs/react-markdown',
                },
              ],
            },
          ],
        },
        {
          day: '수~목요일',
          tasks: [
            {
              title: '팀 매칭 기능 개발',
              duration: '6시간',
              description: '프로필 DB + 카드 스와이프 UI',
              tools: [
                { name: 'Supabase', url: 'https://supabase.com/' },
                {
                  name: 'react-tinder-card',
                  url: 'https://github.com/3DJakob/react-tinder-card',
                },
              ],
            },
          ],
        },
        {
          day: '금요일',
          tasks: [
            {
              title: '자금 로드맵 기능 개발',
              duration: '5시간',
              description: '설문 폼 + 로드맵 표시 UI',
            },
          ],
        },
      ],
      summary: [
        'API 3개: 검증, 매칭, 로드맵 완성',
        'UI 완성: 3개 탭 모두 기본 완성',
        '로컬 테스트: 기본 기능 동작 확인',
      ],
      tips: [
        '완벽하지 않아도 됨, 핵심 기능만 동작하면 OK',
        'Git commit을 자주 하세요',
      ],
    },
    {
      week: 3,
      title: '테스트 + 마케팅 준비',
      goal: '베타 테스터 20명 모집 → 피드백 수집 → 개선',
      estimatedCost: 0,
      days: [
        {
          day: '월요일',
          tasks: [
            {
              title: 'Vercel 배포',
              duration: '1시간',
              description: 'GitHub 연동 후 자동 배포',
              tools: [{ name: 'Vercel', url: 'https://vercel.com/' }],
            },
          ],
        },
        {
          day: '화~목요일',
          tasks: [
            {
              title: '베타 테스터 모집 및 테스트',
              duration: '8시간',
              description: 'Google Form으로 모집, 실시간 피드백 수집',
              tools: [
                { name: 'Google Forms', url: 'https://forms.google.com/' },
              ],
            },
            {
              title: '버그 수정',
              duration: '4시간',
              description: '발견된 버그 우선순위별 수정',
            },
          ],
        },
        {
          day: '금요일',
          tasks: [
            {
              title: 'ProductHunt 준비',
              duration: '2시간',
              description: '제품 이미지, 설명, 비디오 준비',
              tools: [
                { name: 'Canva', url: 'https://www.canva.com/' },
                { name: 'CapCut', url: 'https://www.capcut.com/' },
              ],
            },
            {
              title: '개발 로그 블로그 작성',
              duration: '2시간',
              description: '"5일 만에 MVP 만든 과정" 포스트',
              tools: [{ name: 'Velog', url: 'https://velog.io/' }],
            },
          ],
        },
      ],
      summary: [
        '배포 완료',
        '베타 테스터: 20명 확보',
        '주요 개선사항 3개 적용',
        'ProductHunt 준비 완료',
      ],
    },
    {
      week: 4,
      title: '공식 출시 + 성장 전략',
      goal: '공식 출시 → 첫 100명 유저 확보 → 초기 수익화',
      estimatedCost: 0,
      days: [
        {
          day: '월요일',
          tasks: [
            {
              title: 'ProductHunt 게시',
              duration: '1시간',
              description: '오전 10시 (한국 오후 2시) 게시 추천',
              tools: [
                { name: 'ProductHunt', url: 'https://www.producthunt.com/' },
              ],
            },
            {
              title: 'SNS 동시 공지',
              duration: '1시간',
              description: 'Twitter, LinkedIn, Instagram',
            },
          ],
        },
        {
          day: '화~목요일',
          tasks: [
            {
              title: 'SNS 마케팅',
              duration: '매일 2시간',
              description: 'Twitter 하루 2-3회, LinkedIn 인사이트 공유',
            },
            {
              title: '커뮤니티 활동',
              duration: '매일 1시간',
              description: '개발자 그룹에서 답변, 멘토링',
            },
            {
              title: '초기 유저 케어',
              duration: '매일 2시간',
              description: '피드백 24시간 내 답장, 버그 즉시 수정',
            },
          ],
        },
        {
          day: '금요일',
          tasks: [
            {
              title: '프리미엄 모델 출시',
              duration: '2시간',
              description: '무료 vs 프리미엄 (월 4,900원) 구성',
            },
            {
              title: '결제 연동',
              duration: '3시간',
              description: 'Stripe 또는 Toss Payments',
              tools: [
                { name: 'Stripe', url: 'https://stripe.com/' },
                {
                  name: 'Toss Payments',
                  url: 'https://developers.tosspayments.com/',
                },
              ],
            },
          ],
        },
      ],
      summary: [
        '공식 출시 완료',
        '목표: 100명 가입, 5명 프리미엄',
        '월 예상 매출: 25,000원',
      ],
      tips: [
        '입소문 > 광고: 초기 100명은 SNS와 커뮤니티로만',
        '완벽함 < 빠름: 80% 완성도로 시작',
        '데이터 > 직관: Google Analytics 매일 확인',
      ],
    },
  ],
};

// 모든 로드맵 데이터 (케이스키 → 로드맵)
// TODO: 다른 케이스 추가 예정 (백엔드 연동 시)
const ROADMAP_DATA: Record<string, Roadmap> = {
  solo_zero_1month: SOLO_ZERO_1MONTH,
  // 다른 케이스들은 기본 로드맵을 수정하여 제공
};

// 케이스에 맞는 로드맵 가져오기
export function getRoadmapByCase(formData: {
  teamSize: string;
  budget: string;
  period: string;
  priority: string;
}): Roadmap {
  const caseKey = `${formData.teamSize}_${formData.budget}_${formData.period}`;

  // 해당 케이스가 있으면 반환, 없으면 기본 로드맵 수정하여 반환
  if (ROADMAP_DATA[caseKey]) {
    return ROADMAP_DATA[caseKey];
  }

  // 기본 로드맵을 기반으로 케이스에 맞게 수정
  const baseRoadmap = { ...SOLO_ZERO_1MONTH };

  // 팀 규모에 따른 수정
  if (formData.teamSize === 'small') {
    baseRoadmap.title = '🚀 소규모 팀 로드맵';
    baseRoadmap.description =
      '2-3명의 팀으로 효율적으로 MVP를 만드는 로드맵입니다.';
  } else if (formData.teamSize === 'team') {
    baseRoadmap.title = '🚀 팀 창업 로드맵';
    baseRoadmap.description =
      '4명 이상의 팀으로 체계적으로 진행하는 로드맵입니다.';
  }

  // 예산에 따른 수정
  if (formData.budget === 'low') {
    baseRoadmap.totalCost = 100000;
    baseRoadmap.description += ' (예산: 10만원 이하)';
  } else if (formData.budget === 'mid') {
    baseRoadmap.totalCost = 1000000;
    baseRoadmap.description += ' (예산: 100만원 이하)';
  }

  // 기간에 따른 수정
  if (formData.period === '3months') {
    baseRoadmap.description = baseRoadmap.description.replace('1개월', '3개월');
  } else if (formData.period === '6months') {
    baseRoadmap.description = baseRoadmap.description.replace('1개월', '6개월');
  }

  baseRoadmap.id = caseKey;
  baseRoadmap.caseKey = caseKey;

  return baseRoadmap;
}

export { SOLO_ZERO_1MONTH };
