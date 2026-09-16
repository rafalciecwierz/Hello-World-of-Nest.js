import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { ArcjetService } from '../../../lib/arcjet/arcjet.service';

@Injectable()
export class ArcjetGuard implements CanActivate {
  constructor(private readonly arcjetService: ArcjetService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'http') {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const decision = await this.arcjetService.protect(request);

    if (!decision.isDenied()) {
      return true;
    }

    if (decision.reason.isRateLimit()) {
      throw new HttpException(
        'Rate limit exceeded',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    throw new ForbiddenException('Request denied by Arcjet Shield');
  }
}
