import React, { useState } from "react";
import style from "./user.module.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const DeleteUser = () => {
    const [password, setPassword] = useState('')
    const [id, setId] = useState("")

    let user = JSON.parse(localStorage.getItem("user"))

    let navigate = useNavigate();

    let handleSubmit = (e) => {
        e.preventDefault()

        let data = { password }
        axios.post(`${process.env.REACT_APP_API_URL}/users/verifyByEmail?email=${user.email}&password=${password}`, data)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    alert(res.data.message)
                    axios.delete(`${process.env.REACT_APP_API_URL}/users/${user.id}`, id)
                        .then((res) => {
                            if (res.data.statusCode === 200) {
                                alert(res.data.message)
                                localStorage.removeItem("user")
                                navigate('/')
                            }
                        })
                }
            }).catch(() => {
                alert("Invalid password")
                navigate('/home')
            })

    }

    return (
        <div>
            <Navbar />
        <div className={style.main}>
            <div className={style.block}>
                <form action="" onSubmit={handleSubmit} method="POST">
                    <h1 className={style.color}>Delete Profile</h1><br />
                    <input type="password" name="password" placeholder="Confirm Password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
                    <button className='btn btn-primary'>Submit</button><br /><br />
                    <Link to="/home">Cancel</Link>
                </form>
            </div>
        </div>
        </div>
    )
}
export default DeleteUser