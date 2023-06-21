import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
