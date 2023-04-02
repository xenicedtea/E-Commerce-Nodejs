let excludePassword = async (user) => {
    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

module.exports = {
    excludePassword
}