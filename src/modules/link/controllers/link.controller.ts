import {
  Body,
  Controller,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateLinkRequestDto } from '../dto/request/create-link-request.dto';
import { LinkService } from '../services/link.service';

@ApiTags('Link')
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  @ApiOperation({ summary: 'Создать ссылку' })
  @ApiResponse({ status: 200, type: String })
  @ApiBody({ type: CreateLinkRequestDto })
  async createLink(@Body() dto: CreateLinkRequestDto): Promise<string> {
    return this.linkService.createLink(dto.text);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получить текст с ссылки' })
  @ApiResponse({ status: 200, type: String })
  async getById(@Param('id') id: string): Promise<string> {
    return this.linkService.getTextFromActiveLink(id);
  }
}
