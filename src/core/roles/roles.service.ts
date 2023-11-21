import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  create(createRoleInput: CreateRoleInput) {
    const role = this.rolesRepository.create(createRoleInput);
    return this.rolesRepository.save(role);
  }

  findAll() {
    return this.rolesRepository.find();
  }

  findOne(id: number) {
    return this.rolesRepository.findOneByOrFail({ id });
  }

  findByIds(ids: number[]) {
    return this.rolesRepository.find({ where: { id: In(ids) } });
  }

  async update(id: number, updateRoleInput: UpdateRoleInput) {
    const role = await this.findOne(id);
    return this.rolesRepository.save({ ...role, ...updateRoleInput });
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    await this.rolesRepository.delete({ id });
    return role;
  }
}
