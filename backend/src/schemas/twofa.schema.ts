import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TwofaDocument = Twofa & Document;

@Schema({ timestamps: true })
export class Twofa {
  /** 회원 ID */
  @Prop({ required: true, unique: true })
  userId: string;

  /** 2FA 시크릿 키 (Base32 인코딩)  */
  @Prop({ required: true })
  secret: string;

  /** 2FA 활성화 여부 */
  @Prop({ default: false })
  isActive: boolean;
}

export const TwofaSchema = SchemaFactory.createForClass(Twofa);
