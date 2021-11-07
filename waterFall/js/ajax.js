function ajax (options) {
  options.data = options.data || {};
  options.method = options.method ? options.method.toUpperCase() : 'GET';
  var xhr = new XMLHttpRequest();
  var formatData = []
  for (var key in options.data) {
    formatData.push(''.concat(key, '=', options.data[key]))
  }
  options.data = formatData.join('&')

  if (options.method === 'GET') {
    options.url += ''.concat('?', options.data)
  }

  xhr.open(options.method, options.url)

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        options.onSuccess(options.type === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText)
      } else {
        options.onError(new Error(xhr.responseText))
      }
    }
  }

  if (options.method === 'POST') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  }

  xhr.send(options.method === 'POST' ? options.data : null)
}