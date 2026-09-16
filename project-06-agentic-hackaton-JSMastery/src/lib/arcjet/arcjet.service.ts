import { Inject, Injectable } from '@nestjs/common';
import { ARCJET, ArcjetNest, ArcjetNestRequest } from '@arcjet/nest';

@Injectable()
export class ArcjetService {
  constructor(@Inject(ARCJET) private readonly arcjet: ArcjetNest) {}

  protect(request: ArcjetNestRequest) {
    return this.arcjet.protect(request);
  }
}
