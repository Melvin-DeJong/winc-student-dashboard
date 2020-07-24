import React from 'react';
import studentData from '../data';

function Filter(props){

   


    return (
        <div>
        <form onChange={props.handleFilterChange} className="filter">
            <h3>Filter by grade:</h3>
            <div id="input-container">
                <label>
                    <input type="radio" name="gradeFilter" id="both-grades" value="both" defaultChecked/>
                    Both Grades 
                </label>
                <label>
                    <input type="radio" name="gradeFilter" id="difficulty-grade" value="difficulty"/>
                    Difficulty 
                </label>
                <label>
                    <input type="radio" name="gradeFilter" id="review-grade" value="review"/>
                    Review 
                </label>
            </div>
        </form>
        <form onChange={props.handleFilterChange} className="filter-students">
        <h3>Filter by Student</h3>
        <div id="input-student-container">
            <label>
                <input type="checkbox" name="studentFilter" />
                
            </label>
            

            
        </div>
    </form>
    </div>
    )
}

export default Filter;