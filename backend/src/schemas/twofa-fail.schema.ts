import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TwofaFailReason {
  INVALID_CODE = 'invalid_code', // 잘못된 코드
  EXPIRED = 'expired', // 만료된 코드
  ALREADY_USED = 'already_used', // 이미 사용된 코드
}

export type TwofaFailDocument = TwofaFail & Document;

@Schema({ timestamps: true })
export class TwofaFail {
  /** 회원 ID */
  @Prop({ required: true })
  userId: string;

  /** 요청의 IP 주소 */
  @Prop({ required: true })
  ipAddress: string;

  /** 요청의 User-Agent */
  @Prop({ required: true })
  userAgent: string;

  /** 입력된 2FA 코드 */
  @Prop({ required: true })
  code: string;

  /** 실패 사유 */
  @Prop({ required: true, enum: TwofaFailReason })
  reason: string;
}

export const TwofaFailSchema = SchemaFactory.createForClass(TwofaFail);

TwofaFailSchema.index({ userId: 1, createdAt: -1 });
TwofaFailSchema.index({ ipAddress: 1 });
