/**
 * 数字补0
 * @param {number} num
 * @param {number} length
 * @example NumberFormat(1, 3) // '001'
 */
export function NumberFormat(num, length) {
  const numStr = num.toString()
  length = Math.max(numStr.length, length)
  return Array(length - numStr.length).fill(0) + numStr
}

/**
 * 时间格式化
 * @param {string} template
 * 格式化模版 年：YYYY 月：MM 日：DD 时：hh 分：mm 秒：ss
 * @example TimeFormat(new Date()) // '2019-10-1 10:22'
 * @example TimeFormat(new Date(), 'MM-DD hh:mm:ss') // '10-1 10:22:10'
 */
export function TimeFormat(timestamp = Date.now(), template = 'YYYY-MM-DD hh:mm') {
  const date = new Date(timestamp)
  const F2Bit = (num) => NumberFormat(num, 2)
  return template
    .replace('YYYY', () => `${date.getFullYear()}`)
    .replace('MM', () => F2Bit(date.getMonth() + 1))
    .replace('DD', () => F2Bit(date.getDate()))
    .replace('hh', () => F2Bit(date.getHours()))
    .replace('mm', () => F2Bit(date.getMinutes()))
    .replace('ss', () => F2Bit(date.getSeconds()))
}

/**
 * 日期格式化
 * @example DateFormat(new Date()) // '2019-10-1'
 */
export function DateFormat(timestamp = Date.now()) {
  return TimeFormat(timestamp, 'YYYY-MM-DD')
}

/**
 * 金钱(分)格式化
 * @example MoneyFormat(100) // '￥1'
 */
export function MoneyFormat(money = 0) {
  return '￥' + (money / 100).toFixed(2)
}

/**
 * 地址格式化
 * @param {object} info
 * @param {string} info.province
 * @param {string} info.city
 * @param {string} info.address
 */
export function AddressFormat(info) {
  // 可能需要修改，如果后台定义的字段不一样
  return [info.province, info.city, info.address]
    .filter(x => x)
    .join(' ')
}
