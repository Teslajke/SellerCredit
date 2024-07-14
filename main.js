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
    $(this)
      .prev(".range-value")
      .text(
        $(this).val() +
          " " +
          num2str(parseInt($(this).val()), ["месяц", "месяца", "месяцев"])
      )
  })

  $("#fee")
    .on("focusin", function () {
      $(this).val(parseInt($(this).val()))
    })
    .on("focusout", function () {
      let t = $(this).val()
      ;(t = t.replace(/\s/g, "")),
        "" == t || isNaN(parseInt(t))
          ? $(this).val("0%")
          : $(this).val(parseInt(t) + "%")
    })

  function calc() {
    console.log(55)
    const month = $calc.find('[name="month"]:checked').val(),
      fee = parseInt($calc.find("#fee").val()),
      amount = $calc.find("#amount").val(),
      period = $calc.find("#period").val()
    console.log(month, fee, amount, period)
    $calc.find("#turnover").text(month * fee * amount * period)
  }
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
