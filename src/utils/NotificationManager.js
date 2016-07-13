let notificationManagerInstance;

class NotificationManager {
  constructor () {
    if (!notificationManagerInstance) {
      console.log('Creating new NotificationManager');
      notificationManagerInstance = this;
    }

    return notificationManagerInstance;
  }

  setNotificationSystem = (notificationSystem) => {
    this.notificationSystem = notificationSystem;
  };

  addNotification = (notification) => {
    this.notificationSystem.addNotification(notification);
  };

  removeNotification = (notification) => {
    this.notificationSystem.removeNotification(notification);
  };
}

notificationManagerInstance = new NotificationManager();

export { notificationManagerInstance as notificationManager };
