import axios from "axios";

const baseURL = 'https://react-crud-710b3-default-rtdb.firebaseio.com';

export const getStudent = async () => {
    try {
        const response = await axios.get(`${baseURL}/student.json`);
        const jsonData = response.data;

        if (jsonData === null) {
            return [];
        } else {
            return Object.keys(jsonData).map((key) => ({ id: key, ...jsonData[key] }));
        }
    } catch (error) {
        console.error('Error fetching student data:', error);
        return [];
    }
}

export const addStudent = async (formData) => {
    try {
        if (formData.name !== '' && formData.age !== '') {
            const response = await axios.post(`${baseURL}/student.json`, formData);
            // alert("Data successfully stored in Firebase");
            console.log(response.data, 'This is Data');
        } else {
            alert('Please enter name and age');
        }
    } catch (error) {
        alert('Error storing data in Firebase:', error);
    }
}


 export const updateStudent = async (id,formData) => {
    try{
        await axios.put(`${baseURL}/student/${id}.json`,formData);
        console.log("Hey I'm Updating...!")
    }catch(error){
        console.log('error occured')
    }
 };


 export const deleteStudent = async (id) => {
    try{
        await axios.delete(`${baseURL}/student/${id}.json`)
    }catch (error) {
        console.log('error occured')
      }
 }
