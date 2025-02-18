import { useRoute } from 'vue-router'
import { computed } from 'vue'

export function useGetElement() {
  const route = useRoute()

  const element = computed(() => {
    return route.name === 'Home' ? 'employee' : 'user'
  })

  return {
    element,
  }
}
