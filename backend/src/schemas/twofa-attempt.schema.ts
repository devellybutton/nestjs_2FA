import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TwofaAttemptDocument = TwofaAttempt & Document;

@Schema()
export class TwofaAttempt {
  /** 회원 ID */
  @Prop({ required: true, unique: true })
  userId: string;

  /** 실패 횟수 */
  @Prop({ default: 0 })
  failureCount: number;

  /** 잠금 해제일 */
  @Prop()
  lockedUntil: Date;

  /** 마지막 2FA 시도 일시 */
  @Prop({ default: Date.now })
  lastAttemptAt: Date;

  /** 실패 카운트 리셋 시각 */
  @Prop({ default: Date.now })
  resetAt: Date;
}

export const TwofaAttemptSchema = SchemaFactory.createForClass(TwofaAttempt);
