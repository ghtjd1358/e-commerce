# DOGUN-DOGUN
![바이핸드](https://github.com/wjstjdus96/byhand/assets/77755620/50bc1609-2987-4cd5-b32d-22c5581c8965)

#### 프로젝트 소개

총기 거래가 가능한 커머스 플랫폼입니다. 


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

<img src="https://img.shields.io/badge/Zustand-1E4CC9?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">

<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=netlify&logoColor=white">

<br/>

## 📌 기능구현

- 사용자 인증 및 권한 관리
- 전체 상품 및 상품 상세 조회
- 구매자 장바구니 관리
- 구매자 상품주문 관리
- 판매자 상품주문 관리


<br/>

## 🔥 성능 최적화
- [로딩최적화로 퍼포먼스 점수 16% 개선](https://hojjangfe1358.tistory.com/50)

- [이미지 최적화로 이미지 크기 90% 이상 축소](https://hojjangfe1358.tistory.com/49)

- [번들러 최적화](https://hojjangfe1358.tistory.com/51)
<br/>  

## 🔫 트러블 슈팅
- [Grid 아이템 이미지 로딩 후 리플로우 이슈 해결](https://comprogramming.tistory.com/116)
  
- [Prefetch 적용 및 네트워크 요청 수정](https://hojjangfe1358.tistory.com/52)

<br/>  

## 💭 기술적 의사결정

- [에러 바운더리를 사용한 선언적 에러 핸들링](https://comprogramming.tistory.com/121)   

- [컴파운트 컴포넌트를 활용한 공통 컴포넌트 재사용성과 가독성 향상](https://comprogramming.tistory.com/117)

<br/>

## 🏗 아키텍쳐
![바이핸드아키테쳐](https://github.com/wjstjdus96/byhand/assets/77755620/fa74af48-df72-4b3c-9fb8-6699ba9c5972)
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
