import { LinkRepository } from '@database';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LINK_PREFIX } from 'src/config/global.config';
import { resolve } from 'url';

@Injectable()
export class LinkService {
  private linkPrefix: string;

  constructor(
    private readonly linkRepository: LinkRepository,
    private readonly configService: ConfigService,
  ) {
    this.linkPrefix = this.configService.get(LINK_PREFIX);
  }

  async createLink(text: string): Promise<string> {
    const created = await this.linkRepository.create({ text }, { id: true });
    return resolve(this.linkPrefix, created.id);
  }

  async getTextFromActiveLink(id: string): Promise<string> {
    const link = await this.linkRepository.getByIdOrThrowError(id, {
      isActive: true,
      text: true,
    });
    if (!link.isActive) {
      throw new UnprocessableEntityException('Ссылка использована.');
    }
    await this.linkRepository.update(id, { isActive: false });
    return link.text;
  }
}
