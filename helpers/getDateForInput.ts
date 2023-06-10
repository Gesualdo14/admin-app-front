const getDateForInput = (date?: string) => {
  const today = date ? new Date(date) : new Date()
  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()

  const finalDay = day > 9 ? day : "0" + day
  const finalMonth = month > 9 ? month : "0" + month

  return `${year}-${finalMonth}-${finalDay}`
}

export default getDateForInput
