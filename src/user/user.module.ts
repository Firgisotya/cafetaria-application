import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    AuthModule,
    PrismaModule
  ]
})
export class UserModule {}
