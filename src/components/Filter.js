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
           
            <h2 id="underConstruction"><i>Under Construction!</i></h2>
        <h3>Select students:</h3>
        <div id="input-student-container">
            <label>
                <input type="checkbox" name="studentFilter" />
                Student 1 
            </label>
            <label>
                <input type="checkbox" name="studentFilter" />
                Student 2 
            </label>
            <label>
                <input type="checkbox" name="studentFilter" />
                Student 3 
            </label>
            <label>
                <input type="checkbox" name="studentFilter" />
                Student 4 
            </label>
            <label>
                <input type="checkbox" name="studentFilter" />
                Student 5 
            </label>
            <label>
                <input type="checkbox" name="studentFilter" />
                Student 6 
            </label>
            <label>
                <input type="checkbox" name="studentFilter" />
                Student 7 
            </label>
            <label>
                <input type="checkbox" name="studentFilter" />
                Student 8 
            </label>
            <label>
                <input type="checkbox" name="studentFilter" />
                Student 9
            </label>
            <label>
                <input type="checkbox" name="studentFilter" />
                Student 10 
            </label>
            

            
        </div>
    </form>
    </div>
    )
}

export default Filter;