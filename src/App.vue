<template>
  <div id="app">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <section>
      <div class="hero-body">
        <div class="container">
          <span class="tab">
            <router-link to="/builds" id="builds-tab">Builds</router-link>
          </span>
          <span class="tab">
            <router-link to="/insights" id="insights-tab">Insights</router-link>
          </span>
          <h1 class="title" id="header-logo">
            <img id="header-icon" src="./assets/img/fp-icon-xl.svg">
            <span id="header-text"><b>Ford</b>Pass <b>Builds</b></span>
          </h1>
        </div>
      </div>
    </section>
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    title: 'FordPass Builds'
  },
  data: function () {
    return {
      search: null
    }
  }
}
</script>

<style lang="scss">
@import '~styles/main.scss';

  path {
    fill: white;
  }

  path + path {
    fill: none;
  }

  body {
    font-family: $family-sans-serif;
  }

  .tab a {
    font-family: $family-sans-serif;
    font-size: 1rem;
    padding-right: 1.7rem;
  }

  #header-text {
    font-family: 'Ford Antenna Regular', sans-serif;
    color: $primary-invert;
  }

  #header-icon {
    margin-bottom: 5px;
  }

  #header-logo {
    margin-top: 25px;
    margin-bottom: 0px;
  }

  .container {
    margin-left: 70px;
  }

  .hero-body {
    padding-top: 25px !important;
    padding-bottom: 25px !important;
  }

  .md-app {
    min-height: 100vh
  }

  .md-field {
    font-family: $family-sans-serif;
    width: 20vw;
    margin-bottom: 0px;
  }

</style>
