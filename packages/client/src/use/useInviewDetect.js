import { onUnmounted } from '@vue/composition-api'

const log = require('debug')('useInViewDetect')
/**
 * Detect elements visibility
 *
 * TODO compute thresholdRate if el taller then viewport
 * @see https://react-intersection-observer.vercel.app/?path=/story/useinview-hook--taller-than-viewport-with-threshold-100-percentage
 */
export const useInViewDetect = (onEnter) => {
  let observer

  const targets = new WeakSet()

  function init(root) {
    if (typeof onEnter !== 'function') {
      throw 'onEnter event undefined'
    }

    if (observer) {
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onEnter(entry.target)
            unObserve(entry.target)
          }
        })
      },
      {
        root,
        threshold: 0.5
      }
    )

    log('init', root)
  }

  function observe(el) {
    if (!targets.has(el)) {
      log('observe', el)
      targets.add(el)
      observer.observe(el)
    }
  }

  function unObserve(el) {
    if (targets.has(el)) {
      log('unObserve', el)
      targets.delete(el)
      observer.unobserve(el)
    }
  }

  onUnmounted(() => {
    observer.disconnect()
  })

  return {
    init,
    observe
  }
}
