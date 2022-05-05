import { ref, computed } from 'vue'
import { setCookie, deleteCookie } from './cookie'
import { uri } from './uri'
import { userData } from '@/store/index'
import { useRouter } from 'vue-router'
import { updateUserInformation } from './updateUserInformation'

let token = null

export default function loginUser() {
  const res = ref({})
  const router = useRouter()
  const user = userData()

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
        token = res.value.token
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

const logout = () => {
  console.log('logout')
  const user = userData()
  deleteCookie('id')
  deleteCookie('name')
  deleteCookie('username')
  deleteCookie('email')
  deleteCookie('token')
  user.$reset()
  token = null
}

export { token, logout }
