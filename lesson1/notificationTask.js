/**
 * Нужно реализовать сервис рассылки уведомлений
 * по каналам, на которые подписываются пользователи.
 * 
 * Для каждого пользователя есть возможность задать способ
 * представления этих уведомлений.
 * 
 * Выполненное задание - корректная работа функции App
 */

function App() {
  var messageViews = {
    lastOnly: function(channel) {
      return channel.messages[channel.messages.length - 1];
    },
    attachChannelName: function(channel) {
      return '[' + channel.name + '] : ' + channel.messages.join(', ');
    },
    newOnly: function() {
      var showedMessages = [];
      return function(channel) {
        var messages = [];
        channel.messages.forEach(function(message) {
          showedMessages.indexOf(message) === -1 ? messages.push(message) : null;
        });
        showedMessages = showedMessages.concat(messages);
        return messages.join(', ');
      };
    }
  };

  // создание новго сервиса рассылки
  var notifier = createNotificationService();

  // создание 2 разных каналов
  var channel1 = notifier.createChannel('channel1');
  var channel2 = notifier.createChannel('channel2');

  // создание подписчиков

  // Bob хочет получать только последнее сообщение из каждого канала
  var Bob = createReceiver(messageViews.lastOnly);

  // Tom хочет видеть названия каналов
  var Tom = createReceiver(messageViews.attachChannelName);

  // Mike не хочет видеть сообщения, которые он уже прочитал
  var Mike = createReceiver(messageViews.newOnly());

  // подписка на каналы
  Bob.subscribe(channel1);
  Tom.subscribe(channel1);
  Tom.subscribe(channel2);
  Mike.subscribe(channel2);

  // рассылка сообщений по каналам
  notifier.sendToChannel('channel1', 'some message');
  notifier.sendToChannel('channel1', 'another message');
  notifier.sendToChannel('channel2', 'lorem ipsum');
  notifier.sendToChannel('channel2', 'dolor');

  // Получение сообщений, взаимодействие с сообщениями не должно менять состояние сервиса нотификаций
  console.log(Bob.getMessages()); // только 'another message'
  console.log(Tom.getMessages()); // [channel1] : some message , another message | [channel2] : ...
  console.log(Mike.getMessages()); // lorem ipsum , dolor

  notifier.sendToChannel('channel2', 'some new stuff');
  console.log(Mike.getMessages()); // some new stuff
}

App();

function createNotificationService() {
  var channels = [];

  return {
    createChannel: function(name) {
      var newChannel = {
        name,
        messages: [],
        sendMessage: function(message) {
          this.messages.push(message);
        }
      };
      channels.push(newChannel);
      return newChannel;
    },
    sendToChannel: function(channelName, message) {
      channels.forEach(function(channel) {
        channel.name === channelName ? channel.sendMessage(message) : null;
      });
    }
  };
}

function createReceiver(callBack) {
  var subscriptions = [];

  return {
    subscribe: function(channel) {
      subscriptions.push(channel);
    },
    getMessages: function() {
      var messages = [];
      subscriptions.forEach(function(channel) {
        messages.push(callBack(Object.assign({}, channel)));
      });
      return messages;
    }
  };
}
