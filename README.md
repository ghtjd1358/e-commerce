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

<img src="https://img.shields.io/badge/Zustand-1E4CC9?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">

<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=netlify&logoColor=white">
<br/>

## 📌 주요기능
- RHF + Zod를 활용한 유효성 검사
- 계정 관리 / 구글로그인
- Query 파라미터 활용하여 필터링 기능
- Tanstack Query 활용한 페이지네이션, 캐시관리
- 카카오 우편번호 API, 포트원 SDK 활용하여 배송 정보 입력 및 결제 기능
- Local Storage를 활용한 장바구니 관리

<br/>

## 🔥 성능 최적화
- [최적화로 Lighthouse 성능 점수 개선](https://hojjangfe1358.tistory.com/50)   

- [Webp, Resizer 이미지 압축 및 품질 유지](https://hojjangfe1358.tistory.com/49)
  
- [번들 최적화, 코드 스플리팅, 종속성 정리](https://hojjangfe1358.tistory.com/51)

- [Prefetch 및 네트워크 요청 최적화](https://hojjangfe1358.tistory.com/52)
<br/>  


## 🏗 아키텍쳐
![두건두건아키테쳐](https://github.com/wjstjdus96/byhand/assets/77755620/fa74af48-df72-4b3c-9fb8-6699ba9c5972)

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
