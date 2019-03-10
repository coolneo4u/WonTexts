<template lang="html">
<div class="text-xs-center">
  <v-dialog v-model="dialog" width="500">
    <v-btn slot="activator" flat small color="grey lighten-5">{{ $t('login.login') }}</v-btn>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>{{ title }}</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation @keyup.native.enter="handleSubmit">
          <div class="form-group">
            <v-flex xs12 md4 v-show="mode === 'register'">
              <v-text-field
                v-model="firstName"
                label="First Name"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md4 v-show="mode === 'register'">
              <v-text-field
                v-model="lastName"
                label="Last Name"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field
                :type="showPassword ? '' : 'password'"
                v-model="password"
                :rules="passwordRules()"
                label="Password"
                required
              ></v-text-field>
              <v-checkbox
                v-model="showPassword"
                label="Show Password"
              />
            </v-flex>
          </div>
        </v-form>
      </v-card-text>

      <v-card-actions v-show="mode === 'login'">
        <div class="login-message" v-show="status.message">{{$t(`login.${status.message}`)}}</div>
        <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        <v-spacer />
        <v-btn type="button" class="select-register-button" @click="selectRegister" flat color="primary">{{$t('login.register')}}</v-btn>
        <v-btn type="submit" class="login-button" @click.prevent="handleSubmit" color="primary" :disabled="status.loggingIn || !canSubmit">{{$t('login.login')}}</v-btn>
      </v-card-actions>
      <v-card-actions v-show="mode === 'register'">
        <div class="login-message" v-show="status.message">{{$t(`login.${status.message}`)}}</div>
        <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        <v-spacer />
        <v-btn type="button" class="select-register-button" @click="selectLogin" flat color="primary">{{$t('login.login')}}</v-btn>
        <v-btn type="submit" class="login-button" @click.prevent="handleSubmit" color="primary" :disabled="status.loggingIn || !canSubmit">{{$t('login.register')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      showPassword: false,
      mode: 'login',
      dialog: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+\..{2,3}/.test(v) || 'E-mail must be valid'],
      passwordRules: () => {
        const minimumRule = v => (v || '').length >= 8 || 'Minimum 8 characters required'
        const numberRule = v => /[0-9]+/.test(v) || 'Need number'
        const upperCaseRule = v => /[A-Z]+/.test(v) || 'Need uppercase'
        return [minimumRule, numberRule, upperCaseRule]
      }
    }
  },
  computed: {
    ...mapState('account', ['status']),
    title: function() {
      if (this.mode === 'login') return this.$t('login.title')
      else return this.$t('login.titleRegister')
    },
    canSubmit: function() {
      return this.email && this.password
    }
  },
  created() {
    // reset login status
    // this.logout()
  },
  methods: {
    ...mapActions('account', ['login', 'logout', 'register']),
    selectRegister() {
      this.mode = 'register'
    },
    selectLogin() {
      this.mode = 'login'
    },
    handleSubmit(e) {
      this.submitted = true
      const { email, password, firstName, lastName } = this
      if (this.$refs.form.validate()) {
        if (this.mode === 'login') {
          const result = this.login({ email, password })
          result.then(user => {
            if (user) {
              console.log('logged has user: ', this.status.message)
              setTimeout(() => {
                this.$data.dialog = false
              }, 300)
            } else {
              console.log('logged no user: ', this.status.message)
            }
          })
        } else {
          const result = this.register({ email, password, firstName, lastName })
          console.log('result: ', result)
          result.then(user => {
            if (user) {
              console.log('registered have user: ', this.status.message)
              setTimeout(() => {
                this.$data.dialog = false
              }, 300)
            } else {
              console.log('registered no user: ', this.status.message)
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="css">
.login-message {
  font-size: 0.8rem;
}
.login-button {
  margin-left: 20px !important;
}
</style>
