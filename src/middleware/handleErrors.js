const handleErrors = (res, error) => {
    if (error.message === 'Email already exists') {
      return res.status(409).json({ message: 'Email already exists' });
    }
    if (error.message === 'Missing value!') {
      return res.status(422).json({ message: 'Please provide all the required information to create an account.' });
    }

    
    // product========================================================================================
    if (error.message === 'Slug already exists') {
      return res.status(409).json({ message: 'Slug already exists.' });
    }

    if (error.message === 'Product not found.') {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (error.message === 'Category not found.') {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    if (error.message === 'Cart not found or already paid'){
      return res.status(404).json({ error: 'Cart not found or already paid'});
    }
    // category=======================================================================================
    if (error.message === 'Category not found') {
      return res.status(404).json({ message: 'Category not found.' });
    }

    

    // supplier=======================================================================================
    if (error.message === 'Supplier not found') {
      return res.status(404).json({ message: 'Category not found.'});
    }

    if (error.message === 'Missing required field') {
      return res.status(404).json({ message: 'Missing required field.'});
    }

    if (error.message === 'Cart is empty') {
      return res.status(204).json({ message: 'Cart is empty.'});
    }
    
    if (error.message === 'Cart not found') {
      return res.status(404).json({ message: 'Cart not found'});
    }

    console.log(error);
    // handle other errors
    res.status(500).json({ message: 'Something went wrong!' });
}

module.exports = {
  handleErrors,
};