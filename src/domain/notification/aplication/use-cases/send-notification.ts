import { Either, right } from '@/core/either'
import { Notification } from '../../enterprise/entiities/notification'
import { NotificationRepository } from '../repositories/notifications-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

export type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotificationUseCase {
  constructor(private notificationsrepository: NotificationRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    })

    await this.notificationsrepository.create(notification)

    return right({ notification })
  }
}
