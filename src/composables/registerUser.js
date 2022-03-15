
import { useRouter } from 'vue-router'
import { uri } from '../composables/uri'
import loginUser from '../composables/setUser'
import { ref, reactive, computed } from 'vue'

export default function registerUser() {
  const router = useRouter()

  // use login to log the user in the app once the new user is created
  const { login } = loginUser()

  // catch user input
  const repeatPassword = ref('1234567890')
  const userReq = reactive({
    name: ref('Johny One'),
    password: ref('1234567890'),
    username: ref('johnyOne'),
    email: ref('johnyOne@test.com')
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

  // create new account

  const createAccount = async () => {
    if (!populateErrors.value.length) {
      // console.log(requestOptions)
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

      console.log(data)
      // destructure the user info for login

      if (data.email) {
        const { email, password } = userReq

        // login with user info
        login({ email, password })
      } else {
        fetchError.value = data.error
      }

      // if we have data push to home
      if (data.email) {
        router.push('/')
      }
    }
  }

  return { createAccount, populateErrors, passwordsMarch, passwordLength, userReq, repeatPassword, fetchError }
}
