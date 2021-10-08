// Schools Component
Vue.component("schools", {
  data() {
    return {
      output: {},

      // Year Selected
      selectyear: 0,

      // Option of Years
      years: [2019, 2018, 2017, 2016, 2015],

      // Headers for Table
      headers: [
        {
          text: "School Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "DBN", value: "dbn" },
        { text: "Type", value: "schoolType" },
        { text: "Enrollment", value: "totalEnrollment" },
        { text: "Female (%)", value: "female" },
        { text: "Male (%)", value: "male" },
        { text: "Black (%)", value: "black" },
        { text: "Hispanic (%)", value: "hispanic" }
      ],

      // Array for output
      schools: []
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
      success: (csv) => {
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
    load() {
      console.log(this.output.data);
      console.log(this.selectyear);
      for (let i = 1; i < this.output.data.length; i++) {
        if (
          this.selectyear == 0 &&
          this.output.data[i].year == "2019" &&
          this.output.data[i].subject == "math"
        ) {
          this.arrayPush(i);
        } else if (
          this.selectyear == 1 &&
          this.output.data[i].year == "2018" &&
          this.output.data[i].subject == "math"
        ) {
          this.arrayPush(i);
        } else if (
          this.selectyear == 2 &&
          this.output.data[i].year == "2017" &&
          this.output.data[i].subject == "math"
        ) {
          this.arrayPush(i);
        } else if (
          this.selectyear == 3 &&
          this.output.data[i].year == "2016" &&
          this.output.data[i].subject == "math"
        ) {
          this.arrayPush(i);
        } else if (
          this.selectyear == 4 &&
          this.output.data[i].year == "2015" &&
          this.output.data[i].subject == "math"
        ) {
          this.arrayPush(i);
        }
      }
    },
    arrayPush(i) {
      this.schools.push({
        name: this.output.data[i].school_name,
        dbn: this.output.data[i].DBN,
        schoolType: this.output.data[i].school_type,
        totalEnrollment: this.output.data[i].total_enrollment,
        female: this.output.data[i].female_per,
        male: this.output.data[i].male_per,
        black: this.output.data[i].black_per,
        hispanic: this.output.data[i].hispanic_per
      });
    },
    clear() {
      this.schools = [];
    }
  },

  // Template to show on screen
  template: `<div>
      <v-slider
          v-model="selectyear"
          :tick-labels="years"
          :max="4"
          step="1"
          ticks="always"
          tick-size="5"
        ></v-slider>
      <v-btn @click="load">Load</v-btn>
      <v-btn @click="clear">Clear</v-btn>
      <v-data-table
        :headers="headers"
        :items="schools"
        hide-default-footer
        disable-pagination
    ></v-data-table>
    </div>`
});

// Core App
new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data() {
    return {};
  }
});