import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('space-files')
export class SpaceFile {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
    comment: 'ulid主键',
  })
  id: string

  @Column({
    type: 'varchar',
    comment: '所属用户的ID',
  })
  ownerId: string

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
    length: '20',
    comment: '页面类型',
  })
  type: string

  @Column({
    type: 'boolean',
    comment: '收藏文件',
    default: false,
  })
  like: boolean

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
