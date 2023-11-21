import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Role } from '../roles/entities/role.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import UsersLoader from './users.loader';
import { UsersService } from './users.service';
import { Post } from '../posts/entities/post.entity';
import { Comment } from '../comments/entities/comment.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersLoader: UsersLoader,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @ResolveField('roles', () => [Role], { nullable: 'items' })
  roles(@Parent() user: User) {
    return this.usersLoader.batchRoles.load(user.roles as unknown as number[]);
  }

  @ResolveField('posts', () => [Post], { nullable: 'items' })
  posts(@Parent() user: User) {
    return this.usersLoader.batchPosts.load(user.id);
  }

  @ResolveField('comments', () => [Comment], { nullable: 'items' })
  comments(@Parent() user: User) {
    return this.usersLoader.batchComments.load(user.id);
  }
}
