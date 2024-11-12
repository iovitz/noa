import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('component')
export class Component {
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
  pageId: number

  @Column({
    type: 'varchar',
    length: 20,
    comment: '表单名称',
  })
  name: string

  @Column({
    type: 'varchar',
    length: 1000,
    comment: '表单名称',
  })
  desc: string

  @Column({
    type: 'boolean',
    default: false,
    comment: '页面是否分享',
  })
  shared: boolean

  @Column({
    type: 'float',
    default: 100000,
    comment: '组件在页面中的顺序',
  })
  rank: number

  @Column({
    type: 'json',
    comment: '组件属性',
  })
  props: string

  @CreateDateColumn({
    comment: '修改时间',
  })
  createdAt: Date

  @UpdateDateColumn({
    comment: '修改时间',
  })
  updatedAt: Date
}
