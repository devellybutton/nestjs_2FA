# 🔐 2단계 인증 데모 프로젝트

- <img src="https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white" alt="React" />
- <img src="https://img.shields.io/badge/Backend-NestJS-E0234E?logo=nestjs&logoColor=white" alt="NestJS" />
- <img src="https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
- <img src="https://img.shields.io/badge/ODM-Mongoose-880000?logo=mongoose&logoColor=white" alt="Mongoose" />
- <img src="https://img.shields.io/badge/2FA-Speakeasy-FFA500" alt="Speakeasy" />
- <img src="https://img.shields.io/badge/QR%20Code-qrcode-blue" alt="qrcode" />

---

## 프로젝트 목적

- 의심스러운 로그인 시 Google Authenticator 기반의 **2단계 인증 흐름을 데모**로 구현
- 실제 프로젝트에 적용하기 전 시뮬레이션해보는 것이 목적

---

## 전체 플로우 개요

1. 사용자가 로그인 시도
2. 서버는 로그인 기록을 저장하고, 직전 로그인 기록과 비교해 **의심스러운 로그인 여부** 판단
3. 의심스러운 로그인으로 판단되면 사용자에게 아래 두 가지 선택지 제공:
   - ✅ **2단계 인증 진행 (Google Authenticator 사용)**
   - ❌ **그냥 로그인 계속 진행**
4. 2단계 인증은 `speakeasy` 기반으로 OTP 토큰을 생성하고 Google Authenticator 앱으로 인증
5. 검증 성공 시 로그인 완료

- 의심스러운 로그인 판단 기준
  - 직전 로그인과 비교하여 `IP`, `브라우저`, `OS`, `기기` 정보 중 **하나라도 다르면** 의심스러운 로그인으로 간주

---

## 2단계 인증 API 흐름

<img width="1193" height="2331" alt="2fa erd" src="https://github.com/user-attachments/assets/93e09182-3d1e-4ad0-8fab-919ec8cab64e" />

## API 설명

| 기능                              | Method | Path            |
| --------------------------------- | ------ | --------------- |
| 로그인                            | POST   | /login          |
| 의심스러운 로그인 → 2FA 건너뛰기  | POST   | /login/skip-2fa |
| 2FA 설정 요청                     | POST   | /2fa/setup      |
| 2FA 인증 시도                     | POST   | /2fa/verify     |
| 만료된 사용된 코드 삭제 (cron)    | DELETE | /2fa/used-codes |
| 잠금 해제 대상 사용자 해제 (cron) | PATCH  | /users/unlock   |