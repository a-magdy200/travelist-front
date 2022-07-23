export enum NotificationStatusEnum {
  READ = 'read',
  UNREAD = 'unread',
}
export interface INotificationInterface {
  id: number;
  title: string;
  content: string;
  created_at: string;
  status:NotificationStatusEnum;
}
