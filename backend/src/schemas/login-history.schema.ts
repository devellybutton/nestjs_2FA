import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type LoginHistoryDocument = LoginHistory & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class LoginHistory {
  /** 회원 ID */
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  /** IP 주소 */
  @Prop({ required: true })
  ipAddress: string;

  /** 장치 정보 */
  @Prop({ required: true })
  device: string;

  /** 브라우저/OS 정보 */
  @Prop({ required: true })
  userAgent: string;

  /** 의심스러운 로그인 여부 */
  @Prop({ required: true })
  isSuspicious: boolean;

  /** 2FA 사용 여부 */
  @Prop({ default: false })
  twofaUsed: boolean;
}

export const LoginHistorySchema = SchemaFactory.createForClass(LoginHistory);
