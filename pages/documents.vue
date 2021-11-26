<template>
  <section>
    <div class="actions">
      <b-button class="print-button" type="is-primary" @click="back">Patientenakten sind gedruckt</b-button>
    </div>
    <div class="page" v-for="patient in patients" :key="patient.id">
      <header class="page-header">
        <h4 class="test-id"><strong class="test-headline">Testnummer:</strong> {{ patient.id }}</h4>
        <h1 class="page-headline">
          Corona-Testcenter<br />DERMAMEDICA
        </h1>
        <div class="certificate-id">
          <header class="header">
            <h4>ZertifikatId</h4>
            <div>{{ patient.certificateID }}</div>
          </header>
          <vue-qrcode v-if="patient.certificateID !==''" :value="patient.certificateID.toString()" :options="{ width: size_small }" class="qrcode-small"></vue-qrcode>
          <div v-else class="certificate-id-placeholder"></div>
        </div>
      </header>
      <div class="row">
        <div class="col">
          <header class="header">
            <h4>Vorname:</h4>
            <div>{{ patient.first_name }}</div>
          </header>
          <vue-qrcode :value="patient.first_name" :options="{ width: size }" class="qrcode"></vue-qrcode>
        </div>

        <div class="col">
          <header class="header">
            <h4>Nachname</h4>
            <div>{{ patient.last_name }}</div>
          </header>
          <vue-qrcode :value="patient.last_name" :options="{ width: size }" class="qrcode"></vue-qrcode>
        </div>

        <div class="col">
          <header class="header">
            <h4>Geburtsdatum</h4>
            <div> {{ patient.date }}</div>
          </header>
          <vue-qrcode :value="patient.date" :options="{ width: size }" class="qrcode"></vue-qrcode>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <header class="header">
            <h4>Strasse</h4>
            <div>{{ patient.street }}</div>
          </header>
          <vue-qrcode :value="patient.street" :options="{ width: size }" class="qrcode"></vue-qrcode>
        </div>

        <div class="col">
          <header class="header">
            <h4>PLZ</h4>
            <div>{{ patient.zip }}</div>
          </header>
          <vue-qrcode :value="patient.zip" :options="{ width: size }" class="qrcode"></vue-qrcode>
        </div>
        <div class="col">
          <header class="header">
            <h4>Wohnort</h4>
            <div>{{ patient.city }}</div>
          </header>
          <vue-qrcode :value="patient.city" :options="{ width: size }" class="qrcode"></vue-qrcode>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <header class="header">
            <h4>Email</h4>
            <div>{{ patient.email }}</div>
          </header>
          <vue-qrcode :value="patient.email" :options="{ width: size }" class="qrcode"></vue-qrcode>
        </div>

        <div class="col">
          <header class="header">
            <h4>Telefonnummer</h4>
            <div>{{ patient.phone }}</div>
          </header>
          <vue-qrcode :value="patient.phone" :options="{ width: size }" class="qrcode"></vue-qrcode>
        </div>

        <div class="col">
          <header class="header">
            <h4>Passnummer oder ID-Nummer</h4>
            <div>{{ patient.id_number }}</div>
          </header>
          <vue-qrcode :value="patient.id_number" :options="{ width: size }" class="qrcode"></vue-qrcode>
        </div>
      </div>

      <div class="row signature-row">
        <div class="col signature-col">
          <div class="signature_text">Einverständnis</div> <div class="placeholder_line"></div>
        </div>

        <div class="col testtime-col">
          <div class="testtime_text">Testzeit</div> <div class="placeholder_line"></div>
        </div>
      </div>
      <footer class="page-footer">
        <div class="test-result">
          <h2>Testergebnis</h2>
          <div class="test-result__field">
            <div class="test-result__field-positive">
              <div class="checkbox-big"></div> Positiv
            </div>
            <div class="test-result__field-negative">
              <div class="checkbox-big"></div> Negativ
            </div>
          </div>
        </div>
        <div class="additional-data">
          <div class="app">Zertifikat per App: {{ patient.app ? 'Ja' : 'Nein' }}</div>
          <div class="additional-questions">
            <b-checkbox>2 Franken bezahlt</b-checkbox>
            <b-checkbox>10 Franken bezahlt</b-checkbox>
            <b-checkbox>Zertiﬁkat an App geschickt</b-checkbox>
            <b-checkbox>Zertiﬁkat an Email geschickt</b-checkbox>
          </div>
        </div>
      </footer>

      <vue-qrcode :value="'&#9;'" :options="{ width: 80 }" class="qrcode qr-tab"></vue-qrcode>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  import VueQrcode from '@chenfengyuan/vue-qrcode';

  export default {
    name: "documents",
    components: {
      // 'vue-qrcode': VueQRCodeComponent,
      VueQrcode,

    },
    created() {
      const username = this.$cookies.get('userName')

      if (!username) {
        this.$router.push('/')
      } else {
        this.retrieveAvailablePatients();
      }
    },
    data() {
      return {
        patients: [],
        size: 140,
        size_small: 100,
      }
    },
    methods: {
      retrieveAvailablePatients: function() {
        let patients = this.$store.state.patients.patients;

        if (patients.length === 0) {
          this.$router.push('/patients');
        }

        this.patients = patients;
      },
      async back() {
        await axios.delete('http://161.35.215.83/api/patients')
        this.$router.push('/patients')
      }
    },
  }
