import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('oauth')
export class OAuth {
  @PrimaryColumn({
    type: 'varchar',
    length: 30,
    comment: 'ulid主键',
  })
  id: string

  @Column({
    type: 'varchar',
    comment: '用户ID',
  })
  userId: string

  @Column({
    type: 'varchar',
    length: 20,
    comment: '三方平台类型',
  })
  platform: string

  @Column({
    type: 'varchar',
    length: 40,
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
