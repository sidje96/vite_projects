export function useDate() {
  const formatDate = (date) => {
    if (!date) return ''
    return new Intl.DateTimeFormat('nl-NL').format(new Date(date))
  }

  return { formatDate }
}