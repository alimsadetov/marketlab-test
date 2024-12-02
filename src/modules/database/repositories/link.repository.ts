import { Prisma } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class LinkRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string, select?: Prisma.LinkSelect) {
    return this.prisma.link.findUnique({ where: { id }, select });
  }

  async getByIdOrThrowError(id: string, select?: Prisma.LinkSelect) {
    const link = await this.getById(id, select);
    if (!link) {
      throw new NotFoundException('Ссылка не существует.');
    }
    return link;
  }

  async getFirst(where: Prisma.LinkWhereInput, select?: Prisma.LinkSelect) {
    return this.prisma.link.findFirst({ where, select });
  }

  async getFirstOrThrowError(
    where: Prisma.LinkWhereInput,
    select?: Prisma.LinkSelect,
  ) {
    const link = await this.getFirst(where, select);
    if (!link) {
      throw new NotFoundException('Ссылка не существует.');
    }
    return link;
  }

  async create(data: Prisma.LinkCreateInput, select?: Prisma.LinkSelect) {
    return this.prisma.link.create({ data, select });
  }

  async update(id: string, data: Prisma.LinkUpdateInput) {
    return this.prisma.link.update({ where: { id }, data });
  }
}
