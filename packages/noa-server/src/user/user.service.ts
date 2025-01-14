import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { User } from '../sqlite/user.entity'
import { namePart1, namePart2 } from './user.const'

@Injectable()
export class UserService {
  @InjectRepository(User)
  userRepository: Repository<User>

  getUserByEmail(email: string) {
    return this.userRepository.findOneBy({
      email,
    })
  }

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
    const part3 = `${Math.floor(Math.random() * 100)}`.padStart(2, '0')
    return `${part1}的${part2}${part3}`
  }
}
