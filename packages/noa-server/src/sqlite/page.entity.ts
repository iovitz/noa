import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Component } from './component.entity'
import { FormValue } from './form-value.entity'
import { User } from './user.entity'

@Entity('page')
export class Page {
  @PrimaryGeneratedColumn()
  id: number

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

  @ManyToOne(() => User, user => user.pages)
  user: User

  @OneToMany(() => Component, component => component.page)
  components: Component[]

  @OneToMany(() => FormValue, formValue => formValue.page)
  formValues: FormValue[]
}
