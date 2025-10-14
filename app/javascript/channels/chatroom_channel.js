import consumer from "channels/consumer"

consumer.subscriptions.create({ channel: "ChatroomChannel" }, {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    $("#message-container").append(data.message);
  }
});
