import React, { useEffect, useState } from "react";
import MedicalRecords from "./medicalRecord";
import "../css/patientdashboard.css";
import logo from "../logos/logo.svg";
import slogo from "../logos/logo-wo-text.svg";
import cookie from "js-cookie";
import logoutimg from "../assets/p_dashbord-panel.svg";
import dosageimg from "../assets/dosage-image.svg";
import axios from "axios";
export default class PatientDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: "medicalrecord",
      userData: JSON.parse(localStorage.getItem("UserData")),
      token: cookie.get("jwt-token"),
    };
  }
  logout() {
    cookie.remove("jwt-token");
    window.location = "/signin";
  }
  componentDidMount() {
    const token = cookie.get("jwt-token");
    if (token == undefined) {
      window.location = "/signin";
    }
  }
  render() {
    return (
      <>
        <div className="patient__dashboard">
          <div className="p_dashboard__left_panel">
            <div className="p_dashboard_logo">
              <img className="blogo" src={logo} alt="logo" />
              <img className="slogo" src={slogo} alt="logo" />
              <div className="p_dashboard__nav">
                <a
                  className={
                    this.state.nav === "medicalrecord" ? "nav-active" : ""
                  }
                  onClick={() => {
                    this.setState({ nav: "medicalrecord" });
                  }}
                >
                  <div className="p_dashboard__nav_a">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.47961 1.6001H4.39961C4.03321 1.6001 3.71801 1.6001 3.43961 1.6657C3.00863 1.76868 2.61457 1.98897 2.3011 2.30216C1.98763 2.61535 1.76698 3.00921 1.66361 3.4401C1.59961 3.7185 1.59961 4.0321 1.59961 4.4001V8.4001C1.59961 8.7665 1.59961 9.0817 1.66521 9.3601C1.76819 9.79108 1.98848 10.1851 2.30167 10.4986C2.61486 10.8121 3.00872 11.0327 3.43961 11.1361C3.71801 11.2001 4.03161 11.2001 4.39961 11.2001H8.39961C8.76601 11.2001 9.08121 11.2001 9.35961 11.1345C9.79059 11.0315 10.1846 10.8112 10.4981 10.498C10.8116 10.1848 11.0322 9.79099 11.1356 9.3601C11.1996 9.0817 11.1996 8.7681 11.1996 8.4001V4.4001C11.1996 4.0337 11.1996 3.7185 11.134 3.4401C11.031 3.00912 10.8107 2.61506 10.4975 2.30159C10.1844 1.98812 9.7905 1.76747 9.35961 1.6641C9.08121 1.6001 8.76761 1.6001 8.39961 1.6001H4.47961ZM3.81241 3.2225C3.88121 3.2065 3.98841 3.2001 4.47961 3.2001H8.31961C8.81241 3.2001 8.91801 3.2049 8.98681 3.2225C9.13054 3.25687 9.26194 3.33038 9.36643 3.43487C9.47093 3.53937 9.54444 3.67077 9.57881 3.8145C9.59481 3.8817 9.59961 3.9873 9.59961 4.4801V8.3201C9.59961 8.8129 9.59481 8.9185 9.57721 8.9873C9.54284 9.13103 9.46933 9.26242 9.36483 9.36692C9.26034 9.47142 9.12894 9.54493 8.98521 9.5793C8.91961 9.5937 8.81401 9.6001 8.31961 9.6001H4.47961C3.98681 9.6001 3.88121 9.5953 3.81241 9.5777C3.66868 9.54333 3.53728 9.46982 3.43279 9.36532C3.32829 9.26082 3.25478 9.12943 3.22041 8.9857C3.20601 8.9201 3.19961 8.8145 3.19961 8.3201V4.4801C3.19961 3.9873 3.20441 3.8817 3.22201 3.8129C3.25638 3.66917 3.32989 3.53777 3.43439 3.43327C3.53888 3.32878 3.67028 3.25527 3.81401 3.2209L3.81241 3.2225ZM15.6796 1.6001H15.5996C15.2332 1.6001 14.918 1.6001 14.6396 1.6657C14.2086 1.76868 13.8146 1.98897 13.5011 2.30216C13.1876 2.61535 12.967 3.00921 12.8636 3.4401C12.7996 3.7185 12.7996 4.0321 12.7996 4.4001V8.4001C12.7996 8.7665 12.7996 9.0817 12.8652 9.3601C12.9682 9.79108 13.1885 10.1851 13.5017 10.4986C13.8149 10.8121 14.2087 11.0327 14.6396 11.1361C14.918 11.2001 15.2316 11.2001 15.5996 11.2001H19.5996C19.966 11.2001 20.2812 11.2001 20.5596 11.1345C20.9906 11.0315 21.3846 10.8112 21.6981 10.498C22.0116 10.1848 22.2322 9.79099 22.3356 9.3601C22.3996 9.0817 22.3996 8.7681 22.3996 8.4001V4.4001C22.3996 4.0337 22.3996 3.7185 22.334 3.4401C22.231 3.00912 22.0107 2.61506 21.6975 2.30159C21.3844 1.98812 20.9905 1.76747 20.5596 1.6641C20.2812 1.6001 19.9676 1.6001 19.5996 1.6001H15.6796ZM15.0124 3.2225C15.0812 3.2065 15.1884 3.2001 15.6796 3.2001H19.5196C20.0124 3.2001 20.118 3.2049 20.1868 3.2225C20.3305 3.25687 20.4619 3.33038 20.5664 3.43487C20.6709 3.53937 20.7444 3.67077 20.7788 3.8145C20.7948 3.8817 20.7996 3.9873 20.7996 4.4801V8.3201C20.7996 8.8129 20.7932 8.9185 20.7772 8.9873C20.7428 9.13103 20.6693 9.26242 20.5648 9.36692C20.4603 9.47142 20.3289 9.54493 20.1852 9.5793C20.118 9.5953 20.0124 9.6001 19.5196 9.6001H15.6796C15.1868 9.6001 15.0812 9.5953 15.0124 9.5777C14.8687 9.54333 14.7373 9.46982 14.6328 9.36532C14.5283 9.26082 14.4548 9.12943 14.4204 8.9857C14.406 8.9201 14.3996 8.8145 14.3996 8.3201V4.4801C14.3996 3.9873 14.4044 3.8817 14.422 3.8129C14.4564 3.66917 14.5299 3.53777 14.6344 3.43327C14.7389 3.32878 14.8703 3.25527 15.014 3.2209L15.0124 3.2225ZM4.39961 12.8001H8.39961C8.76601 12.8001 9.08121 12.8001 9.35961 12.8657C9.79059 12.9687 10.1846 13.189 10.4981 13.5022C10.8116 13.8153 11.0322 14.2092 11.1356 14.6401C11.1996 14.9185 11.1996 15.2321 11.1996 15.6001V19.6001C11.1996 19.9665 11.1996 20.2817 11.134 20.5601C11.031 20.9911 10.8107 21.3851 10.4975 21.6986C10.1844 22.0121 9.7905 22.2327 9.35961 22.3361C9.08121 22.4001 8.76761 22.4001 8.39961 22.4001H4.39961C4.03321 22.4001 3.71801 22.4001 3.43961 22.3345C3.00863 22.2315 2.61457 22.0112 2.3011 21.698C1.98763 21.3848 1.76698 20.991 1.66361 20.5601C1.59961 20.2817 1.59961 19.9681 1.59961 19.6001V15.6001C1.59961 15.2337 1.59961 14.9185 1.66521 14.6401C1.76819 14.2091 1.98848 13.8151 2.30167 13.5016C2.61486 13.1881 3.00872 12.9675 3.43961 12.8641C3.71801 12.8001 4.03161 12.8001 4.39961 12.8001ZM4.47961 14.4001C3.98681 14.4001 3.88121 14.4049 3.81241 14.4225C3.66868 14.4569 3.53728 14.5304 3.43279 14.6349C3.32829 14.7394 3.25478 14.8708 3.22041 15.0145C3.20601 15.0801 3.19961 15.1857 3.19961 15.6801V19.5201C3.19961 20.0129 3.20441 20.1185 3.22201 20.1873C3.25638 20.331 3.32989 20.4624 3.43439 20.5669C3.53888 20.6714 3.67028 20.7449 3.81401 20.7793C3.88121 20.7953 3.98681 20.8001 4.47961 20.8001H8.31961C8.81241 20.8001 8.91801 20.7937 8.98681 20.7777C9.13054 20.7433 9.26194 20.6698 9.36643 20.5653C9.47093 20.4608 9.54444 20.3294 9.57881 20.1857C9.59481 20.1185 9.59961 20.0129 9.59961 19.5201V15.6801C9.59961 15.1873 9.59481 15.0817 9.57721 15.0129C9.54284 14.8692 9.46933 14.7378 9.36483 14.6333C9.26034 14.5288 9.12894 14.4553 8.98521 14.4209C8.91961 14.4065 8.81401 14.4001 8.31961 14.4001H4.47961ZM15.6796 12.8001H15.5996C15.2332 12.8001 14.918 12.8001 14.6396 12.8657C14.2086 12.9687 13.8146 13.189 13.5011 13.5022C13.1876 13.8153 12.967 14.2092 12.8636 14.6401C12.7996 14.9185 12.7996 15.2321 12.7996 15.6001V19.6001C12.7996 19.9665 12.7996 20.2817 12.8652 20.5601C12.9682 20.9911 13.1885 21.3851 13.5017 21.6986C13.8149 22.0121 14.2087 22.2327 14.6396 22.3361C14.918 22.4017 15.2332 22.4017 15.5996 22.4017H19.5996C19.966 22.4017 20.2812 22.4017 20.5596 22.3361C20.9903 22.2329 21.384 22.0124 21.6972 21.6993C22.0104 21.3861 22.2308 20.9924 22.334 20.5617C22.3996 20.2833 22.3996 19.9681 22.3996 19.6017V15.6001C22.3996 15.2337 22.3996 14.9185 22.334 14.6401C22.231 14.2091 22.0107 13.8151 21.6975 13.5016C21.3844 13.1881 20.9905 12.9675 20.5596 12.8641C20.2812 12.8001 19.9676 12.8001 19.5996 12.8001H15.6796ZM15.0124 14.4225C15.0812 14.4065 15.1884 14.4001 15.6796 14.4001H19.5196C20.0124 14.4001 20.118 14.4049 20.1868 14.4225C20.3305 14.4569 20.4619 14.5304 20.5664 14.6349C20.6709 14.7394 20.7444 14.8708 20.7788 15.0145C20.7948 15.0817 20.7996 15.1873 20.7996 15.6801V19.5201C20.7996 20.0129 20.7932 20.1185 20.7772 20.1873C20.7428 20.331 20.6693 20.4624 20.5648 20.5669C20.4603 20.6714 20.3289 20.7449 20.1852 20.7793C20.118 20.7953 20.0124 20.8001 19.5196 20.8001H15.6796C15.1868 20.8001 15.0812 20.7937 15.0124 20.7777C14.8687 20.7433 14.7373 20.6698 14.6328 20.5653C14.5283 20.4608 14.4548 20.3294 14.4204 20.1857C14.406 20.1201 14.3996 20.0145 14.3996 19.5201V15.6801C14.3996 15.1873 14.4044 15.0817 14.422 15.0129C14.4564 14.8692 14.5299 14.7378 14.6344 14.6333C14.7389 14.5288 14.8703 14.4553 15.014 14.4209L15.0124 14.4225Z"
                        fill="#535353"
                      />
                    </svg>
                    <p className="dashicon_text-none">Dashboard</p>
                  </div>
                </a>

                <a
                  className={
                    this.state.nav === "doctorslist" ? "nav-active" : ""
                  }
                  onClick={() => {
                    this.setState({ nav: "doctorslist" });
                  }}
                >
                  <div className="p_dashboard__nav_a">
                    {" "}
                    <svg
                      width="34"
                      height="28"
                      viewBox="0 0 34 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M29.7494 19.775C27.6244 16.45 25.4994 16.975 23.1619 16.8C23.3744 17.325 23.3744 17.85 23.3744 18.55C26.7744 19.25 27.6244 22.575 27.6244 24.5V26.25H23.3744V24.5H25.4994C25.4994 24.5 25.4994 20.125 22.3119 20.125C19.1244 20.125 19.1244 24.325 19.1244 24.5H21.2494V26.25H16.9994V24.5C16.9994 22.575 17.8494 19.075 21.2494 18.55C21.2494 17.5 21.0369 16.625 20.8244 16.275C20.3994 16.1 19.9744 15.75 19.9744 15.225C19.9744 14.175 21.6744 14.525 22.9494 12.6C22.9494 12.6 24.8619 8.575 24.2244 5.075H22.0994C22.0994 4.725 22.3119 4.55 22.3119 4.2C22.3119 3.85 22.3119 3.675 22.0994 3.325H23.7994C23.1619 1.575 21.0369 0 16.9994 0C12.9619 0 10.8369 1.575 9.98691 3.5H11.6869C11.6869 3.85 11.4744 4.025 11.4744 4.375C11.4744 4.725 11.4744 4.9 11.6869 5.25H9.56191C9.13691 8.75 10.8369 12.775 10.8369 12.775C12.1119 14.525 13.8119 14.175 13.8119 15.4C13.8119 16.275 12.7494 16.625 11.4744 16.8C11.0494 17.15 10.6244 17.85 10.6244 19.25V21.35C11.8994 21.7 12.7494 22.75 12.7494 23.8C12.7494 25.025 11.2619 26.25 9.56191 26.25C7.86191 26.25 6.37441 25.025 6.37441 23.625C6.37441 22.4 7.22441 21.525 8.49941 21.175V19.075C8.49941 18.2 8.71191 17.5 8.92441 16.8C7.43691 16.975 5.73691 17.5 4.24941 19.775C2.97441 21.7 2.33691 28 2.33691 28H31.4494C31.6619 28 31.0244 21.7 29.7494 19.775ZM13.8119 4.375C13.8119 2.975 15.2994 1.75 16.9994 1.75C18.6994 1.75 20.1869 2.975 20.1869 4.375C20.1869 5.775 18.6994 7 16.9994 7C15.2994 7 13.8119 5.775 13.8119 4.375Z"
                        fill="#535353"
                      />
                      <path
                        d="M10.625 23.625C10.625 23.8571 10.5131 24.0796 10.3138 24.2437C10.1145 24.4078 9.84429 24.5 9.5625 24.5C9.28071 24.5 9.01046 24.4078 8.8112 24.2437C8.61194 24.0796 8.5 23.8571 8.5 23.625C8.5 23.3929 8.61194 23.1704 8.8112 23.0063C9.01046 22.8422 9.28071 22.75 9.5625 22.75C9.84429 22.75 10.1145 22.8422 10.3138 23.0063C10.5131 23.1704 10.625 23.3929 10.625 23.625Z"
                        fill="#535353"
                      />
                    </svg>
                    <p className="dashicon_text-none">Doctors</p>
                  </div>
                </a>
                <a
                  className={
                    this.state.nav === "editmedicalrecord"
                      ? "nav-active mlg"
                      : ""
                  }
                  onClick={() => {
                    this.setState({ nav: "editmedicalrecord" });
                  }}
                >
                  {" "}
                  <div className="p_dashboard__nav_a">
                    <svg
                      width="29"
                      height="29"
                      viewBox="0 0 23 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.83301 3.83329V23.1666C1.83301 23.8076 2.08762 24.4223 2.54083 24.8755C2.99405 25.3287 3.60873 25.5833 4.24967 25.5833H18.7497C19.3906 25.5833 20.0053 25.3287 20.4585 24.8755C20.9117 24.4223 21.1663 23.8076 21.1663 23.1666V9.07988C21.1663 8.75793 21.1019 8.43923 20.977 8.14251C20.8521 7.84578 20.6692 7.577 20.4389 7.35196L15.0739 2.10538C14.6224 1.66392 14.0161 1.4167 13.3847 1.41663H4.24967C3.60873 1.41663 2.99405 1.67124 2.54083 2.12445C2.08762 2.57766 1.83301 3.19235 1.83301 3.83329V3.83329Z"
                        stroke="#535461"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.875 14.7083H15.125"
                        stroke="#535461"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.875 19.5416H11.5"
                        stroke="#535461"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.916 1.41663V6.24996C13.916 6.8909 14.1706 7.50559 14.6238 7.9588C15.0771 8.41201 15.6917 8.66663 16.3327 8.66663H21.166"
                        stroke="#535461"
                        stroke-width="2"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <p className="dashicon_text-none">Medical Records</p>
                  </div>
                </a>
                <a
                  className={
                    this.state.nav === "dosagereminder" ? "nav-active" : ""
                  }
                  onClick={() => {
                    this.setState({ nav: "dosagereminder" });
                  }}
                >
                  {" "}
                  <div className="p_dashboard__nav_a">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.5859 8.14746C24.5248 7.95939 24.4057 7.79549 24.2457 7.6792C24.0857 7.56291 23.8931 7.50019 23.6953 7.5H21.5625V4.21875C21.5625 3.7002 21.1436 3.28125 20.625 3.28125H9.375C8.85645 3.28125 8.4375 3.7002 8.4375 4.21875V7.5H6.30469C6.10681 7.49974 5.91395 7.56229 5.7539 7.67864C5.59384 7.795 5.47485 7.95915 5.41406 8.14746L3.28125 14.707V25.7812C3.28125 26.2998 3.7002 26.7188 4.21875 26.7188H25.7812C26.2998 26.7188 26.7188 26.2998 26.7188 25.7812V14.707L24.5859 8.14746ZM19.3359 18.3984C19.3359 18.5273 19.2305 18.6328 19.1016 18.6328H15.9375V21.7969C15.9375 21.9258 15.832 22.0312 15.7031 22.0312H14.2969C14.168 22.0312 14.0625 21.9258 14.0625 21.7969V18.6328H10.8984C10.7695 18.6328 10.6641 18.5273 10.6641 18.3984V16.9922C10.6641 16.8633 10.7695 16.7578 10.8984 16.7578H14.0625V13.5938C14.0625 13.4648 14.168 13.3594 14.2969 13.3594H15.7031C15.832 13.3594 15.9375 13.4648 15.9375 13.5938V16.7578H19.1016C19.2305 16.7578 19.3359 16.8633 19.3359 16.9922V18.3984ZM19.4531 7.5H10.5469V5.39062H19.4531V7.5Z"
                        fill="#535353"
                      />
                    </svg>
                    <p className="dashicon_text-none">Dosage Reminder</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="p_dashboard_logout">
              <img src={logoutimg} />
              <a onClick={this.logout}>
                {" "}
                <div className="p_dashboard__nav_a">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.625 28.125H16.875C17.3721 28.1245 17.8488 27.9268 18.2003 27.5753C18.5518 27.2238 18.7495 26.7471 18.75 26.25V23.4375H16.875V26.25H5.625V3.75H16.875V6.5625H18.75V3.75C18.7495 3.25287 18.5518 2.77625 18.2003 2.42472C17.8488 2.0732 17.3721 1.8755 16.875 1.875H5.625C5.12787 1.8755 4.65125 2.0732 4.29972 2.42472C3.9482 2.77625 3.7505 3.25287 3.75 3.75V26.25C3.7505 26.7471 3.9482 27.2238 4.29972 27.5753C4.65125 27.9268 5.12787 28.1245 5.625 28.125Z"
                      fill="black"
                    />
                    <path
                      d="M19.2994 19.2994L22.6613 15.9375H9.375V14.0625H22.6613L19.2994 10.7006L20.625 9.375L26.25 15L20.625 20.625L19.2994 19.2994Z"
                      fill="black"
                    />
                  </svg>
                  <p className="dashicon_text-none">Logout</p>
                </div>
              </a>
            </div>
          </div>
          <div className="p_dashboard__right_side">
            <div class="no-time">
              <Menu
                nav={this.state.nav}
                medrecord_id={this.state.userData.medrecord_id}
                name={this.state.userData.name}
                dosagebox_id={this.state.userData.dosagebox_id}
                doctors={this.state.userData.doctors}
                token={this.state.token}
                doctorAddNotifi={this.state.userData.doctorAddNotifi}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
function Menu({
  nav,
  medrecord_id,
  dosagebox_id,
  doctors,
  token,
  doctorAddNotifi,
  name,
}) {
  if (nav === "medicalrecord")
    return (
      <MedicalRecords
        medrecord_id={medrecord_id}
        token={token}
        doctorAddNotifi={doctorAddNotifi}
        name={name}
      />
    );
  if (nav === "dosagereminder")
    return (
      <DosageReminder
        dosagebox_id={dosagebox_id}
        token={token}
        doctorAddNotifi={doctorAddNotifi}
      />
    );
  if (nav === "doctorslist")
    return (
      <DoctorsList
        doctors={doctors}
        token={token}
        doctorAddNotifi={doctorAddNotifi}
      />
    );
  if (nav === "editmedicalrecord")
    return (
      <EditMedicalRecords
        medrecord_id={medrecord_id}
        token={token}
        doctorAddNotifi={doctorAddNotifi}
      />
    );
}

function DosageReminder({ dosagebox_id, token, doctorAddNotifi }) {
  const [dosageData, setdosageData] = useState();
  const [refresh, setrefresh] = useState("");
  const [addmode, setaddmode] = useState(false);
  const [loading, setloading] = useState(false);
  const [checkerr, seterr] = useState(false);
  const [notifytoggle, setnotifytoggle] = useState(false);

  const [addreminder, setaddreminder] = useState({ med: "", time: [] });
  function updateArr(val, i) {
    let arr = [...addreminder.time];
    arr[i] = val;
    setaddreminder({
      med: addreminder.med,
      time: arr,
    });
  }
  function setmedname(val) {
    setaddreminder({ med: val.toLowerCase(), time: addreminder.time });
  }
  function submitreminder() {
    if (addreminder.med) {
      axios
        .post(
          `https://predictx-backend.herokuapp.com/patient/adddosage`,
          addreminder,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res.data.success === true) {
            setaddreminder({ med: "", time: [] });
            setrefresh(addreminder);
            setaddmode(!addmode);
          } else {
            seterr(true);
          }
        });
    }
  }
  useEffect(() => {
    axios
      .get(
        `https://predictx-backend.herokuapp.com/patient/mydosage/${dosagebox_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.success === true) {
          setdosageData(res.data.data);
          setloading(true);
        }
      });
  }, [refresh]);
  return !loading ? (
    <div>loading...</div>
  ) : (
    <>
      <div className="p_dashboard__dosage">
        <div className="p_dashboard__component_title">
          <h4>Dosage Reminder</h4>
          <div>
            <a onClick={() => setnotifytoggle(!notifytoggle)}>
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
            {notifytoggle ? (
              <Notifications doctorAddNotifi={doctorAddNotifi} token={token} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="p_dashboard__reminder_section">
          <div className="p_dashboard_reminders_grid">
            {dosageData.map((mdata) => {
              return (
                <ReminderCard
                  medData={mdata}
                  refresh={(data) => {
                    setloading(false);
                    setrefresh(data);
                  }}
                  token={token}
                />
              );
            })}
            <div className="reminders_card add_reminder">
              {!addmode ? (
                <a onClick={() => setaddmode(true)}>
                  <svg
                    width="124"
                    height="124"
                    viewBox="0 0 124 124"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M62 108.5C53.5696 108.5 45.3285 106 38.3188 101.316C31.3092 96.6327 25.8458 89.9756 22.6197 82.1869C19.3935 74.3982 18.5494 65.8277 20.194 57.5593C21.8387 49.2909 25.8984 41.6958 31.8596 35.7346C37.8208 29.7734 45.4159 25.7137 53.6843 24.069C61.9527 22.4244 70.5232 23.2685 78.3119 26.4947C86.1006 29.7208 92.7577 35.1842 97.4414 42.1938C102.125 49.2035 104.625 57.4446 104.625 65.875C104.625 77.1799 100.134 88.0217 92.1404 96.0154C84.1467 104.009 73.3049 108.5 62 108.5ZM62 31C55.1024 31 48.3597 33.0454 42.6245 36.8775C36.8893 40.7096 32.4193 46.1564 29.7797 52.5289C27.1401 58.9015 26.4495 65.9137 27.7951 72.6788C29.1408 79.4439 32.4623 85.658 37.3397 90.5354C42.217 95.4127 48.4312 98.7342 55.1962 100.08C61.9613 101.426 68.9735 100.735 75.3461 98.0953C81.7187 95.4557 87.1654 90.9857 90.9975 85.2505C94.8296 79.5154 96.875 72.7726 96.875 65.875C96.875 56.6256 93.2007 47.755 86.6604 41.2147C80.12 34.6743 71.2494 31 62 31Z"
                      fill="#00A459"
                    />
                    <path
                      d="M15.5 29.4192L29.3774 15.5127L34.8633 20.987L20.9858 34.8935L15.5 29.4192Z"
                      fill="#00A459"
                    />
                    <path
                      d="M89.125 20.9558L94.6108 15.4815L108.488 29.388L103.002 34.8623L89.125 20.9558Z"
                      fill="#00A459"
                    />
                    <path
                      d="M81.375 62H65.875V46.5H58.125V62H42.625V69.75H58.125V85.25H65.875V69.75H81.375V62Z"
                      fill="#00A459"
                    />
                  </svg>
                  <h4>Add reminder</h4>
                </a>
              ) : (
                <>
                  <div className="reminder_inputs">
                    <div className="reminder_input_blocks">
                      <label>Name: </label>
                      <input
                        type="text"
                        onChange={(e) => setmedname(e.target.value)}
                      />
                    </div>
                    <div className="reminder_input_blocks">
                      <label>Morning: </label>
                      <input
                        type="time"
                        onChange={(e) => updateArr(e.target.value, 0)}
                      />
                    </div>{" "}
                    <div className="reminder_input_blocks">
                      <label>AfterNoon: </label>
                      <input
                        type="time"
                        onChange={(e) => updateArr(e.target.value, 1)}
                      />
                    </div>{" "}
                    <div className="reminder_input_blocks">
                      <label>Night: </label>
                      <input
                        type="time"
                        onChange={(e) => updateArr(e.target.value, 2)}
                      />
                    </div>
                  </div>
                  <span className={checkerr ? "reminder_error" : "none"}>
                    reminder already exist
                  </span>
                  <span
                    className={!addreminder.med ? "reminder_error" : "none"}
                  >
                    Enter Data
                  </span>
                  <div className="reminder_buttons">
                    <a
                      onClick={() => {
                        submitreminder();
                      }}
                    >
                      {" "}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="11.5" stroke="#00A459" />
                        <line
                          x1="6.45"
                          y1="14.4"
                          x2="10.45"
                          y2="17.4"
                          stroke="#00A459"
                          stroke-width="1.5"
                        />
                        <line
                          x1="9.39345"
                          y1="17.5589"
                          x2="17.3934"
                          y2="6.55887"
                          stroke="#00A459"
                          stroke-width="1.5"
                        />
                      </svg>
                    </a>
                    <a
                      onClick={() => {
                        setaddmode(!addmode);
                        seterr(false);

                        setaddreminder({ med: "", time: [] });
                      }}
                    >
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.875 7.875H9.1875V15.75H7.875V7.875Z"
                          fill="#BF1111"
                        />
                        <path
                          d="M11.8125 7.875H13.125V15.75H11.8125V7.875Z"
                          fill="#BF1111"
                        />
                        <path
                          d="M2.625 3.9375V5.25H3.9375V18.375C3.9375 18.7231 4.07578 19.0569 4.32192 19.3031C4.56806 19.5492 4.9019 19.6875 5.25 19.6875H15.75C16.0981 19.6875 16.4319 19.5492 16.6781 19.3031C16.9242 19.0569 17.0625 18.7231 17.0625 18.375V5.25H18.375V3.9375H2.625ZM5.25 18.375V5.25H15.75V18.375H5.25Z"
                          fill="#BF1111"
                        />
                        <path
                          d="M7.875 1.3125H13.125V2.625H7.875V1.3125Z"
                          fill="#BF1111"
                        />
                      </svg>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ReminderCard({ medData, refresh, token }) {
  const [editmode, seteditmode] = useState(false);
  const [meddata, updatemeddata] = useState(medData);
  function updateArr(val, i) {
    console.log(val);
    let arr = [...meddata.time];
    arr[i] = val;
    updatemeddata({
      med: meddata.med,
      renameMed: meddata.renameMed,
      time: arr,
    });
  }
  function setmedname(val) {
    updatemeddata({ med: meddata.med, renameMed: val, time: meddata.time });
  }
  function setData() {
    seteditmode(!editmode);
    if (editmode) {
      axios
        .post(
          `https://predictx-backend.herokuapp.com/patient/editdosage`,
          meddata,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res.data.success === true) {
            refresh(meddata);
          }
        });
    }
  }
  function Deletemed() {
    axios
      .post(
        `https://predictx-backend.herokuapp.com/patient/deletedosage/${meddata.med}`,
        meddata,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.success === true) {
          refresh(meddata);
        }
      });
  }
  return (
    <div className="reminders_card">
      <div className="reminders_card_title">
        {editmode ? (
          <input
            placeholder={meddata.med}
            onChange={(e) => {
              setmedname(e.target.value);
            }}
          />
        ) : (
          <h4>{meddata.med.toUpperCase()}</h4>
        )}
        <div className="card_butons">
          <a
            onClick={() => {
              setData();
            }}
          >
            {editmode ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="11.5" stroke="#00A459" />
                <line
                  x1="6.45"
                  y1="14.4"
                  x2="10.45"
                  y2="17.4"
                  stroke="#00A459"
                  stroke-width="1.5"
                />
                <line
                  x1="9.39345"
                  y1="17.5589"
                  x2="17.3934"
                  y2="6.55887"
                  stroke="#00A459"
                  stroke-width="1.5"
                />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.375 17.875H20.625V19.25H1.375V17.875Z"
                  fill="#535353"
                />
                <path
                  d="M17.4625 6.1875C18.0125 5.6375 18.0125 4.8125 17.4625 4.2625L14.9875 1.7875C14.4375 1.2375 13.6125 1.2375 13.0625 1.7875L2.75 12.1V16.5H7.15L17.4625 6.1875ZM14.025 2.75L16.5 5.225L14.4375 7.2875L11.9625 4.8125L14.025 2.75ZM4.125 15.125V12.65L11 5.775L13.475 8.25L6.6 15.125H4.125Z"
                  fill="#535353"
                />
              </svg>
            )}
          </a>
          <a onClick={Deletemed}>
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.875 7.875H9.1875V15.75H7.875V7.875Z" fill="#BF1111" />
              <path
                d="M11.8125 7.875H13.125V15.75H11.8125V7.875Z"
                fill="#BF1111"
              />
              <path
                d="M2.625 3.9375V5.25H3.9375V18.375C3.9375 18.7231 4.07578 19.0569 4.32192 19.3031C4.56806 19.5492 4.9019 19.6875 5.25 19.6875H15.75C16.0981 19.6875 16.4319 19.5492 16.6781 19.3031C16.9242 19.0569 17.0625 18.7231 17.0625 18.375V5.25H18.375V3.9375H2.625ZM5.25 18.375V5.25H15.75V18.375H5.25Z"
                fill="#BF1111"
              />
              <path
                d="M7.875 1.3125H13.125V2.625H7.875V1.3125Z"
                fill="#BF1111"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="reminders_card_details">
        <img src={dosageimg} />
        <div className="reminder_times">
          <h3>
            Morning:{" "}
            {editmode ? (
              <input
                type="time"
                placeholder={meddata.time[0]}
                onChange={(e) => {
                  updateArr(e.target.value, 0);
                }}
              />
            ) : (
              meddata.time[0]
            )}{" "}
            am
          </h3>
          <h3>
            AfterNoon:{" "}
            {editmode ? (
              <input
                type="time"
                placeholder={meddata.time[1]}
                onChange={(e) => {
                  updateArr(e.target.value, 1);
                }}
              />
            ) : (
              meddata.time[1]
            )}{" "}
            pm
          </h3>
          <h3>
            Night:{" "}
            {editmode ? (
              <input
                type="time"
                placeholder={meddata.time[2]}
                onChange={(e) => {
                  updateArr(e.target.value, 2);
                }}
              />
            ) : (
              meddata.time[2]
            )}{" "}
            pm
          </h3>
        </div>
      </div>
    </div>
  );
}

