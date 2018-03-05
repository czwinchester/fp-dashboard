exports.assertion = function (selector, string, count, message = null) {
  this.message = 'Testing if <' + selector + '> with ' + string + ' has count: ' + count
  this.expected = count
  this.pass = value => value === this.expected
  this.value = result => result.value

  this.command = callback => {
    const self = this
    return this.api.execute(
      (selector, string) => {
        let count = 0
        document.querySelectorAll(selector).forEach(node => {
          if (node.innerText.includes(string)) {
            count++
          }
        })
        return count
      },
      [selector, string],
      result => { callback.call(self, result) }
    )
  }
}
