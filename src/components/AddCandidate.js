import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCandidate() {
  const navigate = useNavigate();

  const [flag, setFlag] = useState(false);
  const [error, setError] = useState({});
  const [expErrors, setExpErrors] = useState({});
  const data = {
    countries: [
      {
        name: "India",
        states: ["maharashtra", "Delhi"],
      },
      { name: "Spain", states: ["B"] },

      { name: "USA", states: ["C"] },
      {
        name: "Mexico",
        states: ["D", "F", "H"],
      },
      { name: "Itali", states: ["E"] },
    ],
  };
  const [candidate, setCandidate] = useState({
    languages: [],
    experience: [],
  });

  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const temp = [
    {
      company: "",
      duration: "",
      desc: "",
    },
    {
      company: "",
      duration: "",
      desc: "",
    },
  ];
  const [experience, setExperience] = useState(temp);

  const availableState = data.countries.find((c) => c.name === selectedCountry);

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    const { languages } = candidate;

    // // Case 1 : The user checks the box
    if (checked) {
      setCandidate({
        ...candidate,
        languages: [...languages, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setCandidate({
        ...candidate,
        languages: languages.filter((e) => e !== value),
      });
    }
  };
  const handleChange = (e) => {
    setCandidate({
      ...candidate,
      [e.target.name]: e.target.value,
    });
  };
  const handleCountry = (e) => {
    setSelectedCountry(e.target.value);
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };
  const handleState = (e) => {
    setSelectedState(e.target.value);
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };
  const removeExp = (i) => {
    const temp = experience.filter((v, index) => index !== i);
    setExperience(temp);
  };

  const handleExperience = (i, e) => {
    setExperience((prev) =>
      prev.map((v, index) => {
        return i === index ? { ...v, [e.target.name]: e.target.value } : v;
      })
    );
  };

  const validate = (formData) => {
    const err = {};
    if (!formData.fname) {
      err.fname = "first name is required";
    }
    if (!formData.lname) {
      err.lname = "last name is required";
    }
    if (!formData.email) {
      err.email = "email is required";
    }
    if (!formData.gender) {
      err.gender = "gender is required";
    }
    if (!formData.address) {
      err.address = "address is required";
    }
    if (!formData.country) {
      err.country = "country is required";
    }
    if (!formData.state) {
      err.state = "state is required";
    }
    if (!formData.pin) {
      err.pin = "pin is required";
    }
    setError(err);
    return err;
  };

  const validateExp = (exp) => {
    const error = [];
    let flag = false;
    exp.map((ex, i) => {
      if (ex.company == "" || ex.duration == "" || ex.desc == "") {
        error.push({ error: "All Fields are required" });
        console.log(error);
      } else {
        error.push({ error: "" });
      }
    });
    setExpErrors(error);
    console.log(error);
    error.map((v, i) => {
      if (v.error === "") flag = true;
      else flag = false;
    });

    return flag;
  };
  console.log(expErrors);
  const submitForm = (e) => {
    e.preventDefault();
    const err = validate(candidate);
    const validExperience = validateExp(experience);
    console.log(validExperience);
    setCandidate({ ...candidate, experience: experience });

    if (candidate.languages.length < 3) {
      alert("minimun 3 skills are required");
    } else if (experience.length < 2) {
      alert("minimun 2 experiences are required");
    } else if (experience.length > 5) {
      alert("experiences should be less than 5");
    } else if (Object.keys(err).length === 0 && validExperience) {
      setFlag(true);
    }
  };

  useEffect(() => {
    if (flag) {
      const temp = JSON.parse(localStorage.getItem("data")) || [];
      temp.push(candidate);
      localStorage.setItem("data", JSON.stringify(temp));
      navigate("/list");
    }
  }, [flag]);
  console.log();
  return (
    <div>
      <div class="container my-4">
        <main>
          <div class="py-5 text-center">
            <h2>Add Candidate</h2>
          </div>
          <form onSubmit={(e) => submitForm(e)}>
            <div class="row g-5">
              <div class="col-md-7 col-lg-8 ms-auto me-auto">
                <h4 class="mb-3">Basic Info</h4>
                <div class="row g-3">
                  <div class="col-sm-6">
                    <label class="form-label">First name</label>
                    <input
                      type="text"
                      name="fname"
                      class="form-control"
                      onChange={(e) => handleChange(e)}
                      // onChange={(e) =>
                      //   setCandidate({
                      //     ...candidate,
                      //     [e.target.name]: e.target.value,
                      //   })
                      // }
                    />
                    <span class="text-danger fw-normal">{error.fname}</span>
                  </div>

                  <div class="col-sm-6">
                    <label class="form-label">Last name</label>
                    <input
                      type="text"
                      name="lname"
                      class="form-control"
                      onChange={(e) => handleChange(e)}
                    />
                    <span class="text-danger fw-normal">{error.lname}</span>
                  </div>

                  <div class="col-12">
                    <label class="form-label">Gender</label>
                    <div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          name="gender"
                          value={"male"}
                          type="radio"
                          onChange={(e) => handleChange(e)}
                        />
                        <label class="form-check-label">Male</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          name="gender"
                          type="radio"
                          value={"female"}
                          onChange={(e) => handleChange(e)}
                        />
                        <label class="form-check-label">Female</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          name="gender"
                          type="radio"
                          value={"other"}
                          onChange={(e) => handleChange(e)}
                        />
                        <label class="form-check-label">Other</label>
                      </div>
                    </div>
                    <span class="text-danger fw-normal">{error.gender}</span>
                  </div>

                  <div class="col-12">
                    <label class="form-label">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      placeholder="you@example.com"
                      onChange={(e) => handleChange(e)}
                    />
                    <span class="text-danger fw-normal">{error.email}</span>
                  </div>

                  <div class="col-12">
                    <label class="form-label">Address</label>
                    <textarea
                      class="form-control"
                      name="address"
                      placeholder="1234 Main St"
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                    <span class="text-danger fw-normal">{error.address}</span>
                  </div>

                  <div class="col-md-5">
                    <label class="form-label">Country</label>
                    <select
                      class="form-select"
                      name="country"
                      value={selectedCountry}
                      onChange={(e) => handleCountry(e)}
                    >
                      <option value="">Choose Country</option>
                      {data.countries.map((value, key) => {
                        return (
                          <option value={value.name} key={key}>
                            {value.name}
                          </option>
                        );
                      })}
                    </select>
                    <span class="text-danger fw-normal">{error.country}</span>
                  </div>

                  <div class="col-md-4">
                    <label class="form-label">State</label>
                    <select
                      class="form-select"
                      name="state"
                      placeholder="State"
                      value={selectedState}
                      onChange={(e) => handleState(e)}
                    >
                      <option>Choose State</option>
                      {availableState?.states.map((e, key) => {
                        return (
                          <option value={e} key={key}>
                            {e}
                          </option>
                        );
                      })}
                    </select>
                    <span class="text-danger fw-normal">{error.state}</span>
                  </div>

                  <div class="col-md-3">
                    <label class="form-label">Pin / Zip</label>
                    <input
                      type="text"
                      class="form-control"
                      name="pin"
                      onChange={(e) => handleChange(e)}
                    />
                    <span class="text-danger fw-normal">{error.pin}</span>
                  </div>
                </div>

                <hr class="my-4" />

                <h4 class="mb-3">Professional Info</h4>

                <div class="row g-3">
                  <div class="col-12">
                    <label class="form-label">
                      Choose your skills
                      <span class="small text-muted">(min 3 skills)</span>
                    </label>
                    <div class="mb-3">
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="language"
                          value="Angular"
                          onClick={(e) => handleCheckbox(e)}
                        />
                        <label class="form-check-label">Angular</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="language"
                          value="React"
                          onClick={(e) => handleCheckbox(e)}
                        />
                        <label class="form-check-label">React</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="language"
                          value="Node.JS"
                          onClick={(e) => handleCheckbox(e)}
                        />
                        <label class="form-check-label">Node.JS</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="language"
                          value="JavaScript"
                          onClick={(e) => handleCheckbox(e)}
                        />
                        <label class="form-check-label">JavaScript</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="language"
                          value="Flutter"
                          onClick={(e) => handleCheckbox(e)}
                        />
                        <label class="form-check-label">Flutter</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="language"
                          value="Java"
                          onClick={(e) => handleCheckbox(e)}
                        />
                        <label class="form-check-label">Java</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row gy-3">
                  <div class="col-12">
                    <label class="form-label">
                      <strong>
                        Experience
                        <span class="small text-muted">
                          (min 2, max 5 items)
                        </span>
                      </strong>
                    </label>
                    {experience?.map((v, i) => {
                      return (
                        <div class="card mx-3 mt-3">
                          <div class="card-body">
                            <h6 class="card-title text-muted mb-3">
                              Experience {i + 1}
                              <a
                                class="float-end text-danger fw-normal"
                                onClick={() => removeExp(i)}
                              >
                                Remove
                              </a>
                            </h6>
                            <div class="row g-3">
                              <div class="col-6">
                                <label class="form-label">Company Name</label>
                                <input
                                  type="text"
                                  name="company"
                                  class="form-control"
                                  onChange={(e) => handleExperience(i, e)}
                                />
                              </div>
                              <div class="col-6">
                                <label class="form-label">
                                  Duration{" "}
                                  <span class="text-muted">(in months)</span>
                                </label>
                                <input
                                  type="number"
                                  name="duration"
                                  class="form-control"
                                  onChange={(e) => handleExperience(i, e)}
                                />
                              </div>
                              <div class="col-12">
                                <label class="form-label">
                                  Describe your responsibilities
                                </label>
                                <textarea
                                  class="form-control"
                                  name="desc"
                                  onChange={(e) => handleExperience(i, e)}
                                ></textarea>
                              </div>
                            </div>
                          </div>

                          <span className="text-danger fw-normal">
                            {expErrors[i]?.error}
                          </span>
                        </div>
                      );
                    })}

                    <a
                      class="d-block mt-3"
                      onClick={() =>
                        setExperience([
                          ...experience,
                          {
                            company: "",
                            duration: "",
                            desc: "",
                          },
                        ])
                      }
                    >
                      Add more experience
                    </a>
                  </div>
                </div>

                <hr class="my-4" />

                <button class="btn btn-primary" type="submit">
                  Save Candidate
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default AddCandidate;
