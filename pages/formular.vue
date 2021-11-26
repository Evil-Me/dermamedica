<template>
  <section class="section">

    <div class="row" v-if="errors.length > 0">
      <div class="column">
        <b-notification
          type="is-danger"
          aria-close-label="Close notification"
          role="alert">
          Bitte füllen Sie alle Felder aus.
        </b-notification>
      </div>
    </div>

    <div class="row">
      <div class="column">
        <b-field id="last_name" label="Nachname" :type="{'is-danger': validations.last_name.hasError }" :message="validations.last_name.errorText">
          <b-input placeholder="Nachname" type="text" v-model="last_name"></b-input>
        </b-field>
      </div>

      <div class="column">
        <b-field id="first_name" label="Vorname" :type="{'is-danger': validations.first_name.hasError }" :message="validations.first_name.errorText">
          <b-input placeholder="Vorname" type="text" v-model="first_name"></b-input>
        </b-field>
      </div>
    </div>

    <div class="row">
      <div class="column">
        <b-field id="date" label="Geburtsdatum (TT.MM.JJJJ)" :type="{'is-danger': validations.date.hasError }" :message="validations.date.errorText">
          <b-input placeholder="15.08.1971" type="date" v-model="date"></b-input>
        </b-field>
      </div>

      <div class="column">
        <b-field id="street" label="Strasse" :type="{'is-danger': validations.street.hasError }" :message="validations.street.errorText">
          <b-input placeholder="Strasse" type="text" v-model="street"></b-input>
        </b-field>
      </div>
    </div>

    <div class="row">
      <div class="column">
        <b-field id="zip" label="PLZ" :type="{'is-danger': validations.zip.hasError }" :message="validations.zip.errorText">
          <b-input placeholder="PLZ" type="text" v-model="zip"></b-input>
        </b-field>
      </div>

      <div class="column">
        <b-field id="city" label="Wohnort" :type="{'is-danger': validations.city.hasError }" :message="validations.city.errorText">
          <b-input placeholder="Wohnort" type="text" v-model="city"></b-input>
        </b-field>
      </div>
    </div>

    <div class="row">
      <div class="column">
        <b-field id="id_number" label="Passnummer oder ID-Nummer" :type="{'is-danger': validations.id_number.hasError }" :message="validations.id_number.errorText">
          <b-input placeholder="Passnummer oder ID-Nummer" type="text" v-model="id_number"></b-input>
        </b-field>
      </div>
    </div>
    
    <div class="row">
      <div class="column">
        <b-field id="phone" label="Telefonnummer" :type="{'is-danger': validations.phone.hasError }" :message="validations.phone.errorText">
          <b-input placeholder="Telefonnummer" type="phone" v-model="phone"></b-input>
        </b-field>
      </div>

      <div class="column">
        <b-field id="email" label="Email" :type="{'is-danger': validations.email.hasError }" :message="validations.email.errorText">
          <b-input placeholder="Email" type="email" v-model="email"></b-input>
        </b-field>
      </div>
    </div>

    <div class="row">
      <div class="column">
        <b-field label="Möchten Sie Ihr Zertifikat via App bekommen?" :type="{'is-danger': validations.app.hasError }" :message="validations.app.errorText">
          <div class="block" id="app">
            <b-radio v-model="app"
                     name="app"
                     native-value="true">
              Ja
            </b-radio>
            <b-radio v-model="app"
                     name="app"
                     native-value="false">
              Nein
            </b-radio>
          </div>
        </b-field>
      </div>

      <div class="column"></div>
    </div>

    <div class="row">
      <div class="column">
        <b-field id="certificateID" label="Zertifikats-ID bei Zustellwunsch via App" :type="{'is-danger': validations.certificateID.hasError }" :message="validations.certificateID.errorText">
          <b-input placeholder="Zertifikats-ID" type="certificateID" v-model="certificateID"></b-input>
        </b-field>
      </div>
    </div>

    <div class="row">
      <div class="column">
        <b-button type="is-primary" @click="savePatientData">Patientendaten speichern</b-button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HomePage',
  data() {
    const today = new Date()

    return {
      errors: [],
      last_name: '',
      first_name: '',
      date: null,
      street: '',
      zip: '',
      city: '',
      id_number: '',
      email: '',
      phone: '',
      certificateID: '',
      showWeekNumber: false,
      locale: undefined,
      app: null,
      fields: ['last_name', 'first_name', 'date', 'street', 'zip', 'city', 'id_number', 'email', 'phone', 'app', 'certificateID'],
      validations: {
        last_name: {type: 'text', errorText: '', hasError: false},
        first_name: {type: 'text', errorText: '', hasError: false},
        date: {type: 'date', errorText: '', hasError: false},
        street: {type: 'text', errorText: '', hasError: false},
        zip: {type: 'text', errorText: '', hasError: false},
        city: {type: 'text', errorText: '', hasError: false},
        id_number: {type: 'none', errorText: '', hasError: false},
        email: {type: 'email', errorText: '', hasError: false},
        phone: {type: 'phone', errorText: '', hasError: false},
        app: {type: 'boolean', errorText: '', hasError: false},
        certificateID: {type: 'none', errorText: '', hasError: false},
      }
    }
  },

  methods: {
    clearDate () {
      this.selected = null
    },
    savePatientData () {
      this.validate()

      if (this.errors.length === 0) {
        const patient = {
          last_name: this.last_name,
          first_name: this.first_name,
          id_number: this.id_number,
          date: this.date,
          street: this.street,
          zip: this.zip,
          city: this.city,
          email: this.email,
          phone: this.phone,
          app: (this.app === 'true'),
          certificateID: this.certificateID,
        }

        const postPatientResponse = this.postPatientsData(patient)

        if (postPatientResponse) {
          this.$router.push('thankyou_kiosk')
        }
      }
    },
    validate () {
      this.errors = [];

      for (let field of this.fields) {
        const validation = this.validations[field]

        if (validation) {
          const validationField = this[field]
          if (validation.type === 'boolean' || validation.type === 'date') {
            validation.errorText = (validationField === null) ? 'Bitte wählen Sie einen Wert aus' : ''
            validation.hasError = (validationField === null)
            if (validationField === null) {
              this.errors.push(field)
            }
          } else if (validation.type === 'phone') {
            validation.errorText = (validationField === '') ? 'Bitte geben Sie eine gültige Telefonnummer an' : ''
            validation.hasError = (validationField === '')
            if (validationField === '') {
              this.errors.push(field)
            }
          } else if (validation.type === 'email') {
            validation.errorText = (validationField === '') ? 'Bitte geben Sie eine gültige Emailadresse ein' : ''
            validation.hasError = (validationField === '' || !validationField.includes('@'))
            if (validationField === '' || !validationField.includes('@')) {
              this.errors.push(field)
            }
          } else if (validation.type === 'text') {
            validation.errorText = (validationField === '') ? 'Bitte geben Sie einen gültige Wert ein' : ''
            validation.hasError = (validationField === '')
            if (validationField === '') {
              this.errors.push(field)
            }
          } else if (validation.type === 'none') {
            validation.errorText = ''
            validation.hasError = false
          }
        }
      }
    },
    async postPatientsData (patient) {
      return await axios.post('http://161.35.215.83/api/patient', patient)
    }
  }
}
</script>

<style scoped>
  .row {
    display: flex;
    flex-direction: row;
    margin: 24px 0;
    width: 100%
  }

  .column {
    width: 49%;
  }

  .column:first-child {
    margin-right: 1%;
  }

</style>
