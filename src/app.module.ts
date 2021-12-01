import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthorizedModule } from './modules/authorized/authorized.module';
import { UnauthorizedModule } from './modules/unauthorized/unauthorized.module';
import { AuthModule } from './services/auth/auth.module';
import { ServicesModule } from 'services/services.module';
import { UserController } from 'controllers/user.controller';
import { AuthController } from 'controllers/auth.controller';

@Module({
  controllers: [AuthController, UserController],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthorizedModule,
    UnauthorizedModule,
    AuthModule,
    ServicesModule,
  ],
})
export class AppModule {}
