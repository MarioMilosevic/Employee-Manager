import { useRoute } from 'vue-router'
import { computed } from 'vue'

export function useGetElement() {
  const route = useRoute()

  const elements = computed(() => {
    return route.name === 'Home' ? 'employees' : 'users'
  })

  return {
    elements,
  }
}
