import { type AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { type LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { type AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from './helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return result.insertedId !== null
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await (await accountCollection).findOne({
      email
    }, {
      projection: {
        _id: 1,
        name: 1,
        password: 1
      }
    })
    return account && MongoHelper.map(account)
  }
}
