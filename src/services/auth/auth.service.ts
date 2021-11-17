import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerAuth } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  private sessions: Record<number, string> = {};

  public async login(data: Pick<CustomerAuth, 'email' | 'password'>) {
    console.log(data);
    const res = await this.prismaService.customerAuth.findFirst({
      where: {
        email: data.email,
        password: data.password,
      },
    });

    console.log(res);

    if (res) {
      const user = await this.prismaService.customer.findUnique({
        where: {
          id: res.id,
        },
      });

      const token = this.jwtService.sign(user);

      this.sessions[user.id] = token;

      return {
        access_token: token,
      };
    }
  }

  public async logout(userID: number) {
    if (this.sessions[userID]) {
      delete this.sessions[userID];
    }
  }

  public async check(userID: number, token: string) {
    const isValid = await this.jwtService.verify(token);

    if (isValid) {
      return;
    }

    return this.logout(userID);
  }
}
