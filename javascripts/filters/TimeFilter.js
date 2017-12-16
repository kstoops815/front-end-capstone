"use strict";

app.filter("TimeFilter", () => {
  return (dateString) => {
    return moment(dateString).format("hh:mm A");    
  };

});