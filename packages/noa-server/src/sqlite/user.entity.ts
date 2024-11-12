import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('user')
export class User {
  @PrimaryColumn({
    type: 'varchar',
    length: '15',
    unsigned: true,
    comment: '自增主键',
  })
  id: string

  @Column({
    type: 'varchar',
    length: 11,
    comment: '邮箱',
    nullable: true,
  })
  email?: string

  @Column({
    type: 'varchar',
    length: 32,
    comment: 'MD5加密后的密码',
    nullable: true,
  })
  password: string

  @Column({
    type: 'varchar',
    length: 20,
    comment: '用户昵称',
  })
  nickname: string

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
