<!-- <template>
  <LoadingSpinner v-if="loading" />
  <template v-else>
    <HeaderComp align="center">
      <template #title> Employee Manager </template>
      <template #button v-if="user?.role === 'ADMIN'">
        <ActionButton
          @click="goToDashboard"
          :style="{ position: 'absolute', top: '50%', right: '0%', transform: 'translateY(-50%)' }"
          >Dashboard</ActionButton
        >
      </template>
    </HeaderComp>
    <h2>Employee List</h2>
    <div class="buttons">
      <ActionButton color="white" size="big" @click="setModal(true)">
        Add New Employee
      </ActionButton>
      <ActionButton color="white" size="big" @click="signOut">Sign Out</ActionButton>
    </div>

    <TableList page="home">
      <template #headings>
        <TableHeading v-for="heading in tableHeadings" :key="heading.id">
          {{ heading.name }}
        </TableHeading>
      </template>
      <template #elements>
        <TableElement
          v-for="employee in employees"
          class="home"
          :key="employee.id"
          :element="employee"
          :inputs="homeInputs"
          @delete-event="deleteEmployee"
          @edit-event="editEmployee"
        />
      </template>
    </TableList>

    <FormModal
      v-if="isModalOpen"
      :singleEmployee="singleEmployee"
      :inputs="props.inputs"
      @close-modal="setModal(false)"
      @submit-event="submitForm"
    />
  </template>
</template>

<script setup lang="ts">
import FormModal from 'src/components/form/FormModal.vue'
import TableList from 'src/components/layout/TableList.vue'
import HeaderComp from 'src/components/layout/HeaderComp.vue'
import TableElement from 'src/components/layout/TableElement.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import TableHeading from 'src/components/layout/TableHeading.vue'
import { emptyEmployeeErrors, emptySingleEmployee } from 'src/utils/constants'
import { EmployeeType } from 'src/utils/types'
import { PropType, ref } from 'vue'
import { deleteData, postData, editData } from 'src/api/api'
import { showToast } from 'src/utils/toast'
import { useRouter } from 'vue-router'
import { useFetchSideData } from 'src/composables/useFetchSideData'
import { useFetchUser } from 'src/composables/useFetchUser'
import { useFetchData } from 'src/composables/useFetchData'
import { InputType } from 'src/utils/types'


const props = defineProps({
  inputs: {
    type:Array as PropType<InputType[]>
  }
})
const { user } = useFetchUser()
const { data: employees, addMainData, editMainData, removeMainData } = useFetchData('employee')
const { data: tableHeadings } = useFetchSideData('table/main')
const { data: homeInputs, loading } = useFetchSideData('inputs/home')


const isModalOpen = ref<boolean>(false)
const singleEmployee = ref<EmployeeType>(emptySingleEmployee)
const formErrors = ref(emptyEmployeeErrors)

const router = useRouter()

// const addEmployee = (employee: EmployeeType) => employees.value.push(employee)

// const removeEmployee = (id: number) => {
//   employees.value = employees.value.filter((emp) => emp.id !== id)
// }

const resetForm = () => {
  formErrors.value = emptyEmployeeErrors
}

const submitForm = async (employee: EmployeeType) => {
  try {
    const response = await postData(employee, 'employee')
    // addEmployee(response.data)
    addMainData(response.data)
    resetForm()
    setModal(false)
  } catch (error) {
    console.error(error)
  }
}

const editEmployee = async (employee: EmployeeType) => {
  try {
    const response = await editData(employee, `employee/${employee.id}`)
    if (response.data) {
      // employees.value = employees.value.map((emp) => (emp.id === employee.id ? employee : emp))
      editMainData(employee)
    } else {
      showToast(response.message, 'error')
    }
  } catch (error) {
    console.error(error)
  }
}

const deleteEmployee = async (id: number) => {
  try {
    const response = await deleteData('employee', id)
    if (response && response.ok) {
      // removeEmployee(id)
      removeMainData(id)
    } else {
      const responseData = await response?.json()
      showToast(responseData.message, 'error')
    }
  } catch (error) {
    console.error(error)
  }
}

const signOut = async () => {
  router.push('/login')
  localStorage.removeItem('login-token')
  setTimeout(() => {
    showToast(`${user.value?.firstName} logged out`)
  }, 1000)
  if (user.value?.role === 'GUEST' && user.value.id) {
    await deleteData('users', user.value.id)
  }
}

const setModal = (value: boolean) => {
  isModalOpen.value = value
}

const goToDashboard = () => {
  router.push('/dashboard')
}
</script> -->
