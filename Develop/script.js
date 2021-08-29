var schedule = {};

$(".description").on("click", "p", function () {
  var text = $(this).text().trim();

  var textInput = $("<textarea>").val(text);
  $(this).replaceWith(textInput);

  textInput.trigger("focus");
});

$(".description").on("blur", "textarea", function () {
  var tempSchd = [];
  var desc = $("textarea").val();
  var hour = $(".description").attr("id");

  tempSchd.push({
    hour: hour,
    desc: desc,
  });

  schedule = tempSchd;
});

var saveSchedule = function () {
  localStorage.setItem("schedule", JSON.stringify(schedule));
};

var loadSchedule = function () {
  schedule = JSON.parse(localStorage.getItem("schedule"));

  if (!schedule) {
    schedule = {
      hour: [],
      desc: [],
    };
  }
  $.each(schedule, function (index, value) {
    console.log(schedule);
    var h = schedule[index].hour;
    var d = schedule[index].desc;
    console.log(h);
    $("#" + h)
      .find("p")
      .text(d);
    console.log(d);
  });
};

$(".row").on("click", ".saveBtn", saveSchedule);

loadSchedule();
