function myFunction() {
/* 
Pulling the processed CSV from Github and parsing the CSV.
Papa Parse: https://www.papaparse.com/
*/
$.ajax({
  url:
    "https://raw.githubusercontent.com/tsdataclinic/NYC_SchoolData/main/data/processed/processed_data.csv",
  success: function (csv) {
    const output = Papa.parse(csv, {
      header: true // Convert rows to Objects using headers as properties
    });
    if (output.data) {
      console.log(output.data);
    } else {
      console.log(output.errors);
    }
  },
  error: function (jqXHR, textStatus, errorThrow) {
    console.log(textStatus);
  }
});
}