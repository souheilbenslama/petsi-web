<template>
  <b-row class="h-50 formContainer">
    <b-colxx xxs="12" md=10  class="mx-auto my-auto">
      <b-card class="auth-card " no-body>
          <div class="position-relative image-side-register">
                <div class="text-center mt-0 mb-2">
                <router-link tag="a" to="/">
                    <img src="/assets/img/logo-black.svg"/>
                </router-link>
                </div>
            </div>
          <div class="form-side">
            <h6 class="mb-4">{{ $t('user.register')}}</h6>
            <b-form @submit.prevent="formSubmit">
               <b-form-group :label="$t('user.firstname')" class="has-float-label mb-4">
                        <b-form-input type="text" v-model="$v.form.firstname.$model" :state="!$v.form.firstname.$error" />
                        <b-form-invalid-feedback v-if="!$v.form.firstname.required">Please enter your firstname</b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.form.firstname.minLength">Your firstname must be at least 4 characters</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('user.lastname')" class="has-float-label mb-4">
                        <b-form-input type="text" v-model="$v.form.lastname.$model" :state="!$v.form.lastname.$error" />
                        <b-form-invalid-feedback v-if="!$v.form.lastname.required">Please enter your lastname</b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.form.lastname.minLength">Your lastname must be at least 4 characters</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('user.email')" class="has-float-label mb-4">
                        <b-form-input type="email" v-model="$v.form.email.$model" :state="!$v.form.email.$error" />
                        <b-form-invalid-feedback v-if="!$v.form.email.required">Please enter your email address</b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.form.email.email">Please enter a valid email address</b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.form.email.minLength">Your email must be minimum 4 characters</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('user.password')" class="has-float-label mb-4">
                        <b-form-input type="password" v-model="$v.form.password.$model" :state="!$v.form.password.$error" />
                        <b-form-invalid-feedback v-if="!$v.form.password.required">Please enter your password</b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.form.password.minLength || !$v.form.password.maxLength">Your password must be between 4 and 16 characters</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('user.confirm-password')" class="has-float-label mb-4">
                        <b-form-input type="password" v-model="$v.form.confirmPassword.$model" :state="!$v.form.confirmPassword.$error" />
                        <b-form-invalid-feedback v-if="!$v.form.password.required">Please enter your password</b-form-invalid-feedback>
                        <b-form-invalid-feedback v-if="!$v.form.confirmPassword.required">Please confirm your password</b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.form.confirmPassword.minLength || !$v.form.confirmPassword.maxLength">Your password must be between 4 and 16 characters</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('user.address')" class="has-float-label mb-4">
                        <b-form-input type="text" v-model="$v.form.address.$model" :state="!$v.form.address.$error" />
                        <b-form-invalid-feedback v-if="!$v.form.address.required">Please enter your address</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('user.telephone')" class="has-float-label mb-4">
                        <b-form-input type="number" v-model="$v.form.telephone.$model" :state="!$v.form.telephone.$error" />
                        <b-form-invalid-feedback v-if="!$v.form.telephone.required">Please enter your phone number</b-form-invalid-feedback>
                        <b-form-invalid-feedback v-if="!$v.form.telephone.minlength">Your phone number must be 8 digits</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('user.birthdate')" class="has-float-label mb-4">
                        <b-form-input type="date" v-model="$v.form.birthdate.$model" :state="!$v.form.birthdate.$error" />
                        <b-form-invalid-feedback v-if="!$v.form.birthdate.required">Please enter your birthdate</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group :label="$t('user.role')" class="has-float-label mb-4">
                        <b-form-select v-model="$v.form.role.$model" :options="options" :state="!$v.form.role.$error"></b-form-select>
                        <b-form-invalid-feedback v-if="!$v.form.role.required">Please chose a role</b-form-invalid-feedback>
              </b-form-group>

              <div class="d-flex justify-content-end align-items-center">
                  <b-button type="submit" variant="primary" size="lg" class="btn-shadow">{{ $t('user.register-button')}}</b-button>
              </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import {
    validationMixin
} from "vuelidate";
const {
    required,
    maxLength,
    minLength,
    email
} = require("vuelidate/lib/validators");

export default {
  data () {
    return {
      form: {
         fullname: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        phone: '',
        birthdate: null,
        role: null,
      },
      
      options: [
        { value: 'owner', text: 'Owner' },
        { value: 'vet', text: 'Veterinary' },
      ]
    }
  },
  mixins: [validationMixin],
    validations: {
        form: {
            firstname: {
                required,
                minLength: minLength(4)
            },
            lastname: {
                required,
                maxLength: maxLength(16),
                minLength: minLength(4)
            },
            email: {
              required,
              email,
              minLength: minLength(4)
            },
            password: {
              required,
              minLength: minLength(4)
            },
            confirmPassword: {
              required,
              minLength: minLength(4),
            },
            address: {
              required,
            },
            telephone: {
              required,
            },
            birthdate: {
              required,
            },
            role: {
              required,
            },
        }
    },
  methods: {
    formSubmit () {
      console.log('register')
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
 .formContainer {
   margin-top: 2rem;
   margin-bottom: 2rem;
 }
</style>
