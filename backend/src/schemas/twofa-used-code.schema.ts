import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type TwofaUsedCodeDocument = TwofaUsedCode & Document;

@Schema()
export class TwofaUsedCode {
  /** 회원 ID */
  @Prop({ required: true, index: true })
  userId: string;

  /** 사용된 2FA 코드 */
  @Prop({ required: true })
  code: string;

  /** 코드 사용 일시 */
  @Prop({ default: Date.now })
  usedAt: Date;

  /** 타임스탬프 (30초 뒤 삭제) */
  @Prop({ required: true })
  timestamp: number;
}

export const TwofaUsedCodeSchema = SchemaFactory.createForClass(TwofaUsedCode);

TwofaUsedCodeSchema.index({ usedAt: 1 }, { expireAfterSeconds: 300 });
