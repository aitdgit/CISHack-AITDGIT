import React, { useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import { MyResponsiveBar, MyResponsiveLine } from "./Graph";
import logo from "../assets/logo.svg";
import logoutimg from "../assets/p_dashbord-panel.svg";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import doctor from "../assets/doctor.svg";
import CakeIcon from "@material-ui/icons/Cake";
import HeightIcon from "../assets/height.svg";
import WeightIcon from "../assets/weight.svg";
import BmiIcon from "../assets/bmi.svg";
export default class MedicalRecords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medrecord_id: props.medrecord_id,
      ActiveUserData: "loading",
      loading: true,
      notifytoggle: false,
      doctorAddNotifi: props.doctorAddNotifi,
      token: props.token,
      name: props.name,
    };
  }
  componentDidMount() {
    const token = cookie.get("jwt-token");
    axios
      .get(
        `https://predictx-backend.herokuapp.com/patient/medrecord/${this.state.medrecord_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.success === true) {
          this.setState({ ActiveUserData: res.data.data });
          this.setState({ loading: false });
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    return this.state.loading ? (
      <div>loading....</div>
    ) : (
      <>
        <div className="p_dashboard__dosage">
          <div className="p_dashboard__component_title">
            <div className="title_p">
              <h4>{this.state.name}'s Dashboard</h4>
              <p>Hi, {this.state.name} &#128075;</p>
              <p>Its good to see you keeping track of your medical records</p>
            </div>
            <div>
              <a
                onClick={() =>
                  this.setState({ notifytoggle: !this.state.notifytoggle })
                }
              >
                {" "}
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.35005 2.43077L6.1986 0.230769C2.58776 3.04615 0.210632 7.38462 0 12.3077H3.00903C3.2347 8.23077 5.28084 4.66154 8.35005 2.43077V2.43077ZM26.991 12.3077H30C29.7743 7.38462 27.3972 3.04615 23.8014 0.230769L21.665 2.43077C24.7041 4.66154 26.7653 8.23077 26.991 12.3077ZM24.0271 13.0769C24.0271 8.35385 21.5597 4.4 17.2568 3.35385V2.30769C17.2568 1.03077 16.2487 0 15 0C13.7513 0 12.7432 1.03077 12.7432 2.30769V3.35385C8.42528 4.4 5.97292 8.33846 5.97292 13.0769V20.7692L2.96389 23.8462V25.3846H27.0361V23.8462L24.0271 20.7692V13.0769ZM15 30C15.2106 30 15.4062 29.9846 15.6018 29.9385C16.5797 29.7231 17.3771 29.0462 17.7683 28.1231C17.9188 27.7538 17.994 27.3538 17.994 26.9231H11.9759C11.991 28.6154 13.33 30 15 30Z"
                    fill="black"
                  />
                </svg>{" "}
              </a>
              {this.state.notifytoggle ? (
                <Notifications
                  doctorAddNotifi={this.state.doctorAddNotifi}
                  token={this.state.token}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="p_dashboard__dashboard_section">
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
            <div className="p_middle-item3">
              <div className="p_graphs">
                <div className="p_graph">
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
                <div className="p_graph">
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
                <div className="p_graph" id="graph3">
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
                <div className="p_graph" id="graph4">
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
                <div className="p_graph" id="graph4">
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
          </div>
        </div>
      </>
    );
  }
}
function Notifications({ token }) {
  const [userdata, setuserData] = useState(
    JSON.parse(localStorage.getItem("UserData"))
  );

  var doctorAddNotifi = userdata.doctorAddNotifi;
  return (
    <div className="notifciation-block">
      {doctorAddNotifi.length != 0
        ? doctorAddNotifi.map((data) => {
            return <NotifiContent doctorAddNotifi={data} token={token} />;
          })
        : "No Notifications"}
    </div>
  );
}
function NotifiContent({ doctorAddNotifi, token }) {
  const [name, setname] = useState("");
  const [loading, setloading] = useState(true);

  var id = doctorAddNotifi.split("/")[2];
  axios
    .get(`https://predictx-backend.herokuapp.com/doctor/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setname(res.data.data.name);
    });
  function accept() {
    var body = {
      docid: id,
    };
    axios
      .post("https://predictx-backend.herokuapp.com/doctor/adddoctor", body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success == true) {
          localStorage.setItem("UserData", JSON.stringify(res.data.data));
        }
      })
      .catch((err) => console.log(err));
  }
  function reject() {
    var body = {
      id: id,
    };
    axios
      .post("https://predictx-backend.herokuapp.com/doctor/clearnotifi", body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success == true) {
          localStorage.setItem("UserData", JSON.stringify(res.data.data));
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="notification-block-div">
      <p>Dr.{name} has sent yout invite </p>
      <div className="notification-buttons">
        {" "}
        <a onClick={accept}>Accept</a>
        <a onClick={reject}>Reject</a>
      </div>
    </div>
  );
}
