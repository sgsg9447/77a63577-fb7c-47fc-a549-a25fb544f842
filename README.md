# 77a63577-fb7c-47fc-a549-a25fb544f842

## Project Introduction

## Getting Started / Installation

### Install Dependencies

```
yarn
```

### Run in Development Environment

```
yarn dev
```

## Directory Structure

```
src
┣ api
┃ ┗ index.ts
┣ assets
┃ ┗ BookmarkIcon.tsx
┣ components
┃ ┣ layout
┃ ┃ ┣ Header.tsx
┃ ┃ ┣ index.css
┃ ┃ ┗ index.tsx
┃ ┣ Loader.css
┃ ┣ Loader.tsx
┃ ┣ Table.css
┃ ┣ Table.tsx
┃ ┣ Typography.css
┃ ┗ Typography.tsx
┣ routes
┃ ┣ \_\_root.tsx
┃ ┣ bookmarks.index.tsx
┃ ┣ index.tsx
┃ ┣ markets.$marketId.tsx
┃ ┗ markets.index.tsx
┣ style
┃ ┣ index.css
┃ ┣ markets.css
┃ ┗ reset.css
┣ types
┃ ┗ index.ts
┣ utils
┃ ┗ index.ts
┣ main.tsx
┣ routeTree.gen.ts
┗ vite-env.d.ts
```

## Tech Stack

- TypeScript
- React
- Vite
- Axios
  - Axios는 비동기 HTTP 요청을 처리하는 데 널리 사용되는 라이브러리입니다. JSON 데이터를 쉽게 처리할 수 있으며, 요청 취소, HTTP 요청 중복 제거, 전역 에러 처리 등 편리한 기능을 제공합니다.
- TanStack Query
  - TanStack Query는 서버 상태 관리를 위한 라이브러리로, 데이터 캐싱, 배경 업데이트, 상태 동기화 등을 자동으로 처리해 주어 개발 생산성을 높여 줍니다.
- TanStack Router
  - TanStack Router는 선언적인 라우팅 접근 방식을 제공하여 라우트 관리를 간소화하고, 동적 라우팅 처리 시 유연성을 제공합니다.



## Project Results

### 공통사항

- [x] API 호출 시 Loader 컴포넌트가 호출되어 로딩 중임을 표시하고, 응답 완료 시 로딩 중 표시가 사라져야 합니다.
- [x] API 호출 실패 등 API 관련 모든 에러는 발생 시 예외 처리되어 사용자 액션을 막지 않아야 합니다.
- [x] Currency는 KRW와 USD만 지원하며, 금액은 세 자리마다 쉼표(,)로 구분하고 소수점 2자리까지 표시합니다. 또한 KRW일 경우 ₩, USD일 경우 $가 금액 앞에 붙습니다.
- [x] 변동률(%) 표기는 상승일 경우 빨간색, 하락일 경우 - 를 붙인 파란색으로 표기합니다.
- [x] 모든 페이지 이동은 새 탭이나 새 창이 아닌 페이지 전환으로 구현되어야 합니다.
- [x] 가상자산 시세 목록, 북마크 목록, 코인 상세 페이지는 개별 URL이 부여되어 직접 URL을 타이핑해도 접근할 수 있어야 합니다.
- [x] 코인 상세 페이지는 각 코인 별로도 구분되어 접근이 가능해야 합니다.
- [ ] 북마크는 Global state, LocalStorage 등 편한 방법으로 자유롭게 구현합니다.

### 필수 요구사항

- [x] React 최신 버전
- [x] ES6 이상의 JavaScript를 사용해서 구현
- [x] yarn start 또는 npm run start 명령어로 로컬 환경에서 실행이 가능
- [x] 프로젝트 구조, 실행 방법에 대한 설명 등이 포함된 Markdown 파일이 포함되어야 함
- [x] 작업 중 이해가 안되는 부분이 있을 경우, 편하게 구현한 뒤 Markdown에 해당 내용을 상세히 설명
- [x] react-dom, react-router-dom, vue-router 등 코어 라이브러리를 제외한 라이브러리를 사용할 경우, 해당 라이브러리 사용의 이유도 설명에 포함되어야 함
- [x]특별한 이유가 없을 경우 주요 모던 브라우저에서 기능의 차이 없이 동작해야 함

### 1. 가상자산 시세 목록(KRW/USD) 페이지

