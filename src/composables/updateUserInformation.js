import { uri } from './uri'
import { userData } from '@/store'
import { ref } from 'vue'

const userInfo = ref('')

const updateUserInformation = () => {
  const fetchError = ref('')
  const message = ref('')
  const user = userData()

  const getUser = async () => {
    try {
      const response = await fetch(
        `${uri}user/${user.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': user.token,
            Connection: 'keep-alive'
          }
        }
      )
      userInfo.value = await response.json()
    } catch (err) {
      fetchError.value = err.message
    }
  }

  const updateUser = async (payload) => {
    try {
      const response = await fetch(
        `${uri}user/${user.id}/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': user.token,
            Connection: 'keep-alive'
          },
          body: JSON.stringify(payload
          )
        }
      )
      const data = await response.json()

      if (data) {
        message.value = data.message
        console.log('user', data)
        // console.log('data on delete')
        // console.log(projectData.value.cards[1].cardMembers.length)
        // console.log(projectData.value.cards[1].cardMembers.length)
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }

  return { updateUser, getUser, fetchError, message }
}

export { updateUserInformation }
