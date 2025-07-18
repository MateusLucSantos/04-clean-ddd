import { Notification } from '../../enterprise/entiities/notification'

export interface NotificationRepository {
  create(notification: Notification): Promise<void>
}
