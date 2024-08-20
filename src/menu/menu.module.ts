import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [MenuService],
  controllers: [MenuController],
  imports: [
    AuthModule,
    PrismaModule
  ]
})
export class MenuModule {}
