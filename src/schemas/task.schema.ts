import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Project } from './project.schema';
import { User } from './user.schema';

export type TaskDocument = mongoose.HydratedDocument<Task>;

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Task {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  })
  projectId: Project;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  dueDate: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  createdBy: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  updatedBy: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
