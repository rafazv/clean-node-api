import { type LogErrorRepository } from '../../../../data/protocols/log-error-repository'
import { MongoHelper } from '../account-repository/helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getConnection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
