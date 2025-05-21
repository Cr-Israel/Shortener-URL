import { User } from "@/domain/url/enterprise/entities/user"
import { UserRepository } from "@/domain/url/application/repositories/user-repository"

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(user => user.email === email)

    if(!user) {
      return null
    }

    return user
  }

  async create(user: User): Promise<void> {
    this.items.push(user)
  }
}