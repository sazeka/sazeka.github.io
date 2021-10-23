// Graph


// Schools Component
Vue.component("schools", {
  data() {
    return {
      output: {},

      // Year Selected
      selectyear: 0,

      // Option of Years
      years: [2019, 2018, 2017, 2016, 2015],

      // Slider Values
      ex1: { label: "Poverty (%)", val: 75, color: "red" },
      ex2: { label: "Hispanic / African American (%)", val: 60, color: "red" },

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
        { text: "Hispanic (%)", value: "hispanic" },
        { text: "Poverty (%)", value: "poverty" }
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
          console.log("loaded");
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
      //console.log(this.output.data);

      for (let i = 1; i < this.output.data.length; i++) {
        // 2019 condition
        if (
          this.selectyear == 0 &&
          this.output.data[i].year == "2019" &&
          this.output.data[i].subject == "math" &&
          this.output.data[i].poverty_per >= this.ex1.val &&
          (parseFloat(this.output.data[i].black_per) + parseFloat(this.output.data[i].hispanic_per)) >= this.ex2.val
        ) {
          this.arrayPush(i);
        } else if (
          this.selectyear == 1 &&
          this.output.data[i].year == "2018" &&
          this.output.data[i].subject == "math" &&
          this.output.data[i].poverty_per >= this.ex1.val &&
          (parseFloat(this.output.data[i].black_per) + parseFloat(this.output.data[i].hispanic_per)) >= this.ex2.val
        ) {
          this.arrayPush(i);
        } else if (
          this.selectyear == 2 &&
          this.output.data[i].year == "2017" &&
          this.output.data[i].subject == "math" &&
          this.output.data[i].poverty_per >= this.ex1.val &&
          (parseFloat(this.output.data[i].black_per) + parseFloat(this.output.data[i].hispanic_per)) >= this.ex2.val
        ) {
          this.arrayPush(i);
        } else if (
          this.selectyear == 3 &&
          this.output.data[i].year == "2016" &&
          this.output.data[i].subject == "math" &&
          this.output.data[i].poverty_per >= this.ex1.val &&
          (parseFloat(this.output.data[i].black_per) + parseFloat(this.output.data[i].hispanic_per)) >= this.ex2.val
        ) {
          this.arrayPush(i);
        } else if (
          this.selectyear == 4 &&
          this.output.data[i].year == "2015" &&
          this.output.data[i].subject == "math" &&
          this.output.data[i].poverty_per >= this.ex1.val &&
          (parseFloat(this.output.data[i].black_per) + parseFloat(this.output.data[i].hispanic_per)) >= this.ex2.val
        ) {
          this.arrayPush(i);
        }
      }
    },

    // Pushes the qualified schools into the array
    arrayPush(i) {
      this.schools.push({
        name: this.output.data[i].school_name,
        dbn: this.output.data[i].DBN,
        schoolType: this.output.data[i].school_type,
        totalEnrollment: this.output.data[i].total_enrollment,
        female: this.output.data[i].female_per,
        male: this.output.data[i].male_per,
        black: this.output.data[i].black_per,
        hispanic: this.output.data[i].hispanic_per,
        poverty: this.output.data[i].poverty_per
      });
    },
    clear() {
      this.schools = [];
    }
  },

  // Template to show on screen
  template: `<div>
      <row>
        <v-col cols="12" sm="6">
          <v-card elevation="2">
            <v-card-title>Setting</v-card-title>
            <v-card-subtitle>Select the criteria for filtering schools.</v-card-subtitle>
            <v-slider
                v-model="selectyear"
                :tick-labels="years"
                :max="4"
                step="1"
                ticks="always"
                tick-size="5"
                class="mx-4"
            ></v-slider>
            <v-slider
                v-model="ex1.val"
                :label="ex1.label"
                :thumb-color="ex1.color"
                thumb-label="always"
                class="mx-4"
            ></v-slider>
            <v-slider
                v-model="ex2.val"
                :label="ex2.label"
                :thumb-color="ex1.color"
                thumb-label="always"
                class="mx-4"
            ></v-slider>
          </v-card>
        </v-col>
      </row>
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