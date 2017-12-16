"use strict";

app.filter("DateFilter", () => {
  return (dateString) => {
    return moment(dateString).format("MM/DD/YYYY");    
  };

});