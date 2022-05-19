import React from "react";

function ListCandidate() {
  const storageData = JSON.parse(localStorage.getItem("data"));
  console.log(storageData);
  const sum = 0;
  return (
    <div>
      <body class="bg-light">
        <div class="container my-4">
          <main>
            <div class="py-5">
              <h2>
                Candidates List
                <button class="btn btn-primary float-end">Add Candidate</button>
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
                            <td>{data.fname + "" + data.lname}</td>
                            <td>{data.email}</td>
                            <td>{data.languages.length}</td>
                            <td>
                              {data.experience.map((v, i) => {
                                v.map((val, index) => {
                                  return sum + val.duration;
                                });
                              })}
                            </td>
                            <td>
                              <a href="#">Edit</a>
                              <a href="#" class="text-danger ms-2">
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
