export const phoneRule = (rule, value, callback) => {
  const cellphone = /^[09]{2}[0-9]{8}$/

  if (cellphone.test(value)) {
    callback()
  } else {
    callback(new Error('請輸入正確手機格式'))
  }
}

export const gmailRule = (rule, value, callback) => {
  const testExpression = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/

  if (testExpression.test(value) || value === '') {
    callback()
  } else {
    callback(new Error('請輸入正確gmail格式'))
  }
}
