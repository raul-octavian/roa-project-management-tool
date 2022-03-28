import { ref } from 'vue'
import { setCookie } from './cookie'
import { uri } from './uri'
import { userData } from '@/store/index'
import { useRouter } from 'vue-router'
import { userInfo, updateUserInformation } from './updateUserInformation'

export default function loginUser() {
  const res = ref({})
  const user = userData()
  const router = useRouter()

  const login = async (loginInfo) => {
    try {
      const response = await fetch(
        `${uri}user/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'

          },
          body: JSON.stringify(loginInfo)
        }

      )
      const data = await response.json()

      if (noError) {
        res.value = data.data
        const { getUser } = updateUserInformation()
        setCookies(res)
        user.setUserToStore(res.value)
        getUser()
        router.push('/')
      } else {
        res.value = data
      }
    } catch (err) {
      res.value = err.message
    }
  }
  const noError = (data) => {
    return !!data.error
  }
  const setCookies = (res) => {
    setCookie('id', res.value.user_id, '1')
    setCookie('name', res.value.name, '1')
    setCookie('username', res.value.username, '1')
    setCookie('email', res.value.email, '1')
    setCookie('token', res.value.token, '1')
  }

  return { res, login, noError, setCookie }
}
