import { InMemoryNotificationsRepository } from './../../../../../test/repositories/in-memory-notification-repository'
import { InMemoryQuestionAttachmentsRepository } from './../../../../../test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from './../../../../../test/repositories/in-memory-questions-repository'
import { InMemoryAnswerAttachmentsRepository } from './../../../../../test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { OnAnswerCreated } from './on-answer-created'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { makeQuestion } from 'test/factories/make-question'
import { MockInstance } from 'vitest'
import { waitFor } from 'test/utils/wait-for'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sendNotificationUseCase: SendNotificationUseCase
let inMemoryNotificationsRepository: InMemoryNotificationsRepository

let sendNotificationExecuteSpy: MockInstance<
  (
    request: SendNotificationUseCaseRequest,
  ) => Promise<SendNotificationUseCaseResponse>
>

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })

  it('should send a notification when an answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
