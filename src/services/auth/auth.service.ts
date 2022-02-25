import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuth } from '@prisma/client';
import { compareSync, genSalt, hash } from 'bcrypt';
import { IRegisterUserDTO } from 'dto/register-user.dto';
import { UpdatePasswordDTO } from 'dto/update-password.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  private saltRounds = 10;

  public async login(data: Pick<UserAuth, 'email' | 'password'>) {
    const { email, password } = data;

    const res = await this.prisma.userAuth.findUnique({
      where: {
        email,
      },
    });

    if (res) {
      const validPass = compareSync(password, res.password);

      if (!validPass) {
        throw new Error('Wrong password');
      }

      const user = await this.prisma.user.findUnique({
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

  public async register(data: IRegisterUserDTO) {
    const { email, name, password } = data;

    const salt = await genSalt(this.saltRounds);
    const hashedPass = await hash(password, salt);

    const payload: Prisma.UserCreateInput = {
      name,
      auth: {
        create: {
          email,
          password: hashedPass,
        },
      },
    };

    return this.prisma.user.create({ data: payload });
  }

  public async updatePassword(data: UpdatePasswordDTO) {
    const { email, password } = data;

    const salt = await genSalt(this.saltRounds);
    const hashedPass = await hash(password, salt);

    const payload: Prisma.UserAuthUpdateInput = {
      password: hashedPass,
    };

    await this.prisma.userAuth.update({
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
