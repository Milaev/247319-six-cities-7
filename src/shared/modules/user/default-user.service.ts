import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { UserService } from './user-service.interface.js';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    if (result) {
      this.logger.info(`New user created: ${user.email}`);
    } else {
      this.logger.warn('New user has not been created');
    }
    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email}).exec();
  }

  public async findById(userId: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(userId).exec();
  }

  public async find(): Promise<DocumentType<UserEntity>[]> {
    return this.userModel.find().exec();
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(userId, dto, {new: true}).exec();
  }
  //? как реализовать логин?
  // public async login(email: string, password: string): Promise<DocumentType<UserEntity> | null> {
  //   const user = await this.findByEmail(email);

  //   if (user && user.verifyPassword(password)) {
  //     this.logger.info(`User authenticated: ${email}`);
  //     return user;
  //   }

  //   this.logger.warn(`Authentication failed for user: ${email}`);
  //   return null;
  // }

  //? как реализовать логаут?
  // public async logout(userId: string):Promise<void> {
  //   this.logger.info(`User logged out: ${userId}`);
  // }
  //? как реализовать чек состояния?
  // public async checkUserState(userId: string): Promise<boolean> {
  //   const user = await this.findById(userId);
  //   return !!user;
  // }
}
