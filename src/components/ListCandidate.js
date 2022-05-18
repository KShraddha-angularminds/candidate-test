import React from 'react'

function ListCandidate() {
    const storageData =JSON.parse(localStorage.getItem("data"))
    console.log(storageData)
  return (
    <div><body class="bg-light">

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
                                <tr>
                                    <td>1</td>
                                    <td>{storageData.fname}</td>
                                    <td>{storageData.email}</td>
                                    <td>{storageData.languages.length}</td>
                                    <td>2</td>
                                    <td>
                                        <a href="#">Edit</a>
                                        <a href="#" class="text-danger ms-2">Delete</a>
                                    </td>
                                </tr>
                               
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</body>
</div>
  )
}

export default ListCandidate