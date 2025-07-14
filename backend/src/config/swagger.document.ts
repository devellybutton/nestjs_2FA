import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

/**
 * Swagger API 문서 설정
 * @param app NestJS 애플리케이션 인스턴스
 */
export const setupSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('NestJS 2FA with MongoDB')
    .setDescription('NestJS 2FA 인증 시스템 API - MongoDB와 Google Authenticator를 활용한 이중 인증 서비스')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'JWT 토큰을 입력하세요.',
      in: 'header',
    })
    .setVersion('1.0')
    .addTag('Auth', '기본 인증 관련 엔드포인트')
    .addTag('2FA', '이중 인증 (Two-Factor Authentication)')
    .addTag('User', '사용자 관리')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // 페이지 새로고침 시 인증정보 유지
    },
    customSiteTitle: 'NestJS 2FA API 문서',
  });
};
