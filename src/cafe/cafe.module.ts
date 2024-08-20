import { Module } from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CafeController } from './cafe.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CafeService],
  controllers: [CafeController],
  imports: [
    AuthModule,
    PrismaModule
  ]
})
export class CafeModule {}
