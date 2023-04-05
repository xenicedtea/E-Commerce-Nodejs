const handleErrors = (res, error) => {
    if (error.message === 'Email already exists') {
      return res.status(409).json({ message: 'Email already exists' });
    }
    if (error.message === 'Missing value!') {
      return res.status(422).json({ message: 'Please provide all the required information to create an account.' });
    }

    // product
    if (error.message === 'Slug already exists') {
      return res.status(409).json({ message: 'Slug already exists.' });
    }

    // category
    if (error.message === 'Category not found') {
      return res.status(404).json({ message: 'Category not found.' });
    }

    console.log(error);
    // handle other errors
    res.status(500).json({ message: 'Something went wrong!' });





}

module.exports = {
  handleErrors,
};