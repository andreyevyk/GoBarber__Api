import { ObjectID } from 'mongodb';

import INotificationRepository from '../INotificationsRepository';
import ICreateNotificatioDTO from '../../dtos/ICreateNotificationDTO';
import Notification from '../../infra/typeorm/schemas/Notification';

class FakeNotificationsRepository implements INotificationRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificatioDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      id: new ObjectID(),
      content,
      recipient_id,
    });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
