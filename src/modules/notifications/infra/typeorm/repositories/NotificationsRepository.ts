import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationRepository from '../../../repositories/INotificationsRepository';
import ICreateNotificatioDTO from '../../../dtos/ICreateNotificationDTO';
import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificatioDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
