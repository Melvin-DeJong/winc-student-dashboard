import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import studentData from './data';
import Chart from './components/Chart';
import Header from './components/Header';
import Student from './components/Student';

class Container extends React.Component{
    constructor(){
        super();
        this.state = {
            students: [
                // {id: 1, firstName: "Evelyn"},
                
            ],
            assignments: [
                // {id: 1, name: "W1D1-1"},
                
            ],
            gradings: [
                // {id: 1, studentID: 1, assignmentID: 1, difficultyGrade: 3, reviewGrade: 3},
               
            ],
            graphData: [],
            radioState: {difficulty: true, review: true},
            filteredBool: false
        }
    }

    /**
     * removes duplicates from array
     * @param {array} array array with duplicate values
     */
    removeDuplicates = (array) => {
        return array.filter((item,index) => array.indexOf(item) === index);
    }

    /**
     * get assignment id by name
     * @param {string} name assignmentname
     * @param {array} assignments all assignments
     */
    getAssignmentId = (name, assignments) => {
        const assignment = assignments.filter(assignment => {
            return assignment.name === name
        });
        return assignment[0].id;
    }

    
    //  get student id by name
    getStudentId = (name, students) => {
        const student = students.filter(student => {
            return student.firstName === name
        });
        return student[0].id;
    }

    
    //   get students from data and add id
    getStudentState = (data) => {
        const allStudents = data.map((student) => {
            return student.studentName 
        })
        const uniqueStudents = this.removeDuplicates(allStudents);
        const students = uniqueStudents.map((item,index) => {
            return {id: index+1, firstName: item}
        })
        return students;
    }

    
    //   get assignments from data and add id
    getAssignmentState = (data) => {
        const allAssignments = data.map((item) => {
            return item.assignment 
        })
        const uniqueAssignments = this.removeDuplicates(allAssignments);
        const assignments = uniqueAssignments.map((item,index) => {
            return {id: index+1, name: item}
        })
        return assignments;
    }

    
    //   get grades from data with student and assignment id
    getGradingState = (data, students, assignments) => {
        const gradings = data.map((item, index) => {
            const studentID = this.getStudentId(item.studentName, students);
            const assignmentID = this.getAssignmentId(item.assignment, assignments);
            return {id: index + 1, studentID: studentID, assignmentID: assignmentID, difficultyGrade: item.difficulty, reviewGrade: item.review}
        })
        return gradings;
    }


    // filter form change
    handleFilterChange = (event) => {
        if(event.target.type === "radio"){
            switch(event.target.value){
                case('difficulty'):
                    this.setState(
                        {radioState: {difficulty: true, review: false}, filteredBool: true}
                    )
                    break;
                case('review'):
                    this.setState(
                        {radioState: {difficulty: false, review: true}, filteredBool: true}
                    )
                    break;
                default:
                    this.setState(
                        {radioState: {difficulty: true, review: true}, filteredBool: false}
                    )
                    break;
            }
        }
    }


    //  get grades from student by id
    getGradesFromStudent = (id) => {
        const state = {...this.state};
        const studentID = parseInt(id);
        const fromStudent = state.gradings.filter(item => {
            return item.studentID === studentID
        });
        const grades = fromStudent.map(item => {
            const assignmentName = this.getAssignmentName(item.assignmentID);
            return {assignmentName:assignmentName, difficultyGrade: item.difficultyGrade, reviewGrade:item.reviewGrade}
        });
        return grades
    }

    
    //  Get all info from student by id
    getStudentInfo = (id) => {
        const state = [...this.state.students];
        const studentID = parseInt(id);
        const student = state.filter(student => {
            return student.id === studentID
        });
        return student;
    }

    
    //  Function that returns an average from an array of numbers
    getAverage = (score) => {
        return (score.reduce((prevValue, currentValue) => currentValue + prevValue)) / score.length;
    }

    //  Function that returns the name from an assignment by id
    getAssignmentName = (assignmentID) => {
        const state = [...this.state.assignments];
        const name = state.find(assignment => assignment.id === assignmentID);
        return name.name
    }

    //  Function that returns all assignments that match the wanted assignment by id
    getDataFromSingleAssignment = (assignmentID) => {
        const state = [...this.state.gradings];
        const single = state.filter(item => {
            return item.assignmentID === assignmentID
        });
        return single;
    }

    // Function that seperates grades from the gradingsobject
    getGrades = (grades) => {
        const difficultyGrades = [];
        const reviewGrades = [];
        grades.forEach(item => {
            difficultyGrades.push(item.difficultyGrade);
            reviewGrades.push(item.reviewGrade);
        })
        return {difficultyGrades, reviewGrades}
    }
    // Function that tries to set the average and return nested array or return empty array
    setCombinedAverage = (data) => {
        const combinedAvgGrades = [];
        try {
            const averageDifficultyGrade = this.getAverage(data.difficultyGrades);
            const averageReviewGrade = this.getAverage(data.reviewGrades);
            combinedAvgGrades.push(averageDifficultyGrade, averageReviewGrade);
        } finally {
            return combinedAvgGrades;
        }
    }

    //  Function that gets the average grades from all assignments. returns object with assignment name, difficulty grade and review grade
    getAverageFromAllAssignments = () => {
        //Wanted result: {assignmentName: "W1D1-1", avgDifficultyGrade: 4, AvgReviewGrade: 1}
        const state = {...this.state};
        const names = [];
        
        const data = state.gradings.map((item) => {
            const name = this.getAssignmentName(item.assignmentID);
            if(!names.includes(name)){
                names.push(name);
            }
            const singleAssignment = this.getDataFromSingleAssignment(item.id);
            let grades;
            if (singleAssignment.length > 0){
                grades = this.getGrades(singleAssignment);
            }
            const combinedAvgGrades = this.setCombinedAverage(grades);
            return combinedAvgGrades
        })

        const filteredData = data.filter(item => {
            return item.length > 0 && item !== undefined
        })

        const averageData = filteredData.map((data, index) => {
            return {assignmentName: names[index], difficultyGrade: data[0], reviewGrade: data[1]}
        })
        return averageData;
    }

    setAverageFromAll = () => {
        const data = this.getAverageFromAllAssignments();
        this.setState({
            graphData: data
        });
    }

    // Loads all data into state
    loadDataIntoState = (data) => {
        const newStudents = this.getStudentState(data);
        const newAssignments = this.getAssignmentState(data);
        const newGradings = this.getGradingState(data, newStudents, newAssignments);
        this.setState({
            students: newStudents,
            assignments: newAssignments,
            gradings: newGradings
        }, () => {
            this.setAverageFromAll();
        });
    }

    componentDidMount(){
        this.loadDataIntoState(studentData);
    }

    render() {
        return (
            <Router>
                    <Header students={this.state.students} handlechange={this.studentSelectHandleChange}/>
                        <Switch>
                            <Route exact path="/container/" render={props =>
                            <React.Fragment>
                                <h1>Average of all students per assignment</h1>
                                <Chart
                                    graphData={this.state.graphData}
                                    radioState={this.state.radioState}
                                    handleFilterChange={this.handleFilterChange}
                                 />
                            </React.Fragment>}
                            />
                            <Route path="/:id" render={props => <Student
                                {...props}
                                studentInfo={this.getStudentInfo(props.match.params.id)}
                                data={this.getGradesFromStudent(props.match.params.id)}
                                radioState={this.state.radioState}
                                handleFilterChange={this.handleFilterChange}
                                />}
                            />
                        </Switch>
            </Router>
        )
    }
}

export default Container;