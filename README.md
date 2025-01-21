# DOGUN-DOGUN
<img width="949" alt="스크린샷 2024-12-13 200311" src="https://github.com/user-attachments/assets/2325afd8-c29b-431e-a37d-0f61e420df9d" />
<img width="930" alt="스크린샷 2024-12-13 200233" src="https://github.com/user-attachments/assets/87723ac6-4ab5-411c-b2bc-11b62e0e8228" />

#### 프로젝트 소개

장난감 총기 거래가 가능한 커머스 플랫폼입니다. 


#### 프로젝트 진행기간

2024.10 ~ 2024.11 (4주)

#### 프로젝트 배포링크
[ DOGUN-DOGUN 배포링크 ](https://dogundogun.vercel.app/)


##### 테스트 계정
> 구매자   
> ID: seller@test.com   
> PW: 123qweQWE!
>
> 판매자   
> ID: buyer@test.com   
> PW: 123qweQWE!
<br/>



## 🛠 기술스택

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">

<img src="https://img.shields.io/badge/Zustand-1E4CC9?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"> <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white">

<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white">

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=netlify&logoColor=white">
<br/>

## 💭 기술적 의사결정

- [선언적 에러 핸들링](https://velog.io/@ghtjd1358/%EC%84%A0%EC%96%B8%EC%A0%81-%EC%97%90%EB%9F%AC-%ED%95%B8%EB%93%A4%EB%A7%81-zk75ulxs)

- [전역상태관리에 관하여](https://velog.io/@ghtjd1358/%EC%A0%84%EC%97%AD%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC%EC%97%90-%EA%B4%80%ED%95%98%EC%97%AC)

- [Tanstack Query를 선택한 이유](https://velog.io/@ghtjd1358/Tanstack-Query-%EC%84%A0%ED%83%9D%ED%95%9C-%EC%9D%B4%EC%9C%A0)


<br/>


## 📌 주요기능
- [RHF + Zod를 활용한 회원가입, 로그인 Form 과 유효성 검사 구현](https://velog.io/@ghtjd1358/RHF-Zod%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EB%A1%9C%EA%B7%B8%EC%9D%B8-Form-%EA%B3%BC-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%82%AC-%EA%B5%AC%ED%98%84)
- [Firebase + Zustand + js-Cookie + React-query 로그인 상태관리 및 유지](https://velog.io/@ghtjd1358/Firebase-Zustand-js-Cookie-React-query-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EB%B0%8F-%EC%9C%A0%EC%A7%80)
- [쿼리 파라미터(Query Parameter) 활용하여 필터링 기능](https://velog.io/@ghtjd1358/%EC%BF%BC%EB%A6%AC-%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0Query-Parameter-%ED%99%9C%EC%9A%A9%ED%95%98%EC%97%AC-%ED%95%84%ED%84%B0%EB%A7%81-%EA%B8%B0%EB%8A%A5)
- Tanstack Query 활용한 페이지네이션, 무한스크롤
- 카카오 우편번호 API, 포트원 SDK 활용하여 배송 정보 입력 및 결제 기능
- Local Storage를 활용한 장바구니 관리
- invalidateQueries를 활용한 자동 업데이트

<br/>

## 🔥 성능 최적화
- [최적화로 Lighthouse 성능 점수 개선](https://velog.io/@ghtjd1358/%EC%B5%9C%EC%A0%81%ED%99%94%EB%A1%9C-Lighthouse-%EC%84%B1%EB%8A%A5-%EC%A0%90%EC%88%98-%EA%B0%9C%EC%84%A0)   

- [WebP, Reszie 이미지 최적화 크기 90% 축소](https://velog.io/@ghtjd1358/WebP-Reszie-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B5%9C%EC%A0%81%ED%99%94-%ED%81%AC%EA%B8%B0-90-%EC%B6%95%EC%86%8C)
  
- [번들 사이즈 최적화(트리쉐이킹, 코드스플리팅, Gzip)](https://velog.io/@ghtjd1358/%EB%B2%88%EB%93%A4-%EC%82%AC%EC%9D%B4%EC%A6%88-%EC%B5%9C%EC%A0%81%ED%99%94%ED%8A%B8%EB%A6%AC%EC%89%90%EC%9D%B4%ED%82%B9-%EC%BD%94%EB%93%9C%EC%8A%A4%ED%94%8C%EB%A6%AC-Gzip)

- [상세상품 Prefetch 및 불필요한 네트워크 요청 해결](https://velog.io/@ghtjd1358/%EC%83%81%EC%84%B8%EC%83%81%ED%92%88-Prefetch-%EB%B0%8F-%EB%B6%88%ED%95%84%EC%9A%94%ED%95%9C-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%9A%94%EC%B2%AD-%ED%95%B4%EA%B2%B0)

- [렌더링 최적화(React.memo, useCallback, useMemo)](https://velog.io/@ghtjd1358/React.memo-useCallback-useMemo%EC%9C%BC%EB%A1%9C-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%B5%9C%EC%A0%81%ED%99%94)
<br/>  



## 🏗 아키텍쳐
![두건두건아키테쳐](https://github.com/wjstjdus96/byhand/assets/77755620/fa74af48-df72-4b3c-9fb8-6699ba9c5972)

## 🏗 와이어프레임 구조 설계
> 사용한 디자인 톨 : Miro  
> 설계 기준 : 페이지 및 컴포넌트 단위
![image](https://github.com/user-attachments/assets/eddda52b-bf6c-4b51-9090-75ca769dd52d)

<br/>

## 🗂 폴더구조

```
┣ 📁__mocks__
┣ 📁__test__
┣ 📁public
┣ 📁src
  ┣ 📁api
  ┣ 📁assets
  ┣ 📁components
      ┣ 📁admin
      ┣ 📁auth
      ┣ 📁cart
      ┣ 📁common
      ┣ 📁home
      ┣ 📁myPage
      ┣ 📁payment
      ┣ 📁productDetail
      ┣ 📁products
      ┣ 📁ui
  ┣ 📁consts
  ┣ 📁hooks
      ┣ 📁auth
      ┣ 📁cart
      ┣ 📁form
      ┣ 📁home
      ┣ 📁myPage
      ┣ 📁payment
      ┣ 📁productDetail
      ┣ 📁products
      ┣ 📁seller
  ┣ 📁layout
  ┣ 📁lib
  ┣ 📁pages
      ┣ 📁error
  ┣ 📁router
  ┣ 📁store
  ┣ 📁styles
  ┣ 📁types
  ┣ 📁utils

```

- apps : 개별 프로젝트 저장소
  - e-commerce: 장난감 총 e-commerce 프로젝트
    - app: 전역 설정 및 초기화 파일
    - features: 기능별 모듈(api, hooks 포함)
    - pages: 페이지별 컴포넌트
    - shared: 공용 컴포넌트 및 훅
    - store: Zustand 기반 전역 상태 관리
- packages: 프로젝트 공용 패키지
  - ui: 디자인 시스템
    - components: 디자인 시스템 컴포넌트
    - hooks: 시스템 전용 커스텀 훅
