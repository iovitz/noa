import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { namePart1, namePart2 } from './user.const'
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

  genRandomUsername() {
    const len1 = namePart1.length
    const len2 = namePart2.length
    const part1 = namePart1[Math.floor(Math.random() * len1)]
    const part2 = namePart2[Math.floor(Math.random() * len2)]
    const part3 = `${Math.floor(Math.random() * 100)}`
    return `${part1}的${part2}${part3}`
  }
}
