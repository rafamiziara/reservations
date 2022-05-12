import { model, Model } from 'mongoose';
import { User, UserModel, userSchema } from '@models/User';
import { IUserRepository } from '@IRepositories/IUserRepository';

export class MongooseUserRepository implements IUserRepository {
  private model: Model<UserModel> = Object.create(null);

  constructor() {
    this.model = model<UserModel>('UserSchema', userSchema);
  }

  async findById(id: string): Promise<UserModel | null> {
    return await this.model.findOne({ id }).exec();
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return await this.model.findOne({ email }).exec();
  }

  async fetchAll(pagination: PaginationRequest): Promise<PagedResult<UserModel>> {
    const { page, pageSize } = pagination;

    const response = await Promise.all([
      this.model
        .find({})
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec(),
      this.count({}),
    ]);

    return { items: response[0], totalCount: response[1] };
  }

  async insert(user: User): Promise<UserModel> {
    return this.model.create(user);
  }

  async count(conditions: Object): Promise<number> {
    return this.model.count(conditions).exec();
  }

  async deleteById(id: string): Promise<UserModel | null> {
    return await this.model.findOneAndDelete({ id }).exec();
  }
}