function EditMedicalRecords({ medrecord_id, token, doctorAddNotifi }) {
  const [state, setState] = useState({
    meddata: {},
    loading: true,
  });
  const [refresh, setrefresh] = useState({});
  const [notifytoggle, setnotifytoggle] = useState(false);
  useEffect(() => {
    axios
      .get(
        `https://predictx-backend.herokuapp.com/patient/medrecord/${medrecord_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.success === true) {
          var data = [];
          for (let d in res.data.data) {
            if (d !== "_id" && d !== "__v")
              data.push({ [d]: res.data.data[d] });
          }
          setState({ meddata: data, loading: false });
        }
      });
  }, [refresh]);

  return state.loading ? (
    <div>loading...</div>
  ) : (
    <>
      <div className="p_dashboard__dosage">
        <div className="p_dashboard__component_title">
          <h4>Edit Medical Record</h4>
          <div>
            <a onClick={() => setnotifytoggle(!notifytoggle)}>
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
            {notifytoggle ? (
              <Notifications doctorAddNotifi={doctorAddNotifi} token={token} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="p_dashboard__editmed_section">
          {state.meddata.map((md, i) => {
            if (typeof md[Object.keys(md)[0]] === "number") {
              console.log(md);
            }
            if (typeof md[Object.keys(md)[0]] !== "number") {
              let name = Object.keys(md);
              return (
                <div key={i} className="p_dashboard_editmed_datablock">
                  <h4>{name.toString().toUpperCase()}</h4>
                  <div className="p_dashboard__editmed_grid">
                    {md[Object.keys(md)[0]].map((data) => {
                      return (
                        <MedCard
                          data={data}
                          name={name}
                          token={token}
                          refresh={(data) => {
                            setState({ loading: true });
                            setrefresh(data);
                          }}
                        />
                      );
                    })}
                    {name != "age" && name != "bmi" ? (
                      <AddNewMedCard
                        name={name}
                        refresh={(data) => {
                          setState({ meddata: state.meddata, loading: true });
                          setrefresh(data);
                        }}
                        token={token}
                      />
                    ) : (
                      ""
                    )}
                  </div>{" "}
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
function AddNewMedCard({ name, refresh, token }) {
  const [change, updatechange] = useState("");
  const [newmed, setnewmed] = useState(false);
  const [err, seterr] = useState(true);
  function upchange(val) {
    updatechange(val);
    if (val) {
      seterr(false);
    } else {
      seterr(true);
    }
  }
  function SubmitNewMed(name) {
    if (change) {
      var body = {
        medname: name,
        val: change,
      };
      axios
        .post(
          "https://predictx-backend.herokuapp.com/patient/addmedrecord",
          body,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res.data.success == true) {
            setnewmed(!newmed);

            refresh(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      seterr(true);
    }
  }
  return (
    <div className="medcard addmed">
      {!newmed ? (
        <>
          {" "}
          <a
            onClick={() => {
              setnewmed(!newmed);
            }}
          >
            <svg
              width="58"
              height="58"
              viewBox="0 0 58 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.4664 7.41541C41.211 7.41541 50.8202 17.0246 50.8202 28.7692C50.8202 40.5138 41.211 50.123 29.4664 50.123C17.7219 50.123 8.11267 40.5138 8.11267 28.7692C8.11267 17.0246 17.7219 7.41541 29.4664 7.41541ZM29.4664 3.85645C15.7644 3.85645 4.55371 15.0672 4.55371 28.7692C4.55371 42.4712 15.7644 53.6819 29.4664 53.6819C43.1684 53.6819 54.3792 42.4712 54.3792 28.7692C54.3792 15.0672 43.1684 3.85645 29.4664 3.85645Z"
                fill="#535461"
              />
              <path
                d="M43.7031 26.9896H31.2468V14.5332H27.6878V26.9896H15.2314V30.5485H27.6878V43.0049H31.2468V30.5485H43.7031V26.9896Z"
                fill="#535461"
              />
            </svg>
          </a>
          <h3>Add {name}</h3>
        </>
      ) : (
        <div className="addnew-inputs">
          <h3>Enter {name}</h3>
          <input type="number" onChange={(e) => upchange(e.target.value)} />
          <span className={err ? "reminder_error " : "none"}>Enter data</span>
          <div className="addnew-buttons">
            <a
              onClick={() => {
                SubmitNewMed(name[0]);
              }}
            >
              {" "}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="11.5" stroke="#00A459" />
                <line
                  x1="6.45"
                  y1="14.4"
                  x2="10.45"
                  y2="17.4"
                  stroke="#00A459"
                  stroke-width="1.5"
                />
                <line
                  x1="9.39345"
                  y1="17.5589"
                  x2="17.3934"
                  y2="6.55887"
                  stroke="#00A459"
                  stroke-width="1.5"
                />
              </svg>
            </a>
            <a
              onClick={() => {
                setnewmed(!newmed);
              }}
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.875 7.875H9.1875V15.75H7.875V7.875Z"
                  fill="#BF1111"
                />
                <path
                  d="M11.8125 7.875H13.125V15.75H11.8125V7.875Z"
                  fill="#BF1111"
                />
                <path
                  d="M2.625 3.9375V5.25H3.9375V18.375C3.9375 18.7231 4.07578 19.0569 4.32192 19.3031C4.56806 19.5492 4.9019 19.6875 5.25 19.6875H15.75C16.0981 19.6875 16.4319 19.5492 16.6781 19.3031C16.9242 19.0569 17.0625 18.7231 17.0625 18.375V5.25H18.375V3.9375H2.625ZM5.25 18.375V5.25H15.75V18.375H5.25Z"
                  fill="#BF1111"
                />
                <path
                  d="M7.875 1.3125H13.125V2.625H7.875V1.3125Z"
                  fill="#BF1111"
                />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
function MedCard({ data, name, token, refresh }) {
  const [editmode, seteditmode] = useState(false);
  const [change, setchange] = useState("");
  function updatechange(val) {
    setchange(val);
  }
  function submitChange() {
    var body = {
      medname: name[0],
      val: change,
      id: data._id,
    };
    axios
      .post(
        `https://predictx-backend.herokuapp.com/patient/editmedrecord`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.success === true) {
          seteditmode(!editmode);

          refresh(res.data);
        }
      })
      .catch((err) => console.log(err));
  }
  function Deletedata() {
    let body = {
      specificmed: name[0],
      id: data._id,
    };
    axios
      .post(
        "https://predictx-backend.herokuapp.com/patient/deletemedrecord/specific",
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.status === true) {
          refresh(res.data.data);
        }
      });
  }
  return (
    <div className="medcard">
      <div className="medcard_title">
        <h3>{data.date}</h3>
        {name != "bmi" ? (
          <div className="medata_buttons">
            {editmode ? (
              <a
                onClick={() => {
                  submitChange();
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="11.5" stroke="#00A459" />
                  <line
                    x1="6.45"
                    y1="14.4"
                    x2="10.45"
                    y2="17.4"
                    stroke="#00A459"
                    stroke-width="1.5"
                  />
                  <line
                    x1="9.39345"
                    y1="17.5589"
                    x2="17.3934"
                    y2="6.55887"
                    stroke="#00A459"
                    stroke-width="1.5"
                  />
                </svg>
              </a>
            ) : (
              <a
                onClick={() => {
                  seteditmode(!editmode);
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.375 17.875H20.625V19.25H1.375V17.875Z"
                    fill="#535353"
                  />
                  <path
                    d="M17.4625 6.1875C18.0125 5.6375 18.0125 4.8125 17.4625 4.2625L14.9875 1.7875C14.4375 1.2375 13.6125 1.2375 13.0625 1.7875L2.75 12.1V16.5H7.15L17.4625 6.1875ZM14.025 2.75L16.5 5.225L14.4375 7.2875L11.9625 4.8125L14.025 2.75ZM4.125 15.125V12.65L11 5.775L13.475 8.25L6.6 15.125H4.125Z"
                    fill="#535353"
                  />
                </svg>
              </a>
            )}
            <a onClick={Deletedata}>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.875 7.875H9.1875V15.75H7.875V7.875Z"
                  fill="#BF1111"
                />
                <path
                  d="M11.8125 7.875H13.125V15.75H11.8125V7.875Z"
                  fill="#BF1111"
                />
                <path
                  d="M2.625 3.9375V5.25H3.9375V18.375C3.9375 18.7231 4.07578 19.0569 4.32192 19.3031C4.56806 19.5492 4.9019 19.6875 5.25 19.6875H15.75C16.0981 19.6875 16.4319 19.5492 16.6781 19.3031C16.9242 19.0569 17.0625 18.7231 17.0625 18.375V5.25H18.375V3.9375H2.625ZM5.25 18.375V5.25H15.75V18.375H5.25Z"
                  fill="#BF1111"
                />
                <path
                  d="M7.875 1.3125H13.125V2.625H7.875V1.3125Z"
                  fill="#BF1111"
                />
              </svg>
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="medcard_data">
        {" "}
        {editmode ? (
          <>
            <input
              type="number"
              placeholder={data.value}
              onChange={(e) => updatechange(e.target.value)}
              max="3"
            />{" "}
            <h3>
              {" "}
              {name == "height" ? " cm" : ""} {name == "weight" ? "Kg" : ""}
            </h3>
          </>
        ) : (
          <h3>
            {data.value}
            {name == "height" ? " cm" : ""} {name == "weight" ? "Kg" : ""}
          </h3>
        )}
      </div>
    </div>
  );
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
function DoctorsList({ doctors, token, doctorAddNotifi }) {
  const [doctorData, setdoctordata] = useState({
    _id: doctors[doctors.length - 1],
  });
  const [name, setname] = useState("");
  const [notifytoggle, setnotifytoggle] = useState(false);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    axios
      .get(`https://predictx-backend.herokuapp.com/doctor/${doctorData._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setname(res.data.data.name);
      });
  },[]);
  function Delete() {
    if (doctorData._id) {
      var body = {
        _id: doctorData._id,
      };
      axios
        .post(
          `https://predictx-backend.herokuapp.com/patient/deletedoctor`,
          body,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log(res);
        });
    }
  }
  return loading ? (
    <div>loading</div>
  ) : (
    <>
      <div className="p_dashboard__dosage">
        <div className="p_dashboard__component_title">
          <h4>Doctors</h4>
          <div>
            <a onClick={() => setnotifytoggle(!notifytoggle)}>
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
            {notifytoggle ? (
              <Notifications doctorAddNotifi={doctorAddNotifi} token={token} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="p_dashboard_doctors-grid">
          {name ? (
            <div className="reminders_card doc-card">
              <h3>Dr.{name}</h3>
              <div>
                <a onClick={Delete}>
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.875 7.875H9.1875V15.75H7.875V7.875Z"
                      fill="#BF1111"
                    />
                    <path
                      d="M11.8125 7.875H13.125V15.75H11.8125V7.875Z"
                      fill="#BF1111"
                    />
                    <path
                      d="M2.625 3.9375V5.25H3.9375V18.375C3.9375 18.7231 4.07578 19.0569 4.32192 19.3031C4.56806 19.5492 4.9019 19.6875 5.25 19.6875H15.75C16.0981 19.6875 16.4319 19.5492 16.6781 19.3031C16.9242 19.0569 17.0625 18.7231 17.0625 18.375V5.25H18.375V3.9375H2.625ZM5.25 18.375V5.25H15.75V18.375H5.25Z"
                      fill="#BF1111"
                    />
                    <path
                      d="M7.875 1.3125H13.125V2.625H7.875V1.3125Z"
                      fill="#BF1111"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
