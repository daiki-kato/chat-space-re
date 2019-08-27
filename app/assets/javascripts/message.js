$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var img = message.image.url ? message.image.url : '' ;
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <p class="upper-message__user-name">
                      ${message.user_name}
                    </p>
                    <p class="upper-message__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    <img src="${img}">
                  </div>
                </div>
                `;
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').delay(100).animate({scrollTop: $('.messages')[0].scrollHeight}, 'swing');
      $('form')[0].reset()
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  })
  var reloadMessages = function(){
    var last_message_id = $('.message:last').data("id");
    $.ajax({
      url: 'api/messages',
      type: "GET",
      dataType: 'json',
      data: {id: last_message_id }
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message) {
        insertHTML += buildHTML(message)
        $('.messages').append(insertHTML);
      });
      $('.messages').delay(100).animate({scrollTop: $('.messages')[0].scrollHeight}, 'swing');
    })
    .fail(function() {
      alert('自動更新エラー')
    })
  };
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 5000);
  };
});