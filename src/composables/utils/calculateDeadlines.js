import { computed } from 'vue'

const calculateDeadlines = (card) => {
  const daysUntilDeadline = computed(() => {
    const formatDueDate = computed(() => {
      return card.value?.cardDueDate
        ? new Date(card.value?.cardDueDate).toISOString().substr(0, 10)
        : ''
    })
    if (formatDueDate.value) {
      const day1 = new Date()
      const day2 = new Date(formatDueDate.value)
      const difference = day2.getTime() - day1.getTime()
      const day = 1000 * 60 * 60 * 24
      const days = difference / day

      if (days < 0 && days > -1) return -1
      if (days < -1) return Math.ceil(days)
      if (days > 0 && days < 1) return 1
      if (days > 1) return Math.ceil(days)

      return Math.floor(days)
    }
    return 0
  })

  return { daysUntilDeadline }
}

export { calculateDeadlines }
