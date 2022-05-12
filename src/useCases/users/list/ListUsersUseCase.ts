import { IUserRepository } from '@IRepositories/IUserRepository';

export class ListUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(pagination: PaginationRequest) {
    return await this.userRepository.fetchAll(pagination);
  }
}
