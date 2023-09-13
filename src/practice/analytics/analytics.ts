let logged

function sendAnalytics(data: String) {
  console.log(data)
  logged = true
}

sendAnalytics('The data')