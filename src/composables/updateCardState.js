// import { ref } from 'vue'
// import { uri } from '@/composables/uri'
// import { token } from './setUser'
// import { projectData } from './getOneFullProject'

// const updateOneCard = function () {
//   const fetchError = ref('')

//   const updateCard = async (id, newStage, index) => {
//     try {
//       const response = await fetch(
//         `${uri}projects/${projectData.value._id}/cards/${id}/update`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'auth-token': token
//           },
//           body: JSON.stringify({
//             stage: newStage,
//             index: index
//           })
//         }
//       )
//       const data = await response.json()

//       if (data[0].error) {
//         fetchError.value = data.error
//       } else {
//         // toggleCard()
//         // reloadPage()
//       }
//     } catch (err) {
//       fetchError.value = err.message
//     }
//   }

//   return { updateCard }
// }
// export { updateOneCard }
