import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('changeset')
export class Changeset {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    comment: '自增主键',
  })
  id: number

  @Column({
    type: 'int',
    unsigned: true,
    comment: '快照版本',
  })
  rev: number

  @Column({
    type: 'int',
    unsigned: true,
    comment: '页面ID',
  })
  pageId: number

  @Column({
    type: 'int',
    unsigned: true,
    comment: '组件ID',
  })
  compId: number

  @Column({
    type: 'string',
    comment: '变更类型',
  })
  type: string

  @Column({
    type: 'jsonb',
    comment: '变更数据',
  })
  change: string

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
