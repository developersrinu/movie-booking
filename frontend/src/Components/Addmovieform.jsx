import React from 'react'
import './styles/addmovie1.css'
const Addmovieform = () => {
    return (
        <div className=' flex justify-center items-center mt-3'>
            <form class="form">
                <h3 class="title">Add movie </h3>

                <label>
                    <span>Email</span>
                    <input class="input" type="email" placeholder="" required="" />

                </label>

                <label>
                    <span>Password</span>
                    <input class="input" type="password" placeholder="" required="" />

                </label>
                <label>
                    <span>Confirm password</span>
                    <input class="input" type="password" placeholder="" required="" />

                </label>
                <button class="submit">Submit</button>
            </form>
        </div>
    )
}

export default Addmovieform