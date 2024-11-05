import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 20,
  })
  name: string

  @Column({
    type: 'varchar',
    length: 11,
  })
  phone: string

  @Column({
    type: 'varchar',
    length: 32,
  })
  password: string
}
