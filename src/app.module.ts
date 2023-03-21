import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthorizedModule } from './modules/authorized/authorized.module';
import { UnauthorizedModule } from './modules/unauthorized/unauthorized.module';
import { AuthModule } from './services/auth/auth.module';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from 'services/users/users.module';
import { AddressModule } from 'services/address/address.module';

@Module({
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    RouterModule.register([
      {
        path: '/api',
        children: [
          {
            path: 'auth',
            module: AuthModule,
          },
          {
            path: 'user',
            module: UsersModule,
            children: [
              {
                path: ':userId/address',
                module: AddressModule,
              },
            ],
          },
        ],
      },
    ]),
    AuthModule,
    UsersModule,
    AddressModule,
    AuthorizedModule,
    UnauthorizedModule,
  ],
})
export class AppModule {}
