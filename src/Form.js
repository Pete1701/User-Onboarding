import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './Form.css';

const UserForm = ({ values, errors, touched, status }) => {
    console.log("values", values);
    console.log("errors", errors);
    console.log("touched", touched);  
    
    const [users, setUsers] = useState([]);  
    
    useEffect(() => {
      console.log("status has changed!", status);      
      status && setUsers(users => [...users, status]);
    }, [status]);
    return (
      <div className="user-form">        
        <Form className="formName">          
          <label htmlFor="name">Name</label>          
            <Field
              id="name"
              type="text"
              name="name"
              placeholder="Your name"
            />            
            {touched.name && errors.name && (
              <p className="errors">{errors.name}</p>
            )}          
          <label htmlFor="email">Email</label>
            <Field id="email" type="email" name="email" placeholder="Your email" />
            {touched.email && errors.email && (
              <p className="errors">{errors.email}</p>
            )}
            <label htmlFor="password">Password</label>               
            <Field
                id="password"
                type="password"
                name="password"
                placeholder="Your password"
                />
          <label htmlFor="terms">Terms of Service</label>            
            <Field
              type="checkbox"
              name="terms"
              checked={values.terms}
            />
            {/* <span className="checkmark" />                     */}
          <button type="submit">Submit</button>
        </Form>
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <pre>{JSON.stringify(errors, null, 2)}</pre>
        {users.map(user => {
          return (
            <ul key={user.id}>
              <li>Name: {user.name}</li>
              <li>Email: {user.email}</li>
            </ul>
          );
        })}
      </div>
    );
  };
  
  const FormikUserForm = withFormik({    
    mapPropsToValues(props) {      
      return {
        name: props.name || "",
        email: props.email || "",
        password: props.password || "",
        terms: props.terms || false        
      };
    },  
    
    validationSchema: Yup.object().shape({
      name: Yup.string().required("name is required"),      
      email: Yup.string().required("email is required"),
      terms: Yup.string().required("You have to agree to the Terms of Service")
    }),  
   
    handleSubmit(values, { setStatus, resetForm }) {
      console.log("submitting", values);
      axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
          console.log("success", res);          
          setStatus(res.data);          
          resetForm();
        })
        .catch(err => console.log(err.response));
    }
  })(UserForm);

export default FormikUserForm;