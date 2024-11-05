import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  @InjectRepository(User)
  userRepository: Repository<User>

  createUser(userData: DeepPartial<User>) {
    const user = this.userRepository.create({
      ...userData,
    })
    return this.userRepository.save(user)
  }
}