</script>

<style>
  @media only print {
    .navbar {
      display: none !important;
      visibility: hidden !important;
      height: 0px !important;
    }
  }
</style>

<style scoped>
  .actions {
    display: flex;
    flex-direction: row-reverse;
    margin: 32px 0 32px 0;
  }

  .page {
    position: relative;
    margin-bottom: 128px;
  }

  .page-header {
    border: 1px solid #0d64c6;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    height: 185px;
    padding: 16px;
    position: relative;
    margin-bottom: 64px;
  }

  .test-id {
    display: flex;
    flex-direction: row;
    left: 18px;
    position: absolute;
  }

  .page-headline {
    font-size: 32px;
    font-weight: bolder;
    text-align: left;
    margin-top: 30px;
    margin-bottom: 128px;
    width: 90%
  }

  .certificate-id-placeholder {
    border: 1px solid #7a7a7a;
    border-radius: 5px;
    height: 100px;
  }

  .certificate-id {
    border-left: 1px solid #0d64c6;
    height: 150px;
    padding-left: 28px;
    top: 16px;
    width: 150px;
  }

  .row {
    display: flex;
    flex-direction: row;
    height: 170px;
    padding: 0 0 0 50px;
  }

  .row + .row {
    margin-top: 24px;
  }

  .col {
    height: 100%;
    width: 33%;
  }

  .qrcode {
    margin-left: -16px;
  }

  .qrcode-small {
    margin-left: -12px;
  }

  .qr-tab {
    position: absolute;
    bottom: 0;
    right: -82px;
  }

  .qrcode,
  .qrcode-small {
    background: none;
    margin-top: -12px;
  }

  .signature-row {
    height: 40px;
    margin-top: 40px;
  }

  .signature-col,
  .testtime-col {
    display: flex;
    flex-direction: row;
    height: 40px;
  }

  .signature-col {
    margin-right: 10% !important;
    width: 60%;
  }

  .testtime-col {
    width: 30%
  }

  .signature_text {
    border: none;
    width: 25%;
  }

  .testtime_text {
    border: none;
    width: 30%;
  }

  .placeholder_line {
    border-bottom: 1px solid #7a7a7a;
    height: 100%;
    width: 90%;
  }

  .col:first-child {
    margin-right: 20px;
  }

  .header {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }

  .header > h4 {
    color: #7a7a7a;
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 0;
  }

  .test-headline {
    margin-right: 8px;
  }

  .page-footer {
    background-color: #f7f7f7;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    margin-top: 64px;
    padding: 12px 32px;
  }

  .test-result {
    width: 50%;
  }

  .test-result__field {
    display: flex;
    flex-direction: column;
    margin-top: 12px;
  }

  .test-result__field-positive {
    margin: 16px 0;
  }

  .test-result__field-positive,
  .test-result__field-negative {
    display: flex;
    flex-direction: row;
  }

  .checkbox-big {
    border: 2px solid #7a7a7a;
    border-radius: 4px;
    height: 40px !important;
    margin-right: 16px;
    position: relative;
    top: -8px;
    width: 40px !important;
  }

  .additional-questions {
    display: flex;
    flex-direction: column;
    margin-top: 12px;
  }

  .additional-questions > * {
    margin-bottom: 12px;
  }

  @media only print {
    * {
      background: none !important;
      color-adjust: exact;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .actions {
      display: none !important;
      visibility: hidden !important;
    }

    .page {
      height: 100vh !important;
      width: 85vw !important;
      padding: 0 !important;
      page-break-after: always !important;
      margin-bottom: 0;
    }

    .page-header {
      height: 160px;
      margin-right: -30px;
      margin-bottom: 24px;
    }

    .page-headline {
      margin-top: 32px;
    }

    .certificate-id {
      border: none;
      padding-left: 20px;
      top: 16px;
      width: 16%;
    }

    .signature-col {
      width: 50%;
    }

    .signature_text {
      width: 45% !important;
    }

    .testtime-text {
      width: 50% !important;;
    }

    .page-footer {
      background-color: #f7f7f7 !important;
      border-radius: 10px !important;
      display: flex;
      flex-direction: row;
      margin-top: 24px;
      padding: 12px 32px;
    }

    .row {
      padding: 0 0 0 30px;
    }

    @-moz-document url-prefix() {
      .page-header {
        padding-top: 10px !important;
        height: 150px !important;
        margin-right: -30px;
        margin-bottom: 24px;
      }

      .row + .row {
        margin-top: 8px !important;
      }

      .signature-row {
        margin-top: -30px !important;
        margin-bottom: -10px !important;
      }
    }
  }
</style>
