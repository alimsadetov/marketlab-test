import { LinkRepository } from './repositories/link.repository';
import { PrismaService } from './services/prisma.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [PrismaService, LinkRepository],
  exports: [LinkRepository],
})
export class DatabaseModule {}
