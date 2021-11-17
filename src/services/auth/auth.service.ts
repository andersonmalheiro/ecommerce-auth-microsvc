import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerAuth } from '@prisma/client';
import { IRegisterCustomerDTO } from 'dto/register-customer.dto';
import { Prisma } from '.prisma/client';
import { hash, genSalt } from 'bcrypt';
import { UpdatePasswordDTO } from 'dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  private sessions: Record<number, string> = {};

  public async login(data: Pick<CustomerAuth, 'email' | 'password'>) {
    console.log(data);
    const res = await this.prisma.customerAuth.findFirst({
      where: {
        email: data.email,
        password: data.password,
      },
    });

    console.log(res);

    if (res) {
      const user = await this.prisma.customer.findUnique({
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

  public async register(data: IRegisterCustomerDTO) {
    const { email, name, password } = data;

    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    const hashedPass = await hash(password, salt);

    const payload: Prisma.CustomerCreateInput = {
      name,
      auth: {
        create: {
          email,
          password: hashedPass,
        },
      },
    };

    return this.prisma.customer.create({ data: payload });
  }

  public async updatePassword(data: UpdatePasswordDTO) {
    const { email, password } = data;

    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    const hashedPass = await hash(password, salt);

    const payload: Prisma.CustomerAuthUpdateInput = {
      password: hashedPass,
    };

    await this.prisma.customerAuth.update({
      where: {
        email,
      },
      data: payload,
    });
  }

  public async check(userID: number, token: string) {
    const isValid = await this.jwtService.verify(token);

    if (isValid) {
      return;
    }
  }
}
