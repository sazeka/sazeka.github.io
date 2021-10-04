function myFunction() {
/* 
Pulling the processed CSV from Github and parsing the CSV.
Papa Parse: https://www.papaparse.com/
*/
$.ajax({
  url:
    "https://raw.githubusercontent.com/tsdataclinic/NYC_SchoolData/39a155ccc50a24509c69d35ae4cad3428ff0f44d/data/processed/processed_data.csv?token=AIU7HQEDVKMSBYO4IVHUKMLBLJVRY",
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