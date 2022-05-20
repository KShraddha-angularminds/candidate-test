import React, { useState } from "react";
import { Link } from "react-router-dom";

function ListCandidate() {
  const Data = JSON.parse(localStorage.getItem("data"));
  const [storageData, setStorageData] = useState(Data);
  console.log(storageData);
  const deleteCandidate = (id) => {
    const temp = storageData.filter((v, i) => i !== id);
    console.log(temp);
    localStorage.setItem("data", JSON.stringify(temp));
    setStorageData(temp);
  };
  return (
    <div>
      <body class="bg-light">
        <div class="container my-4">
          <main>
            <div class="py-5">
              <h2>
                Candidates List
                <Link to="/">
                  <button class="btn btn-primary float-end">
                    Add Candidate
                  </button>
                </Link>
              </h2>
            </div>

            <div class="row">
              <div class="col-12 ms-auto me-auto">
                <div class="card">
                  <div class="card-body">
                    <table class="table">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number of Skills</th>
                        <th>Total Work Experience (in months)</th>
                        <th>Actions</th>
                      </tr>
                      {storageData.map((data, id) => {
                        return (
                          <tr>
                            <td>{id + 1}</td>
                            <td>{data.fname + " " + data.lname}</td>
                            <td>{data.email}</td>
                            <td>{data.languages.length}</td>
                            <td>
                              {data.experience.reduce(
                                (previousValue, currentValue) => {
                                  return previousValue + +currentValue.duration;
                                },
                                0
                              )}
                            </td>
                            <td>
                              <Link to={`/edit/${id}`}>
                                <a>Edit</a>
                              </Link>

                              <a
                                href="#"
                                class="text-danger ms-2"
                                onClick={() => deleteCandidate(id)}
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </body>
    </div>
  );
}

export default ListCandidate;
