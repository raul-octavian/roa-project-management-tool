import { ref, computed } from 'vue'

// document.getElementById("start").addEventListener("click", start);
// document.getElementById("stop").addEventListener("click", stop);
// document.getElementById("reset").addEventListener("click", reset);

const Stopwatch = () => {
  const time = ref('00:00')
  let timeBegan = null
  let timeStopped = null
  let stoppedDuration = 0
  const started = ref(null)
  const running = ref(false)

  function start() {
    if (running.value) return
    console.log('start')

    if (timeBegan === null) {
      timeBegan = new Date()
    }

    if (timeStopped !== null) {
      stoppedDuration += (new Date() - timeStopped)
    }

    started.value = setInterval(clockRunning, 1000)
    console.log({ running, started: started.value })
    running.value = true
  }

  function stop() {
    running.value = false
    timeStopped = new Date()
    clearInterval(started.value)
  }

  const clockRunning = () => {
    const currentTime = new Date()
    const timeElapsed = new Date(currentTime - timeBegan - stoppedDuration)
    const hour = timeElapsed.getUTCHours()
    const min = timeElapsed.getUTCMinutes()

    time.value =
      zeroPrefix(hour, 2) + ':' +
      zeroPrefix(min, 2)
    return time
  }
  return { time, running, start, stop }
}

function zeroPrefix(num, digit) {
  let zero = ''
  for (let i = 0; i < digit; i++) {
    zero += '0'
  }
  return (zero + num).slice(-digit)
}

export { Stopwatch }
