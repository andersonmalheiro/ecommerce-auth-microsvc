import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerAuth } from '@prisma/client';
import { IRegisterCustomerDTO } from 'dto/register-customer.dto';
import { Prisma } from '.prisma/client';
import { hash, genSalt, compareSync } from 'bcrypt';
import { UpdatePasswordDTO } from 'dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  private saltRounds = 10;

  public async login(data: Pick<CustomerAuth, 'email' | 'password'>) {
    const { email, password } = data;

    const res = await this.prisma.customerAuth.findUnique({
      where: {
        email,
      },
    });

    if (res) {
      const validPass = compareSync(password, res.password);

      if (!validPass) {
        throw new Error('Wrong password');
      }

      const user = await this.prisma.customer.findUnique({
        where: {
          id: res.id,
        },
      });

      const token = this.jwtService.sign({ userId: user.id });

      return {
        access_token: token,
      };
    } else {
      throw new Error(`Invalid email`);
    }

    return null;
  }

  public async register(data: IRegisterCustomerDTO) {
    const { email, name, password } = data;

    const salt = await genSalt(this.saltRounds);
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

    const salt = await genSalt(this.saltRounds);
    const hashedPass = await hash(password, salt);

    console.log(hashedPass);

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
