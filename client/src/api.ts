import { EmployeeType } from "./utils/types"

export const postData = async (data:EmployeeType) => {
  const response = await fetch('http://localhost:3000/employee', {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  return response
}