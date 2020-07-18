$(document).ready(function () {

  $('.btn-flip').on('click', function () {
    $('.flip-card').toggleClass('flipped');
  }
  );

  $('.next').on("click", function () {
    // create variable where in the array $(this) data-position =0
    var dataPos = $(this).data('position');
    // create a variable $('.topic') check data-topic =1
    var topicPos = $('.topic').data('topic');

    // ajax get from /api/topics/(insert above topic varible here =1)/cards
    $.ajax({
      url: `/api/topics/${topicPos}/cards`,
      type: 'GET'
    }).then(data => {
      var newCard = dataPos + 1;

      if (data.length != newCard) {
        window.location.replace(`/view/${topicPos}/${newCard}`);
      } else {
        window.location.replace(`/view/${topicPos}/0`)
      }

    });

  });

  $('.back').on("click", function () {
    // create variable where in the array $(this) data-position =0
    var dataPos = $(this).data('position');
    // create a variable $('.topic') check data-topic =1
    var topicPos = $('.topic').data('topic');

    // ajax get from /api/topics/(insert above topic varible here =1)/cards
    $.ajax({
      url: `/api/topics/${topicPos}/cards`,
      type: 'GET'
    }).then(data => {
      var newCard = dataPos - 1;

      if (newCard != -1) {
        window.location.replace(`/view/${topicPos}/${newCard}`);
      } else {
        newCard = data.length - 1
        window.location.replace(`/view/${topicPos}/${newCard}`)
      }
    });

  });

//Post for topic table
  $(".create-topic").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newTopic = {
      subject: $("#topic").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/topics", {
      type: "POST",
      data: newTopic
    }).then(
      function() {
        console.log("created new topic");
        // Reload the page to get the updated list
        // location.reload();
        window.location.replace(`/create`)
      }
    );
  });

  $(".submit").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newCard = {
      term: $('#term').val().trim(),
      definition: $('#definition').val().trim(),
      TopicId: $('.topic').data('topicid')
    };

    console.log(newCard)

    // Send the POST request.
    $.ajax(`/api/topics/${$('.topic').data('topicid')}`, {
      type: "POST",
      data: newCard
    }).then(
      function() {
        console.log("created new card");
        // Reload the page to get the updated list
        // location.reload()
        window.location.replace(`/create`)
      }
    );
  });

});

