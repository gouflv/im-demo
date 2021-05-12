export const useInViewDetect = (root, onEnter) => {
  let observer

  function init() {
    console.log(root.value)
    if (typeof onEnter !== 'function') {
      throw 'onEnter event undefined'
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting && onEnter()
      },
      {
        // root
      }
    )
  }

  return {
    init
  }
}
