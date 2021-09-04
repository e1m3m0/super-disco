var schedule = [];
var now = moment().format("dddd, MMMM Do YYYY");
var currentDay = $("#currentDay");
var containerTime = $(".description");

var scheduleTime = function () {
  var date = moment();
  var format = "dddd, MMMM Do YYYY";
  var results = date.format(format);
  $(currentDay).text(results);
  console.log(results);

  console.log(containerTime);

  $(containerTime).each(function (element, index) {
    var time = moment().hour($(this).attr("id"));
    console.log(time);
    if (moment(time).isBefore(date)) {
      $(containerTime).removeClass("present");
      $(containerTime).removeClass("future");
      $(containerTime).addClass("past");
    } else if (moment(time).isSame(date)) {
      $(containerTime).addClass("present");
      $(containerTime).removeClass("future");
      $(containerTime).removeClass("past");
    } else if (moment(time).isAfter(date)) {
      $(containerTime).removeClass("present");
      $(containerTime).addClass("future");
      $(containerTime).removeClass("past");
    }
  });
};

$(".description").on("click", "p", function () {
  var text = $(this).text().trim();
  var hour = $(this).attr("class");

  console.log(hour);

  var textInput = $("<textarea>").val(text).attr("class", hour);
  $(this).replaceWith(textInput);

  textInput.trigger("focus");
});

$(".description").on("blur", "textarea", function () {
  var h = $(this).attr("class");
  var d = $(this).val();
  if (!d) {
    console.log("Did not write a task");
  } else {
    schedule.push({
      hour: h,
      desc: d,
    });
  }
});

var saveSchedule = function () {
  localStorage.setItem("schedule", JSON.stringify(schedule));
};

var loadSchedule = function () {
  schedule = JSON.parse(localStorage.getItem("schedule"));

  scheduleTime();

  if (!schedule) {
    schedule = [];
  }

  $.each(schedule, function (index, value) {
    console.log(schedule);
    var h = schedule[index].hour;
    var d = schedule[index].desc;
    console.log(h);
    $("." + h).text(d);
    console.log(d);
  });
};

$(".row").on("click", ".saveBtn", saveSchedule);

setInterval(scheduleTime, 12000000);
loadSchedule();
