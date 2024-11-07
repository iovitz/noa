import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('oauth')
export class OAuth {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    comment: '自增主键',
  })
  id: number

  @Column({
    type: 'int',
    unsigned: true,
    comment: '用户ID',
  })
  userId: number

  @Column({
    type: 'varchar',
    length: 20,
    comment: '三方平台类型',
  })
  platform: string

  @Column({
    type: 'varchar',
    length: 20,
    comment: '三方平台用户ID',
  })
  platformId: string

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
