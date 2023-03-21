import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { RouterModule } from '@nestjs/core';
import { AddressModule } from 'modules/address';
import { AuthModule } from 'modules/auth';
import { UsersModule } from 'modules/users';
import { AuthorizedModule } from './modules/authorized';
import { UnauthorizedModule } from './modules/unauthorized';

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
