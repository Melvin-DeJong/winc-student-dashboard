import React from 'react'
import {Link, withRouter} from 'react-router-dom';

function Header(props){
    const options = props.students.map(student => {
        return <option key={student.id} value={student.id}>{student.firstName}</option>
    });

    const studentSelectHandleChange = (event) => {
        props.history.push( `${event.target.value}`);
    }

    const buttonHandleChange = (event) => {
        props.history.push( "/container");
    }

    return(
        <header>
            <button id="selectAllStudents" onClick={buttonHandleChange}>See all results</button>
            <label>Filter per student
                <select name="select-student" id="selectStudent" onChange={studentSelectHandleChange}>
                    <option value="container">Select student</option>
                    {options} 
                </select>
            </label>
        </header>
    )
}

export default withRouter(Header);