import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('form-input-widget')
export class FormWidgets {
  @PrimaryColumn({
    type: 'varchar',
    length: 10,
    comment: 'ulid主键',
  })
  id: string

  @Column({
    type: 'varchar',
    length: 26,
    unsigned: true,
  })
  fileId: string

  @Column({
    type: 'varchar',
    length: 50,
    comment: '字段名称',
    nullable: true,
  })
  name: string

  @Column({
    type: 'varchar',
    length: 50,
    comment: '字段类型',
  })
  type: string

  @Column({
    type: 'varchar',
    length: 1000,
    comment: '字段描述',
    nullable: true,
  })
  desc: string

  @Column({
    type: 'float',
    comment: '组件在页面中的顺序',
  })
  rank: number

  @Column({
    type: 'json',
    comment: '组件属性',
  })
  props: string

  @Column({
    type: 'boolean',
    comment: '组件是否被删除',
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
