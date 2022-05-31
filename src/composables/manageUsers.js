import { useRouter } from 'vue-router'
import { uri } from './utils/uri'
import { ref, reactive, computed } from 'vue'
import { setCookie, deleteCookie } from './utils/cookie'
import { token, userInfo, projectData } from '@/store/store'

let userLoggedIn = false
let userInfoLocal = {}

const manageUsers = () => {
  const router = useRouter()

  // use login to log the user in the app once the new user is created

  // catch user input
  const repeatPassword = ref('')
  const userReq = reactive({
    name: ref(''),
    password: ref(''),
    username: ref(''),
    email: ref('')
  })

  // check for errors

  const passwordsMarch = computed(() => {
    return userReq.password !== repeatPassword.value
  })

  const passwordLength = computed(() => {
    return userReq.password.length < 10
  })

  const populateErrors = computed(() => {
    const err = []
    if (passwordsMarch.value) {
      err.push('Passwords do not match, please try again')
    }
    if (passwordLength.value) {
      err.push('Password must be at least 10 characters long')
    }
    return err
  })

  const fetchError = ref('')
  const res = ref({})
  const message = ref('')
  const isLoggingIn = ref(false)

  // create account and login user if account is created successfully

  const createAccount = async () => {
    try {
      if (!populateErrors.value.length) {
        const response = await fetch(
          `${uri}user/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userReq)
          }
          // requestOptions
        )
        const data = await response.json()

        if (data.data) {
          // destructure the user info for login
          const { email, password } = userReq
          // login with user info
          login({ email, password })
        } else {
          fetchError.value = data.error
        }
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }

  const login = async (loginInfo) => {
    isLoggingIn.value = true
    try {
      const response = await fetch(
        `${uri}user/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(loginInfo)
        }

      )
      const data = await response.json()
      if (noError) {
        res.value = await data.data
        await setCookies(res)
        userLoggedIn = true
        userInfoLocal = res.value
        token.value = await res.value.token
        getUser()
        isLoggingIn.value = false
        router.push('/')
      } else {
        res.value = data
      }
    } catch (err) {
      res.value = err.message
    }
  }

  const getUser = async () => {
    try {
      const response = await fetch(
        `${uri}user/${userInfoLocal.user_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value,
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
        `${uri}user/${userInfo.value._id}/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token.value,
            Connection: 'keep-alive'
          },
          body: JSON.stringify(payload
          )
        }
      )
      const data = await response.json()

      if (data) {
        message.value = data.message
        getUser()
      }
    } catch (err) {
      fetchError.value = err.message
    }
  }

  const logout = () => {
    deleteCookie('id')
    deleteCookie('name')
    deleteCookie('username')
    deleteCookie('email')
    deleteCookie('token')
    token.value = ''
    userInfo.value = {}
    projectData.value = {}
    // userLoggedIn = false
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

  return { createAccount, populateErrors, passwordsMarch, passwordLength, userReq, repeatPassword, fetchError, res, login, noError, setCookie, logout, updateUser, getUser, isLoggingIn }
}

export { manageUsers, userLoggedIn }
