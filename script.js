// Schools Component
Vue.component("schools", {
  data() {
    return {
      output: {}
    };
  },
  mounted() {
    /* 
Pulling the processed CSV from Github and parsing the CSV.
Papa Parse: https://www.papaparse.com/
*/
    $.ajax({
      url:
        "https://raw.githubusercontent.com/sazeka/sazeka.github.io/main/processed_data.csv",
      success: csv => {
        this.output = Papa.parse(csv, {
          header: true // Convert rows to Objects using headers as properties
        });

        if (this.output.data) {
          console.log("Loaded");
        } else {
          console.log(this.output.errors);
        }
      },
      error: function (jqXHR, textStatus, errorThrow) {
        console.log(textStatus);
      }
    });
  },
  methods: {
    test() {
      console.log(this.output.data[1].DBN);
    }
  },

  // Template to show on screen
  template: `<div>
      <v-btn @click="test">Test</v-btn>
    </div>`
});

// Core App
new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data() {
    return {
    };
  }
});