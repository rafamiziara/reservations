import { User, UserModel } from '@models/User';

export interface IUserRepository {
  findById(id: string): Promise<UserModel | null>;
  findByEmail(email: string): Promise<UserModel | null>;
  fetchAll(pagination: PaginationRequest): Promise<PagedResult<UserModel>>;
  deleteById(id: string): Promise<UserModel | null>;
  insert(user: User): Promise<UserModel>;
  count(conditions: Object): Promise<number>;
}
