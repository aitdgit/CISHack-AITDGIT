import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Loading from "./Loading";
import MedicalRecords from "./medicalRecord";
import { MyResponsiveBar, MyResponsiveLine } from "./Graph";
import { Link, Redirect } from "react-router-dom";

// CSS
import "../css/Doctordashboard.css";

// Images
import logo from "../assets/logo.svg";
import logoutimg from "../assets/p_dashbord-panel.svg";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import doctor from "../assets/doctor.svg";
import CakeIcon from "@material-ui/icons/Cake";
import HeightIcon from "../assets/height.svg";
import WeightIcon from "../assets/weight.svg";
import BmiIcon from "../assets/bmi.svg";
import sidebarButton from "../assets/sidebar-button.svg";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CancelIcon from "@material-ui/icons/Cancel";
import hearVector from "../assets/heart.svg";
import diabetesVector from "../assets/diabetes.svg";
import MenuIcon from "@material-ui/icons/Menu";

const organiseData = (data) => {
  var resultantData = [];

  data.map((item) => {
    resultantData.push({ x: item.value, y: item.date });
  });

  return [{ id: "Weight", color: "hsl(194, 70%, 50%)", data: resultantData }];
};

class DoctorDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.setActivePatient = this.setActivePatient.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
    this.toogleAddPatientForm = this.toogleAddPatientForm.bind(this);
    this.closeAddPatientForm = this.closeAddPatientForm.bind(this);
    this.onSubmitPatientForm = this.onSubmitPatientForm.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onLogout = this.onLogout.bind(this);

    this.state = {
      UserData: {},
      Email: "",
      redirect: null,
      patients: [],
      medicalData: "loading",
      dosageData: {},
      loading: false,
      SelectedPatientId: null,
      SidebarOn: true,
      ActiveUserData: "loading",
      chartsLoading: true,
      ActiveUserName: undefined,
      EmailNotExist: false,
      PatientSubbed: false,
      RequestSent: false,

      /** Charts Data **/
      bmiChartData: undefined,
      glucoseCharData: undefined,

      /** AI Data **/
      heartAttackResult: undefined,
      diabetesResult: undefined,
    };
  }
  componentDidMount() {
    var UserData = JSON.parse(localStorage.getItem("UserData"));
    this.setState({ UserData: UserData });
    const token = cookie.get("jwt-token");

    // axios
    //   .get("https://predictx-backend.herokuapp.com/doctor/check-doctor", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => {
    //     if (res.success === false) {
    //       window.location = "/error-page";
    //     }
    //   })
    //   .catch((err) => {
    //     window.location = "/error-page";
    //     console.log(err);
    //   });

    this.setState({ loading: true });
    this.setState({ chartsLoading: true });

    axios
      .get(`https://predictx-backend.herokuapp.com/doctor/mypatients`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success === true) {
          this.setState({ loading: false });
          this.setState({ patients: res.data.data }, () => {
            // this.setState({ActiveUserData: this.state.patients[0]})

            if (this.state.patients.length !== 0) {
              this.setState({ ActiveUserName: this.state.patients[0].name });

              axios
                .get(
                  `https://predictx-backend.herokuapp.com/patient/medrecord/${this.state.patients[0].medrecord_id}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
                .then((res) => {
                  if (res.data.success === true) {
                    this.setState({ loading: false });
                    this.setState({ ActiveUserData: res.data.data }, () => {
                      const numPreg = this.state.ActiveUserData.numPreg;
                      console.log(numPreg);
                      const glucoseConc = this.state.ActiveUserData.glucoseConc;
                      console.log(glucoseConc);
                      const diastolicBp = this.state.ActiveUserData.diastolicBp;
                      console.log(glucoseConc);
                      const insulin = this.state.ActiveUserData.insulin;
                      console.log(glucoseConc);
                      const bmi = this.state.ActiveUserData.bmi;
                      console.log(glucoseConc);
                      const dpf = this.state.ActiveUserData.dpf;
                      console.log(glucoseConc);
                      /** Load the AI Data **/
                      axios
                        .get(
                          "https://predict-x-diabetes-pred-api.herokuapp.com/6/150/72/20/90/30.0/0.66/55"
                        )
                        .then((res) => {
                          console.log(res.data["prediction_result"]);
                          this.setState({ diabetesResult: res.data });
                        })
                        .catch((err) => console.log(JSON.stringify(err)));

                      axios
                        .get(
                          "https://heart-attack-prediction-api.herokuapp.com/20/200/123/211/10/300/200"
                        )
                        .then((res) => {
                          console.log(res.data);
                          this.setState({ heartAttackResult: res.data });
                        })
                        .catch((err) => console.log(JSON.stringify(err)));
                    });
                  }
                });
            }
          });
        }
      });
  }

  setActivePatient(event) {
    console.log(event.target);
    this.setState({ ActiveUserName: event.target.innerText });
    console.log(event.target.childNodes[0].innerHTML);
    this.setState(
      { SelectedPatientId: event.target.childNodes[0].innerHTML },
      () => {
        const token = cookie.get("jwt-token");
        var Allli = document.querySelectorAll("li");
        Allli.forEach((item) => (item.style.borderRight = "none"));
        var li = document.getElementById(`${this.state.SelectedPatientId}`);
        li.style.borderRight = "5px solid #00a459";
        axios
          .get(
            `https://predictx-backend.herokuapp.com/patient/medrecord/${this.state.SelectedPatientId}`,
            {
              headers: { authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            if (res.data.success === true) {
              this.setState(
                { ActiveUserData: res.data.data, loading: false },
                () => {
                  var data = [];

                  console.log(this.state.SelectedPatientId);

                  this.state.ActiveUserData.bmi.map((item) => {
                    data.push({
                      date: item.date,
                      bmi: item.value,
                      bmiColor: "hsl(153, 100%, 32%)",
                    });
                  });

                  console.log(data);

                  this.setState({ bmiChartData: data }, () => {
                    console.log(this.state.bmiChartData);
                  });

                  /** Load the AI Data **/
                  const numPreg = this.state.ActiveUserData.numPreg;
                  console.log(numPreg);
                  const glucoseConc = this.state.ActiveUserData.glucoseConc;
                  console.log(glucoseConc);
                  const diastolicBp = this.state.ActiveUserData.diastolicBp;
                  console.log(glucoseConc);
                  const insulin = this.state.ActiveUserData.insulin;
                  console.log(glucoseConc);
                  const bmi = this.state.ActiveUserData.bmi;
                  console.log(glucoseConc);
                  const dpf = this.state.ActiveUserData.dpf;
                  console.log(glucoseConc);
                  /** Load the AI Data **/
                  axios
                    .get(
                      "https://predict-x-diabetes-pred-api.herokuapp.com/6/150/72/20/90/30.0/0.66/55"
                    )
                    .then((res) => {
                      console.log(res.data["prediction_result"]);
                      this.setState({ diabetesResult: res.data });
                    })
                    .catch((err) => console.log(JSON.stringify(err)));

                  axios
                    .get(
                      "https://heart-attack-prediction-api.herokuapp.com/20/200/123/211/10/300/200"
                    )
                    .then((res) => {
                      console.log(res.data);
                      this.setState({ heartAttackResult: res.data });
                    })
                    .catch((err) => console.log(JSON.stringify(err)));
                }
              );
            }
          })
          .catch((err) => console.log(err));
      }
    );
  }

  toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    var main = document.getElementById("main");

    sidebar.style.left = "0";
    main.style.marginLeft = "285px";
  }

  closeSidebar() {
    var sidebar = document.getElementById("sidebar");
    var main = document.getElementById("main");

    sidebar.style.left = "-1000px";
    main.style.marginLeft = "0px";
  }

  toogleAddPatientForm() {
    var form = document.getElementById("add-patient-form");
    window.scrollTo(0, 0);

    form.style.bottom = "300px";
    if (window.innerWidth < 900) {
      form.style.left = `${window.innerWidth / 2 - 200}px`;
    } else {
      form.style.left = "50px";
    }
  }

  closeAddPatientForm() {
    var form = document.getElementById("add-patient-form");

    form.style.bottom = "-500px";
    form.style.left = "-500px";
  }

  onChangeEmail(event) {
    this.setState({ Email: event.target.value });
    console.log(this.state.Email);
  }

  onSubmitPatientForm(event) {
    event.preventDefault();

    const token = cookie.get("jwt-token");
    let data = { email: this.state.Email };

    axios
      .post(
        "https://predictx-backend.herokuapp.com/doctor/addpatientnotifiaction",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.success === true) {
          this.setState({ EmailNotExist: false });
          this.setState({ RequestSent: true });
          console.log("notification sent");
        } else {
          this.setState({ EmailNotExist: true });
          this.setState({ PatientSubbed: false });
          this.setState({ RequestSent: false });
        }
      })
      .catch((err) => {
        this.setState({ EmailNotExist: false });
        this.setState({ PatientSubbed: true });
        this.setState({ RequestSent: false });
      });
  }

  onLogout() {
    cookie.remove("jwt-token");
    this.setState({ redirect: "/" });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else {
      return this.state.loading ? (
        <Loading open={this.state.loading} />
      ) : (
        <div className="doctorDashboard">
          <nav>
            <div className="sidebarButton" onClick={this.toggleSidebar}>
              <MenuIcon
                style={{ color: "black" }}
                fontSize="large"
                id="menuIcon"
              />
            </div>
          </nav>
          <main>
            <div className="doctorDashboard__sidebar" id="sidebar">
              <CancelIcon
                onClick={this.closeSidebar}
                style={{
                  color: "#00a459",
                  marginTop: "10px",
                  alignSelf: "flex-end",
                  margin: "10px",
                }}
              />
              <div className="sidebar__item1">
                <div className="logo">
                  <img src={logo} alt="logo" />
                </div>
                <div className="patients">
                  <span>My Patients</span>
                  <div className="patients_list">
                    {this.state.patients
                      ? Object.keys(this.state.patients).map((item) => {
                          return (
                            <li
                              onClick={this.setActivePatient}
                              key={this.state.patients[item]._id}
                              id={this.state.patients[item].medrecord_id}
                            >
                              <span style={{ display: "none" }}>
                                {this.state.patients[item].medrecord_id}
                              </span>
                              {this.state.patients[item].name}
                            </li>
                          );
                        })
                      : "Empty"}
                  </div>
                </div>
              </div>
              <div className="sidebar__item2">
                <div className="add_patient">
                  <PersonAddIcon />
                  <p onClick={this.toogleAddPatientForm}>Add Patient</p>
                </div>
                <div className="logout" onClick={this.onLogout}>
                  <ExitToAppIcon />
                  <p>Logout</p>
                </div>
              </div>
            </div>
            <div className="doctorDashboard__main" id="main">
              <div className="add_patient_form" id="add-patient-form">
                <CancelIcon
                  onClick={this.closeAddPatientForm}
                  style={{ color: "#00a459" }}
                />
                <p>Enter the email of the patient to add.</p>
                <form onSubmit={this.onSubmitPatientForm}>
                  <label>
                    Email*{" "}
                    {this.state.PatientSubbed ? (
                      <span style={{ color: "red" }}>
                        Email already sent or patient subscribed.
                      </span>
                    ) : this.state.EmailNotExist ? (
                      <span style={{ color: "red" }}>
                        Email does not exist!
                      </span>
                    ) : this.state.RequestSent ? (
                      <span style={{ color: "#00a459" }}>
                        Sent request to patient
                      </span>
                    ) : null}{" "}
                  </label>
                  <input
                    onChange={this.onChangeEmail}
                    type="email"
                    required
                    id="add-patient-input"
                    placeholder="abc@example.com"
                  />
                  <button type="submit" id="add-patient-button">
                    Add
                  </button>
                </form>
              </div>
              <div className="patients__name" id="patients-name">
                {this.state.ActiveUserName === undefined ? (
                  "loading"
                ) : (
                  <h3>{this.state.ActiveUserName}'s Medical Records</h3>
                )}
                <img src={doctor} alt="doctor" />
              </div>
              <div className="current_records__cards">
                <div className="card-grid">
                  <div id="age-card" className="card">
                    <div className="record">
                      <CakeIcon fontSize="large" style={{ margin: "10px" }} />{" "}
                      <h3>
                        {" "}
                        {this.state.ActiveUserData === "loading"
                          ? "loading"
                          : `${this.state.ActiveUserData.age}`}{" "}
                      </h3>
                    </div>
                    <p>Current Age</p>
                  </div>
                  <div id="height-card" className="card">
                    <div className="record">
                      <img src={HeightIcon} alt="height" />
                      <h3>
                        {" "}
                        {(
                          this.state.ActiveUserData === "loading"
                            ? "loading"
                            : this.state.ActiveUserData.height.length == 0
                        )
                          ? "Empty"
                          : `${
                              this.state.ActiveUserData.height[
                                this.state.ActiveUserData.height.length - 1
                              ].value
                            }`}{" "}
                      </h3>
                    </div>
                    <p>Current Height</p>
                  </div>
                  <div id="weight-card" className="card">
                    <div className="record">
                      <img src={WeightIcon} alt="weight" />
                      <h3>
                        {" "}
                        {this.state.ActiveUserData === "loading"
                          ? "loading"
                          : `${
                              this.state.ActiveUserData.weight[
                                this.state.ActiveUserData.weight.length - 1
                              ].value
                            }`}
                      </h3>
                    </div>
                    <p>Current Weight</p>
                  </div>
                  <div id="bmi-card" className="card">
                    <div className="record">
                      <img src={BmiIcon} alt="bmi" />
                      <h3>
                        {" "}
                        {this.state.ActiveUserData === "loading"
                          ? "loading"
                          : `${
                              this.state.ActiveUserData.bmi[
                                this.state.ActiveUserData.bmi.length - 1
                              ].value
                            }`}
                      </h3>
                    </div>
                    <p>Current BMI</p>
                  </div>
                </div>
              </div>
              <div className="middle-item3">
                <div className="graphs">
                  <div className="graph">
                    {this.state.ActiveUserData === "loading" ? (
                      // <Loading open={true}/>
                      <h4>Empty</h4>
                    ) : (
                      // <MyResponsiveLine data={this.state.bmiChartData} />
                      <MyResponsiveBar
                        data={{
                          records: this.state.ActiveUserData,
                          type: "glucose_conc",
                        }}
                      />
                    )}
                  </div>
                  <div className="graph">
                    {this.state.ActiveUserData === "loading" ? (
                      <h4>Empty</h4>
                    ) : (
                      // <Loading open={true}/>
                      // <MyResponsiveLine data={this.state.bmiChartData} />
                      <MyResponsiveLine
                        data={{
                          records: this.state.ActiveUserData,
                          type: "bmi",
                        }}
                      />
                    )}
                  </div>
                  <div className="graph" id="graph3">
                    {this.state.ActiveUserData === "loading" ? (
                      <h4>Empty</h4>
                    ) : (
                      // <Loading open={true}/>
                      // <MyResponsiveLine data={this.state.bmiChartData} />
                      <MyResponsiveLine
                        data={{
                          records: this.state.ActiveUserData,
                          type: "weight",
                        }}
                      />
                    )}
                  </div>
                  <div className="graph" id="graph4">
                    {this.state.ActiveUserData === "loading" ? (
                      <h4>Empty</h4>
                    ) : (
                      // <Loading open={true}/>
                      // <MyResponsiveLine data={this.state.bmiChartData} />
                      <MyResponsiveBar
                        data={{
                          records: this.state.ActiveUserData,
                          type: "weight",
                        }}
                      />
                    )}
                  </div>
                  <div className="graph" id="graph4">
                    {this.state.ActiveUserData === "loading" ? (
                      <h4>Empty</h4>
                    ) : (
                      // <Loading open={true}/>
                      // <MyResponsiveLine data={this.state.bmiChartData} />
                      <MyResponsiveBar
                        data={{
                          records: this.state.ActiveUserData,
                          type: "weight",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="middle-item4-AI">
                <div className="Ai-card-grid">
                  <div className="heart-card">
                    <p>Heart Attack Possibility Prediction</p>
                    <div className="ai-result">
                      <img src={hearVector} alt="heart" id="heart-vector" />
                      {this.state.diabetesResult !== undefined ? (
                        <p>
                          Heart Attack Possibility:{" "}
                          {this.state.diabetesResult["prediction_result"]
                            ? "True"
                            : "False"}
                        </p>
                      ) : (
                        <p>Heart Attack Possibility: loading..</p>
                      )}
                    </div>
                  </div>
                  <div className="diabetes-card">
                    <p>Diabetes Possibility Prediction</p>
                    <div className="ai-result">
                      <img src={diabetesVector} alt="heart" />
                      {this.state.heartAttackResult !== undefined ? (
                        <p>
                          Heart Attack Possibility:{" "}
                          {this.state.heartAttackResult["prediction_result"]
                            ? "True"
                            : "False"}
                        </p>
                      ) : (
                        <p>Heart Attack Possibility: loading...</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      );
    }
  }
}

export default DoctorDashboard;
