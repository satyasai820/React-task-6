

import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { addStudent, deleteStudent, getStudent, updateStudent } from "../redux/Api";
import { connect } from "react-redux";
import { select_Id, setData } from "../redux/Action";
import { Icon } from '@iconify/react';

const Student = ({ data, setData }) => {
  const [idSelected, setIdSelected] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect( ()=> {
    getStudents();
  },[])

  const getStudents = async () => {
    const students = await getStudent();
    setData(students);
  }

  const handleChange = (event, field) => {
    setFormData({ ...formData, [field]: event.target.value });
  }

  const handleEdit = (id) => {
    const selectStudent = data.find((student) => student.id === id);
    select_Id(id);
    setIdSelected(id);
    setFormData({
      name: selectStudent.name,
      age: selectStudent.age,
    });
    setIsEditMode(true);
  };

  const handleUpdate = async () => {
    try {
      if (formData.name === '' && formData.age === '') {
        alert("Please fill in the data");
      } else {
        await updateStudent(idSelected, formData);
        getStudents();
        select_Id(null);
        setFormData({
          name: '',
          age: '',
        });
        setIsEditMode(false);
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  }

  const handleDelete = async (id) => {
    try{
      await deleteStudent(id)
      alert("Student is successfully Deleted....!")
      getStudents();
    }catch(error){
      console.log("Student Successfully Deleted")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.name !== '') {
        await addStudent(formData);
        getStudents();
        setFormData({
          name: '',
          age: '',
        });
        setIsEditMode(false);
      } else {
        alert("Please enter a name");
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  }

  return (
    <>
      <h2 className="mt-3">Students</h2>
      <div className="container mt-4">
        <div className="row row-cols-md-1 g-3">
          <div className="col">
            <input
              type="text"
              className="form-control mx-auto shadow"
              placeholder="Name"
              value={formData.name}
              style={{ width: '300px' }}
              onChange={(e) => handleChange(e, 'name')}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control mx-auto shadow"
              placeholder="Age"
              value={formData.age}
              style={{ width: '300px' }}
              onChange={(e) => handleChange(e, 'age')}
            />
          </div>
        </div>
        {isEditMode ? (
          <button type="submit" className="btn btn-primary mt-2" onClick={handleUpdate}>
            Update
          </button>
        ) : (
          <button type="submit" className="btn btn-success mt-2" onClick={handleSubmit}>
            Add
          </button>
        )}
      </div> 
      <div className='container'>
        <div className='row row-cols-md-2 justify-content-center'>
          <div className='col'>
            <table className="table mt-3 border shadow">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody className=''>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>
                      <button type="button" className="btn btn-white" onClick={() => handleEdit(item.id)}> <Icon icon="tabler:edit" color="blue" width="25" height="25" /> </button>
                    </td>
                    <td>
                      <button type="button" className="btn btn-white" onClick={ ()=> handleDelete(item.id)}><Icon icon="fluent:delete-48-filled" color="red" width="25" height="25" /> </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

}

const mapStateToProps = state => {
  return {
    data: state.data,
    selectStudentId: state.selectStudentId,
  }
}

const mapDispatchToProps = {
  setData,
  select_Id,
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);

