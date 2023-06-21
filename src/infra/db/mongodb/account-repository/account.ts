import { type AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from './helpers/mongo-helper'

export class AccountMongoRepository {
  async add (accountData: AddAccountModel): Promise<boolean> {
    const accountCollection = MongoHelper.getConnection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return result.insertedId !== null
  }
}
