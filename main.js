jQuery(function ($) {
  const $form = $("#form")
  const $form2 = $("#form2")
  const $calc = $(".calc")

  function num2str(t, a) {
    var e = (t = Math.abs(t) % 100) % 10
    return t > 10 && t < 20
      ? a[2]
      : e > 1 && e < 5
      ? a[1]
      : 1 == e
      ? a[0]
      : a[2]
  }

  $("#check").on("click", function () {
    $(".chek-gal").css({ opacity: $(this).is(":checked") ? "1" : "0" })
  })
  $("#get_send_calc").on("click", function () {
    $("html, body").animate({ scrollTop: $("#request").offset().top }, 500)
  })
  $("#phone").mask("+7(999)999-99-99")
  $("#email").on("focusout", function () {
    ;/^[a-z0-9][a-z0-9-_.]{0,}[a-z0-9]@[a-z0-9][a-z0-9-_.]{0,}[a-z0-9]\.[a-z0-9][a-z0-9-_.]{0,}[a-z0-9]$/i.test(
      $("#email").val()
    )
      ? ($(".ermail").removeClass("activer"), (o = !0))
      : ($(".ermail").addClass("activer"), (o = !1))
  })

  $("#amount").on("input", function () {
    $(this)
      .prev(".range-value")
      .text(
        $(this)
          .val()
          .replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ")
      )
  })
  $("#period").on("input", function () {
    let value = $(this).val()
    if (value > 3 && value < 6) {
      value = 6
    }
    $(this).val(value)

    $(this)
      .prev(".range-value")
      .text(
        value + " " + num2str(parseInt(value), ["месяц", "месяца", "месяцев"])
      )
  })

  $("#fee").on("input", function () {
    $(this)
      .prev(".range-value")
      .text($(this).val() + "%")
  })

  $("#days").on("input", function () {
    $(this)
      .prev(".range-value")
      .text(
        $(this).val() +
          " " +
          num2str(parseInt($(this).val()), ["день", "дня", "дней"])
      )
  })

  function pretiffyNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ")
  }

  const overBase = [3463, 4200, 10264],
    step = 100_000

  function calc() {
    const days = $calc.find("#days").val(),
      fee = parseInt($calc.find("#fee").val()),
      amount = $calc.find("#amount").val(),
      period = $calc.find("#period").val(),
      over = Math.ceil((amount / step) * overBase[Math.floor(period / 3)])

    $calc.find("#over").text(pretiffyNumber(over))
    $calc
      .find("#turnover")
      .text(
        pretiffyNumber(
          Math.ceil(
            (amount * (1 + fee / 100) * 0.6 - amount) * ((period * 30) / days) -
              over
          )
        )
      )
  }
  calc()
  $calc.on("input", "input", calc)

  $form.on("submit", function (e) {
    e.preventDefault()

    var form = $(this)
    var actionUrl = form.attr("action")

    $.ajax({
      type: "POST",
      url: actionUrl,
      data: form.serialize(),
      success: function (data) {
        alert(data)
      },
    })
  })
  $form2.on("submit", function (e) {
    e.preventDefault()

    var form = $(this)
    var actionUrl = form.attr("action")

    $.ajax({
      type: "POST",
      url: actionUrl,
      data: form.serialize(),
      success: function (data) {
        alert(data)
      },
    })
  })
})
