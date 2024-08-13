import React, { useState, useEffect } from 'react';
import api from './api';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [formdata, setFormdata] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  });

  const fetchTransactions = async () => {
    const response = await api.get('/transactions/');
    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormdata({
      ...formdata,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/transactions/', formdata);
      console.log('Transaction added:', response.data);
      fetchTransactions();
      setFormdata({
        amount: '',
        category: '',
        description: '',
        is_income: false,
        date: ''
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div>
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='#'>
            Finance App
          </a>
        </div>
      </nav>
      <div className='container'>
        <form onSubmit={handleFormSubmit}>

          <div className='mb-3 mt-3'>
            <label htmlFor='amount' className='form-label'>
              Amount
            </label>
            <input type='text' className='form-control' id='amount' name='amount' onChange={handleInputChange} value={formdata.amount}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='category' className='form-label'>
              Category
            </label>
            <input type='text' className='form-control' id='category' name='category' onChange={handleInputChange} value={formdata.category}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Description
            </label>
            <input type='text' className='form-control' id='description' name='description' onChange={handleInputChange} value={formdata.description}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='is_income' className='form-label'>
              Income? 
            </label>
            <input type='checkbox' id='is_income' name='is_income' onChange={handleInputChange} checked={formdata.is_income}/>
          </div>

          <div className='mb-3 mt-3'>
            <label htmlFor='date' className='form-label'>
              Date
            </label>
            <input type='text' className='form-control' id='date' name='date' onChange={handleInputChange} value={formdata.date}/>
          </div>

          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
        <table className='table table-striped table-bordered table-hover'>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Income?</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transactions) => (
              <tr key={transactions.id}>
                <td>{transactions.amount}</td>
                <td>{transactions.category}</td>
                <td>{transactions.description}</td>
                <td>{transactions.is_income ? 'Yes' : 'No'}</td>
                <td>{transactions.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
