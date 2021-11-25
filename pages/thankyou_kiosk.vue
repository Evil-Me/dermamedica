<template>
  <section class="section">
    <b-icon
      class="checkmark"
      icon="check-decagram"
      size="is-large"
    />
    <h1 class="title is-3 has-text-grey">Vielen Dank</h1>
    <h2 class="title is-5 has-text-grey">
      Ihre Daten wurden erfolgreich übermittelt.
    </h2>
  </section>
</template>

<script>
  export default {
    name: 'thankyou_kiosk',
    created() {
      setTimeout(function () {
        this.$router.push('/formular')
      }.bind(this), 10000)
    }
  }
</script>

<style scoped>
  .section {
    text-align: center;
  }

  .checkmark {
    color: #3abb81;
    margin-bottom: 24px;
  }

  .is-3 {
    margin-bottom: 12px;
  }

  .is-5 {
    margin-bottom: 24px;
  }

  .make-appointment {
    margin-bottom: 12px;
  }
</style>
