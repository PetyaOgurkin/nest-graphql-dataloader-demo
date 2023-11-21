import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create({ roles = [], ...createUserInput }: CreateUserInput) {
    const user = this.usersRepository.create({
      ...createUserInput,
      roles: roles.map((r) => ({ id: r })),
    });
    await this.usersRepository.save(user);

    return this.findOne(user.id);
  }

  findAll() {
    return this.usersRepository.find({
      loadRelationIds: {
        relations: ['roles'],
      },
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOneOrFail({
      where: { id },
      loadRelationIds: {
        relations: ['roles'],
      },
    });
  }

  findByIds(ids: number[]) {
    return this.usersRepository.find({
      where: { id: In(ids) },
      loadRelationIds: {
        relations: ['roles'],
      },
    });
  }

  async update(id: number, { roles, ...updateUserInput }: UpdateUserInput) {
    const user = await this.findOne(id);

    await this.usersRepository.save({
      ...user,
      ...updateUserInput,
      roles: roles.map((r) => ({ id: r })),
    });

    return this.findOne(user.id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    await this.usersRepository.delete({ id });
    return user;
  }
}
