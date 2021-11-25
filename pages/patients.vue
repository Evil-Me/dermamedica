<template>
  <section class="patients">

    <div class="actions">
      <b-button class="print-button" type="is-primary" @click="addAllPatientsToState">Patientenakten drucken</b-button>
    </div>

    <b-table
      :data="isEmpty ? [] : patients"
      :bordered="isBordered"
      :striped="isStriped"
      :narrowed="isNarrowed"
      :hoverable="isHoverable"
      :loading="isLoading"
      :focusable="isFocusable"
      :mobile-cards="hasMobileCards">

      <b-table-column field="id" label="#" v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <b-table-column field="first_name" label="Vorname" v-slot="props">
        {{ props.row.first_name }}
      </b-table-column>

      <b-table-column field="last_name" label="Nachname" v-slot="props">
        {{ props.row.last_name }}
      </b-table-column>

      <b-table-column field="date" label="Geburtstag" v-slot="props">
        {{ new Date(props.row.date).toLocaleDateString() }}
      </b-table-column>

      <b-table-column field="email" label="Email" v-slot="props">
        {{ props.row.email }}
      </b-table-column>

      <b-table-column field="id_number" label="ID-Nummer" v-slot="props">
        {{ props.row.id_number }}
      </b-table-column>

      <b-table-column field="phone" label="Telefon" v-slot="props">
        {{ props.row.phone }}
      </b-table-column>

      <b-table-column field="app" label="Zertifikat per App" v-slot="props">
        {{ props.row.app ? 'Ja' : 'Nein' }}
      </b-table-column>

      <b-table-column field="wish" label="Zertifikatswunsch" v-slot="props">
        {{ props.row.wish ? 'Privat' : 'Gesetzlich' }}
      </b-table-column>

      <template #empty>
        <div class="has-text-centered">No records</div>
      </template>

    </b-table>
  </section>
</template>

<style>
  .patients {
    position: relative;
    margin-top: 32px;
  }

  .actions {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 32px;
  }
</style>

<script>
  import axios from 'axios'

  export default {
    created() {
      const username = this.$cookies.get('userName')

      if (!username) {
        this.$router.push('/login')
      } else {
        this.fetchPatients()
      }
    },

    data()  {
      let patients = []

      return {
        patients,
        isEmpty: false,
        isBordered: false,
        isStriped: false,
        isNarrowed: false,
        isHoverable: true,
        isFocusable: false,
        isLoading: false,
        hasMobileCards: true
      }
    },

    methods: {
      fetchPatients: async function() {
        await axios.get('http://161.35.215.83/api/patients').then(function (response) {
          this.patients = response.data
        }.bind(this))
      },

      addAllPatientsToState: function() {
        this.$store.commit('patients/addAllPatients', this.patients);
        this.$router.push('documents');
        this.patients = [];
      }
    }
  }
</script>
