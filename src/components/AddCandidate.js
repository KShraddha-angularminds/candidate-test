import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddCandidate() {
    const navigate = useNavigate()
    const [dataArr,setDataArr] = useState([])
    const [flag,setFlag] = useState(false)
    const data = {
        countries: [
          {
            name: "India",
            states:  ["maharashtra","Delhi"]
          },
          { name: "Spain", states: ["B"] },
      
          { name: "USA", states: [ "C" ] },
          {
            name: "Mexico", states: ["D", "F", "H"] 
          },
          { name: "Itali", states: ["E"] 
          }
        ]
      };
    const [candidate,setCandidate] = useState({
        languages: [],
        experience:[]
    }
    )
    const [exp, setExp] = useState([0,1])
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedState, setSelectedState] = useState();
    const [experience, setExperience] = useState({
        
            company:"",
            duration:"",
            desc:""
        })


    const availableState = data.countries.find((c) => c.name === selectedCountry);
    console.log(data.countries.filter((c) => c.name === selectedCountry))
    
    console.log(candidate)
    const handleCheckbox = (e) => {
       
        const { value, checked } = e.target;
        const { languages } = candidate;
          console.log(languages)
       
        // // Case 1 : The user checks the box
        if (checked) {
          setCandidate({
              ...candidate,
              languages: [...languages, value] });
        }
      
        // Case 2  : The user unchecks the box
        else {
            setCandidate({
                ...candidate,
                languages: languages.filter((e) => e !== value),
                
              });
        }
      };
      const handleCountry = (e) =>{
        setSelectedCountry(e.target.value)
        setCandidate({...candidate,[e.target.name]:e.target.value})
    }
    const handleState = (e) =>{
        console.log(e.target.value)
        setSelectedState(e.target.value)
        setCandidate({...candidate,[e.target.name]:e.target.value})
    }
    const removeExp = (i) =>{
        console.log(i)
        const temp = exp.filter((index)=> index!==i)
        setExp(temp)
    }
    console.log(experience)
    const submitForm = () =>{
        
        setCandidate({...candidate, experience: [experience]})
        setFlag(true)
    //     localStorage.setItem("data",JSON.stringify(candidate))
    //    navigate("/list")
    }
    useEffect(()=>{
        if(flag){
            localStorage.setItem("data",JSON.stringify(candidate))
            navigate("/list")
        }
    },[flag])
   console.log(experience)
  return (
    <div><div class="container my-4">
    <main>
      <div class="py-5 text-center">
        <h2>Add Candidate</h2>
      </div>

      <div class="row g-5">
        <div class="col-md-7 col-lg-8 ms-auto me-auto">
          <h4 class="mb-3">Basic Info</h4>
          <div class="row g-3">
            <div class="col-sm-6">
              <label class="form-label">First name</label>
              <input type="text" name="fname" class="form-control" onChange={(e)=>setCandidate({...candidate,[e.target.name]:e.target.value})} required/>
            </div>

            <div class="col-sm-6">
              <label class="form-label">Last name</label>
              <input type="text"  name="lname" class="form-control" onChange={(e)=>setCandidate({...candidate,[e.target.name]:e.target.value})} required/>
            </div>

            <div class="col-12">
              <label class="form-label">Gender</label>
              <div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" name="gender" value={"male"} type="radio" onChange={(e)=>setCandidate({...candidate,[e.target.name]:e.target.value})} required/>
                  <label class="form-check-label">Male</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" name="gender" type="radio"  value={"female"} onChange={(e)=>setCandidate({...candidate,[e.target.name]:e.target.value})} required/>
                  <label class="form-check-label">Female</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" name="gender" type="radio" value={"other"} onChange={(e)=>setCandidate({...candidate,[e.target.name]:e.target.value})} required/>
                  <label class="form-check-label">Other</label>
                </div>
              </div>
            </div>

            <div class="col-12">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" name='email' placeholder="you@example.com" onChange={(e)=>setCandidate({...candidate,[e.target.name]:e.target.value})} required/>
            </div>

            <div class="col-12">
              <label class="form-label">Address</label>
              <textarea class="form-control" name='address' placeholder="1234 Main St" onChange={(e)=>setCandidate({...candidate,[e.target.name]:e.target.value})} required></textarea>
            </div>

            <div class="col-md-5">
              <label class="form-label">Country</label>
              <select class="form-select" name='country' value={selectedCountry} onChange={(e)=>handleCountry(e)}>
              <option value="">Choose Country</option>
          {data.countries.map((value, key) => {
            return (
              <option value={value.name} key={key}>
                {value.name}
              </option>
            );
          })}
              </select>
            </div>

            <div class="col-md-4">
              <label class="form-label">State</label>
              <select
              class="form-select"
              name= "state"
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
            </div>

            <div class="col-md-3">
              <label class="form-label">Pin / Zip</label>
              <input type="text" class="form-control" name='pin' onChange={(e)=>setCandidate({...candidate,[e.target.name]:e.target.value})}/>
            </div>
          </div>

          <hr class="my-4"/>

          <h4 class="mb-3">Professional Info</h4>

          <div class="row g-3">
            <div class="col-12">
              <label class="form-label">
                Choose your skills
                <span class="small text-muted">(min 3 skills)</span>
              </label>
              <div class="mb-3">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" name="language" value="Angular" onClick={(e)=>handleCheckbox(e)}/>
                  <label class="form-check-label">Angular</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" name="language" value="React" onClick={(e)=>handleCheckbox(e)}/>
                  <label class="form-check-label">React</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" name="language" value="Node.JS" onClick={(e)=>handleCheckbox(e)}/>
                  <label class="form-check-label">Node.JS</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" name="language" value="JavaScript" onClick={(e)=>handleCheckbox(e)}/>
                  <label class="form-check-label">JavaScript</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" name="language" value="Flutter" onClick={(e)=>handleCheckbox(e)}/>
                  <label class="form-check-label">Flutter</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox"name="language" value="Java" onClick={(e)=>handleCheckbox(e)}/>
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
                  <span class="small text-muted">(min 2, max 5 items)</span>
                </strong>
              </label>
              {exp?.map((v,i)=>{
                  console.log(v)
                  return(
                    <div class="card mx-3 mt-3">
                    <div class="card-body">
                      <h6 class="card-title text-muted mb-3">
                        Experience {i+1}
                        <a  class="float-end text-danger fw-normal" onClick={()=>removeExp(v)}>Remove</a>
                      </h6>
                      <div class="row g-3">
                        <div class="col-6">
                          <label class="form-label">Company Name</label>
                          <input type="text" name= "company" class="form-control" onChange={(e)=>setExperience({...experience,company:e.target.value})}/>
                        </div>
                        <div class="col-6">
                          <label class="form-label">Duration <span class="text-muted">(in months)</span></label>
                          <input type="number" name="duration" class="form-control" onChange={(e)=>setExperience({...experience,duration:e.target.value})} />
                        </div>
                        <div class="col-12">
                          <label class="form-label">Describe your responsibilities</label>
                          <textarea class="form-control" name="desc" onChange={(e)=>setExperience({...experience,desc:e.target.value})} ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
              })}
              
              <a class="d-block mt-3"  onClick={()=>setExp([...exp,exp.length])}>Add more experience</a>
            </div>
          </div>

          <hr class="my-4"/>
        
          <button class="btn btn-primary" type="button" onClick={()=>submitForm()}>Save Candidate</button>
        </div>
      </div>
    </main>
  </div></div>
  )
}

export default AddCandidate