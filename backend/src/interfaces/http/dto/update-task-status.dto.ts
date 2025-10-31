import { IsIn, IsString } from 'class-validator';

const allowedStatuses = ['pending', 'in_progress', 'done'] as const;

export class UpdateTaskStatusDto {
  @IsString()
  @IsIn(allowedStatuses)
  status!: (typeof allowedStatuses)[number];
}
