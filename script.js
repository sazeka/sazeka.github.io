// Schools Component
Vue.component("schools", {
  data() {
    return {
      //Test
      mathDataPie: [
        {
          values: [],
          labels: ["Level 1", "Level 2", "Level 3", "Level 4"],
          type: "pie"
        }
      ],
      layout: {
        height: 400,
        width: 500
      },

      output: {},

      // Popup Values
      mathLevel1: 0,
      mathLevel2: 0,
      mathLevel3: 0,
      mathLevel4: 0,
      mathLevel34: 0,
      elaLevel1: 0,
      elaLevel2: 0,
      elaLevel3: 0,
      elaLevel4: 0,
      elaLevel34: 0,
      schoolName: "",

      dialog: false,

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
        { text: "Poverty (%)", value: "poverty" },
        { text: "ELA (%)", value: "elaLevel34" },
        { text: "Math (%)", value: "mathLevel34" }
      ],

      // Array for output
      schools: []
    };
  },
  
  // Print the piechart using Plotly
  mounted() {
    Plotly.newPlot(this.$refs.plot1, this.mathDataPie, this.layout);

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
    
    // Gives the ELA scores a color
    getColorELA (elaLevel34) {
      if (elaLevel34 < 45.4) return 'red'
      else if (elaLevel34 < 70) return 'orange'
      else return 'green'
    },
    // Gives the Math scores a color
    getColorMath (mathLevel34) {
      if (mathLevel34 < 46.7) return 'red'
      else if (mathLevel34 < 70) return 'orange'
      else return 'green'
    },
    
    load() {
      //console.log(this.output.data);

      for (let i = 1; i < this.output.data.length; i++) {
        // 2019 conditional push
        if (
          this.selectyear == 0 &&
          this.output.data[i].year == "2019" &&
          /*this.output.data[i].subject == "math &&*/
          this.output.data[i].poverty_per >= this.ex1.val &&
          parseFloat(this.output.data[i].black_per) +
            parseFloat(this.output.data[i].hispanic_per) >=
            this.ex2.val
        ) {
          this.arrayPush(i);
        }
        // 2018 conditional push
        else if (
          this.selectyear == 1 &&
          this.output.data[i].year == "2018" &&
          this.output.data[i].subject == "math" &&
          this.output.data[i].poverty_per >= this.ex1.val &&
          parseFloat(this.output.data[i].black_per) +
            parseFloat(this.output.data[i].hispanic_per) >=
            this.ex2.val
        ) {
          this.arrayPush(i);
        }
        // 2017 conditional push
        else if (
          this.selectyear == 2 &&
          this.output.data[i].year == "2017" &&
          this.output.data[i].subject == "math" &&
          this.output.data[i].poverty_per >= this.ex1.val &&
          parseFloat(this.output.data[i].black_per) +
            parseFloat(this.output.data[i].hispanic_per) >=
            this.ex2.val
        ) {
          this.arrayPush(i);
        }
        // 2016 conditional push
        else if (
          this.selectyear == 3 &&
          this.output.data[i].year == "2016" &&
          this.output.data[i].subject == "math" &&
          this.output.data[i].poverty_per >= this.ex1.val &&
          parseFloat(this.output.data[i].black_per) +
            parseFloat(this.output.data[i].hispanic_per) >=
            this.ex2.val
        ) {
          this.arrayPush(i);
        }
        // 2015 conditional push
        else if (
          this.selectyear == 4 &&
          this.output.data[i].year == "2015" &&
          this.output.data[i].subject == "math" &&
          this.output.data[i].poverty_per >= this.ex1.val &&
          parseFloat(this.output.data[i].black_per) +
            parseFloat(this.output.data[i].hispanic_per) >=
            this.ex2.val
        ) {
          this.arrayPush(i);
        }
      }
    },

    // Pushes the qualified schools into the array
    arrayPush(i) {
      //console.log(this.output.data[i]);
      if (this.output.data[i].subject == "math") {
        this.schools.push({
          name: this.output.data[i].school_name,
          dbn: this.output.data[i].DBN,
          schoolType: this.output.data[i].school_type,
          totalEnrollment: parseInt(this.output.data[i].total_enrollment),
          female: parseInt(this.output.data[i].female_per),
          male: parseInt(this.output.data[i].male_per),
          black: parseInt(this.output.data[i].black_per),
          hispanic: parseInt(this.output.data[i].hispanic_per),
          poverty: parseInt(this.output.data[i].poverty_per),
          mathLevel1: this.output.data[i]["Pct Level 1"],
          mathLevel2: this.output.data[i]["Pct Level 2"],
          mathLevel3: this.output.data[i]["Pct Level 3"],
          mathLevel4: this.output.data[i]["Pct Level 4"],
          elaLevel1: 0,
          elaLevel2: 0,
          elaLevel3: 0,
          elaLevel4: 0,
          mathLevel34:
            parseInt(this.output.data[i]["Pct Level 3"]) +
            parseInt(this.output.data[i]["Pct Level 4"])
        });
      } else if (
        this.output.data[i].subject == "ela" &&
        this.output.data[i].dbn == this.output.data[i - 1].dbn
      ) {
        this.schools[this.schools.length - 1].elaLevel1 = this.output.data[i][
          "Pct Level 1"
        ];
        this.schools[this.schools.length - 1].elaLevel2 = this.output.data[i][
          "Pct Level 2"
        ];
        this.schools[this.schools.length - 1].elaLevel3 = this.output.data[i][
          "Pct Level 3"
        ];
        this.schools[this.schools.length - 1].elaLevel4 = this.output.data[i][
          "Pct Level 4"
        ];
        this.schools[this.schools.length - 1].elaLevel34 = parseInt(
          this.output.data[i]["Pct Level 3"] +
            this.output.data[i]["Pct Level 4"]
        );
      }
    },
    clear() {
      this.schools = [];
    },
    handleClick(value) {
      this.dialog = true;
      console.log("clicked");
      this.mathLevel1 = Math.round(value.mathLevel1);
      this.mathLevel2 = Math.round(value.mathLevel2);
      this.mathLevel3 = Math.round(value.mathLevel3);
      this.mathLevel4 = Math.round(value.mathLevel4);
      this.elaLevel1 = Math.round(value.elaLevel1);
      this.elaLevel2 = Math.round(value.elaLevel2);
      this.elaLevel3 = Math.round(value.elaLevel3);
      this.elaLevel4 = Math.round(value.elaLevel4);
      this.name = value.name;
    }
  },
  updated() {
    this.mathDataPie[0].values = [];

    this.mathDataPie[0].values.push(
      this.mathLevel1,
      this.mathLevel2,
      this.mathLevel3,
      this.mathLevel4
    );

    console.log(this.mathDataPie[0].values);
    Plotly.redraw(this.$refs.plot1);
  },

  // Template to show on screen
  template: `<div>
      <br>
      <v-layout row wrap>
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
        <v-col cols="12" sm="6">
          <v-card elevation="2">
            <v-card-title>School Info</v-card-title>
            <div ref="plot1"></div>
          </v-card>
        </v-col>
      </v-layout>
      <v-btn @click="load">Load</v-btn>
      <v-btn @click="clear">Clear</v-btn>
      
      <v-dialog
        v-model="this.dialog"
        width="500"
      >
          <v-card>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false">
              Close
            </v-btn>
          </v-card-actions>
          </v-card>
        </v-dialog>
      
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="schools"
        @click:row="handleClick"
        hide-default-footer
        disable-pagination>
        <template v-slot:item.elaLevel34="{ item }">
        <v-chip
          :color="getColorELA(item.elaLevel34)"
          dark
        >
          {{ item.elaLevel34 }}
        </v-chip>
      </template>
      <template v-slot:item.mathLevel34="{ item }">
        <v-chip
          :color="getColorMath(item.mathLevel34)"
          dark
        >
          {{ item.mathLevel34 }}
        </v-chip>
      </template>
    </v-data-table>
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