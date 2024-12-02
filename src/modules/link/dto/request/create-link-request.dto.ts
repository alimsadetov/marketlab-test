import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLinkRequestDto {
  @ApiProperty()
  @IsString()
  text: string;
}
