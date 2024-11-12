import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('page')
export class Page {
  @PrimaryColumn({
    type: 'varchar',
    length: '15',
    unsigned: true,
    comment: '自增主键',
  })
  id: string

  @Column({
    type: 'bigint',
    unsigned: true,
  })
  userId: number

  @Column({
    type: 'varchar',
    length: 20,
    comment: '页面名称',
  })
  name: string

  @Column({
    type: 'int',
    unsigned: true,
    comment: '页面版本',
  })
  rev: string

  @Column({
    type: 'varchar',
    length: '20',
    comment: '页面类型',
  })
  type: string

  @Column({
    type: 'boolean',
    default: false,
    comment: '页面是否分享',
  })
  shared: boolean

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
