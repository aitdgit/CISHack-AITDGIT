const mongoose = require("mongoose");

var MedrecordSchema = new mongoose.Schema({
  height: [Object],
  weight: [Object],
  age: Number,
  bmi: [Object],
  dpf: [Object],
  insulin: [Object],

  /* Diabetes ai stuff */
  numPreg: [Object],
  glucoseConc: [Object],
  diastolicBp: [Object],
  insulin: [Object],
  dfs: [Object],

  /*Heart ai stuff*/
  cholestrol:[Object],
  systolicPressure: [Object],
  diastolicPressure:[Object],
  heartRate:[Object],

});

module.exports = mongoose.model("Medrecord", MedrecordSchema);

/*

Diabetes prediction

https://predict-x-diabetes-pred-api.herokuapp.com/6/150/72/20/90/30.0/0.66/55

/<int:num_preg>/<int:glucose_conc>/<int:diastolic_bp>/<int:thickness>/<int:insulin>/<float:bmi>/<float:dpf>/<int:age>

Heart attack prediction

https://heart-attack-prediction-api.herokuapp.com/20/200/123/211/10/300/200

/<int:age>/<int:cholestrol>/<int:systolic_pressure>/<int:diastolic_pressure>/<int:bmi>/<int:heart_rate>/<int:glucose>

*/