import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('snapshot')
export class Snapshot {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
    unsigned: true,
    comment: '自增主键',
  })
  id: string

  @Column({
    type: 'int',
    unsigned: true,
    comment: '页面ID',
  })
  pageId: number

  @Column({
    type: 'int',
    unsigned: true,
    comment: '快照版本',
  })
  rev: number

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
