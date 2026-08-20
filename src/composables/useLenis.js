import Lenis from 'lenis'
import { onBeforeUnmount, onMounted } from 'vue'

export function useLenis(wrapperRef) {
  let lenis = null
  let frameId = null

  function raf(time) {
    lenis?.raf(time)
    frameId = requestAnimationFrame(raf)
  }

  onMounted(() => {
    if (!wrapperRef.value) return
    lenis = new Lenis({
      wrapper: wrapperRef.value,
      content: wrapperRef.value,
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1
    })
    frameId = requestAnimationFrame(raf)
  })

  onBeforeUnmount(() => {
    if (frameId) cancelAnimationFrame(frameId)
    lenis?.destroy()
  })
}
