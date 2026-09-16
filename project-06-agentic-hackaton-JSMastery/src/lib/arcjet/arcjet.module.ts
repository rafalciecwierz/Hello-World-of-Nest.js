import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  ArcjetModule as ArcjetNestModule,
  fixedWindow,
  shield,
} from '@arcjet/nest';
import { ArcjetGuard } from '../../common/guards/arcjet/arcjet.guard';
import { ArcjetService } from './arcjet.service';

@Global()
@Module({
  imports: [
    ArcjetNestModule.forRootAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const key = configService.get<string>('ARCJET_KEY');

        if (!key) {
          throw new Error('ARCJET_KEY must be configured');
        }

        return {
          key,
          rules: [
            shield({ mode: 'LIVE' }),
            fixedWindow({ mode: 'LIVE', window: '1m', max: 30 }),
          ],
        };
      },
    }),
  ],
  providers: [
    ArcjetService,
    ArcjetGuard,
    {
      provide: APP_GUARD,
      useExisting: ArcjetGuard,
    },
  ],
  exports: [ArcjetService],
})
export class ArcjetModule {}
