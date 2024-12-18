import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('page')
export class Page {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
    comment: 'ulid主键',
  })
  id: string

  @Column({
    type: 'int',
    unsigned: true,
    comment: '页面版本',
    default: 0,
  })
  rev: number

  @Column({
    type: 'varchar',
    unsigned: true,
    comment: '所属用户',
  })
  userId: string

  @Column({
    type: 'varchar',
    length: 20,
    comment: '页面名称',
  })
  name: string

  @Column({
    type: 'varchar',
    length: 500,
    comment: '页面描述',
    nullable: true,
  })
  description: string

  @Column({
    type: 'varchar',
    length: 100,
    comment: '页面头图',
    nullable: true,
  })
  poster: string

  @Column({
    type: 'varchar',
    length: '20',
    comment: '页面类型',
  })
  type: string

  @Column({
    type: 'boolean',
    comment: '当前页面是否被分享',
    default: false,
  })
  template: boolean

  @Column({
    type: 'boolean',
    comment: '是否收藏',
    default: false,
  })
  like: boolean

  @Column({
    type: 'boolean',
    comment: '页面是否分享',
    default: false,
  })
  shared: boolean

  @Column({
    type: 'boolean',
    comment: '页面状态',
    default: false,
  })
  deleted: boolean

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
