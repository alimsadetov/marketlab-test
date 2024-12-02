import { Module } from '@nestjs/common';
import { LinkController } from './controllers/link.controller';
import { LinkService } from './services/link.service';

@Module({
  imports: [],
  controllers: [LinkController],
  providers: [LinkService],
  exports: [],
})
export class LinkModule {}