![Screenshot 2024-04-29 at 10 53 30 PM](https://github.com/sgsg9447/77a63577-fb7c-47fc-a549-a25fb544f842/assets/87474789/6c448952-ec5e-41fa-ac70-b7644ef31a7a)

- [x] 처음 화면은 상단 GNB 와 가상자산 마켓 목록으로 이루어져 있습니다.
- [x] 화면 진입 시 기본 설정은 페이지당 50개의 코인과 KRW 통화, 전체 보기 입니다.
- [x] 전체/북마크 보기를 제외한 리스트 변경 시마다 API 호출을 기본 원칙으로 합니다.
- [x] 마켓 목록 순서는 market cap 순위를 따릅니다.
- [] 마켓 목록 상단에 '전체/북마크 보기' select box가 있고, 북마크 보기로 변경 시 북마크가 되어 있는 코인들만 리스트에 표시됩니다.
- [x] 마켓 목록 상단에 통화를 변경할 수 있는 'KRW/USD 보기' select box가 있고, 변경 시 해당 통화로 API를 다시 호출하여 리스트를 다시 그립니다.
- [x] 마켓 목록 상단에 페이지당 표시 개수를 선택할 수 있는 '10/30/50개 보기' select box가 있고, 변경 시 해당 개수로 API를 다시 호출하여 리스트를 다시 그립니다.
- [x] 마켓 목록 하단의 '더 보기'를 클릭하면 API를 호출하여 select box에 설정되어 있는 개수만큼 코인을 더 불러와 표시합니다. (= 페이지네이션)
- [x] 각 코인 이름을 클릭하면 코인 상세 페이지로 이동합니다.
- [ ] 코인 이름 옆 북마크 표시를 클릭하면 북마크가 추가되었다는 Toast가 표시되고, 빈별이 아닌 채워진 별로 북마크 표시가 변경됩니다. 반대의 경우는 북마크가해제되었다는 Toast가 표시되고, 채워진 별에서 빈 별로 변경됩니다.
- [x] 다른 페이지를 갔다오거나 새로고침을 할 경우 기본 설정을 기준으로 리스트를 다시 그립니다.

### 2. 코인 상세 페이지

![Screenshot 2024-04-29 at 10 54 38 PM](https://github.com/sgsg9447/77a63577-fb7c-47fc-a549-a25fb544f842/assets/87474789/19a96857-afe5-4049-81f1-a4e0c9241fcc)

- [x] KRW, USD를 선택할 수 있는 통화 표시 select box가 있고, 변경 시 해당 내용으로 금액 표시와 가격 계산 통화가 변경됩니다. 기본 설정은 KRW 입니다
- [] 코인 이름 옆 북마크 표시를 클릭하면 북마크가 추가되었다는 Toast가 표시되고, 빈별이 아닌 채워진 별로 북마크 표시가 변경됩니다. 반대의 경우는 북마크가 해제되었다는 Toast가 표시되고, 채워진 별에서 빈 별로 변경됩니다.
- [x] 코인 설명은 설명보기를 클릭하면 표시되며 기본 한글, 한글이 없을 경우 영어로 표시됩니다. 둘 다 없을 경우 설명보기 영역이 표시되지 않습니다.
- [x] 가격 계산 컴포넌트
  - [x] Currency 입력은 숫자만 가능하며 KRW는 0으로 시작할 수 없습니다.
  - [x] Cryptocurrency는 숫자와 마침표(.)만 입력 가능하며, 소수점은 최대 8자리까지만 입력 가능합니다.
  - [x] 각 입력창의 해당 조건을 만족하지 않을 경우 타이핑(붙여넣기 포함)해도 입력이 되지 않아야 합니다.
  - [x] 입력창의 Currency 표시도 공통 사항에서 언급한 표기 규칙을 따릅니다.

### 3. 북마크 목록 페이지

- [] 앞의 화면에서 설정한 통화를 기반으로 북마크 마켓 목록을 구성합니다.
- [] 페이지네이션 없이 전체 북마크 목록을 표기합니다.
- [] 마켓 목록 순서는 market cap 순위를 따릅니다.
- [] 각 코인 이름을 클릭하면 코인 상세 페이지로 이동합니다.
- [] 코인 이름 옆 북마크 표시를 클릭하면 북마크가 해제되었다는 Toast가 표시되고, 해당 코인이 리스트에서 삭제됩니다.
