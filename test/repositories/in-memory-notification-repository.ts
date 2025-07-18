/* eslint-disable prettier/prettier */

import { NotificationRepository } from '@/domain/notification/aplication/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entiities/notification'

export class InMemoryNotificationsRepository implements NotificationRepository {
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
  }
}
