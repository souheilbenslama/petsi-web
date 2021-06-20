import store from '@/store'

export const AuthRequired = function (to, from, next) {
  let token = store.getters.token
  if (token) {
    next()
  } else {
    localStorage.removeItem('user')
    next('/user/login')
  }
}

export const NotAuthRequired = function (to, from, next) {
  let token = store.getters.token
  let type = store.getters.type
  if (!token) {
    next()
  } else {
    if(type == 'Pet Owner')
    next('/owner/pets');
    if(type == 'Veterinary')
    next('/vet/profile')
  }
}