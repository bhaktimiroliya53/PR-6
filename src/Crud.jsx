import React, { useEffect, useState } from 'react'

function Crud() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [salary, setSalary] = useState("");
    const [record, setRecord] = useState([]);
    const [editid, setEditId] = useState("")
    const id = Math.floor(Math.random() * 1000);


    const handelSubmit = (e) => {
        e.preventDefault();
        let obj = { name, email, password, city, salary, id }
        if (editid) {
            let all = [...record];
            let update = all.map((val) => {
                if (val.id == editid) {
                    return {
                        ...val,
                        name: name,
                        email: email,
                        password: password,
                        city: city,
                        salary: salary,
                    }
                }
                return val;
            })
            localStorage.setItem('user', JSON.stringify(update));
            setRecord(update);
            alert("User Uapdate");
            setEditId("");
        }
        else {
            let allData = [...record, obj];
            localStorage.setItem('user', JSON.stringify(allData));
            setRecord(allData);
            alert("User Insert");
        }

        setName("")
        setEmail("")
        setPassword("")
        setCity("")
        setSalary("")
    }

    useEffect(() => {
        let all = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : []
        setRecord(all)
    }, [])

    const deleteRecord = (id) => {

        let all = [...record];
        let deleteData = all.filter((val) => {
            return val.id != id;
        });
        localStorage.setItem('user', JSON.stringify(deleteData));
        setRecord(deleteData);
        alert("SuccesFully Record Delete")
    }

    const editRecord = (id) => {
        let all = [...record];
        let single = all.find(val => val.id == id);
        setEditId(id)
        setName(single.name)
        setEmail(single.email)
        setPassword(single.password)
        setCity(single.city)
        setSalary(single.salary)
    }

    return (
        <>

            <div className="container">
                <div className="row">

                    <center>
                        <h1 className='shadow text-black py-3 w-50 m-4 mb-5 rounded-3' style={{ backgroundColor: "#BDA0D6" }}>Employee List</h1>
                    </center>

                    <form className='w-50 shadow p-5 mb-5 bg-body border rounded-3' style={{ margin: "auto" }} onSubmit={handelSubmit}>
                        <label className='d-blcok'>Name :- </label>
                        <input type="text" className='w-100 mb-3' style={{ border: "none", borderBottom: "1px solid black", background: "transparent", width: "100%" }} onChange={(e) => setName(e.target.value)} value={name} />

                        <label className='d-blcok'>Email :- </label>
                        <input type="email" className='w-100 mb-3' style={{ border: "none", borderBottom: "1px solid black", background: "transparent", width: "100%" }} onChange={(e) => setEmail(e.target.value)} value={email} />

                        <label className='d-blcok'>Password :- </label>
                        <input type="password" className='w-100 mb-3' style={{ border: "none", borderBottom: "1px solid black", background: "transparent", width: "100%" }} onChange={(e) => setPassword(e.target.value)} value={password} />

                        <label className='d-blcok'>City :-  </label>
                        <input type="text" className='w-100 mb-3' style={{ border: "none", borderBottom: "1px solid black", background: "transparent", width: "100%" }} onChange={(e) => setCity(e.target.value)} value={city} />

                        <label className='d-blcok'>Salary :- </label>
                        <input type="text" className='w-100 mb-3' style={{ border: "none", borderBottom: "1px solid black", background: "transparent", width: "100%" }} onChange={(e) => setSalary(e.target.value)} value={salary} />

                        <center>

                            {
                                editid ? (<input type='submit' className='btn btn-primary' value="Edit" />) : (<input type='submit' className='btn btn-primary' />)
                            }
                        </center>
                    </form>


                    <center>
                        <h3 className='shadow text-black py-3 m-4 mb-5 rounded-3' style={{ backgroundColor: "#BDA0D6", color: "black" }}>Mange Employee</h3>
                    </center>
                    <table className="table table-striped mb-4 rounded-3" border={1} style={{ color: "#9168B6", fontWeight: 'bold    ' }}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col">City</th>
                                <th scope="col">Salary</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                record.map((val, i) => {
                                    i = i + 1
                                    return (
                                        <tr key={val.id}>
                                            <td>{val.id}</td>
                                            <td>{val.name}</td>
                                            <td>{val.email}</td>
                                            <td>{val.password}</td>
                                            <td>{val.city}</td>
                                            <td>{val.salary}</td>
                                            <td>
                                                <button className="btn btn-danger m-2" onClick={() => deleteRecord(val.id)}>Delete</button>
                                                <button className="btn btn-primary m-2" onClick={() => editRecord(val.id)}>Edit</button>
                                                <button className="btn btn-secondary m-2">Add</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Crud