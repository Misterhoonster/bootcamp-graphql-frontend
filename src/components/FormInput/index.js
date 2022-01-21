import React from "react";

const FormInput = ({ label, value: form, setForm }) => {
    console.log(form);
    return (<div>
    <h3>{label}</h3>
    <input
    value={form[label]}
    onChange={e => setForm({ [label]: e.target.value })} />
    </div>)
};
    

export default FormInput;