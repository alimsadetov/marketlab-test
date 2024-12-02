import { Link } from '@prisma/client';

class LinkEntity implements Link {
  id: string;
  text: string;
  isActive: boolean;
}
