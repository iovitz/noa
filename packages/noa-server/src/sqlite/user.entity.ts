import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('user')
export class User {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    default: () => process.hrtime.bigint() + BigInt(Math.floor(Math.random() * 10000)),
    comment: '自增主键',
  })
  id: number

  @Column({
    type: 'varchar',
    length: 20,
    comment: '用户昵称',
  })
  nickname: string

  @Column({
    type: 'varchar',
    length: 11,
    comment: '用户手机号',
  })
  phone: string

  @Column({
    type: 'varchar',
    length: 32,
    comment: 'MD5加密后的密码',
  })
  password: string

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
