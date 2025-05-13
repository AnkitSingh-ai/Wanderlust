const User = require('../models/user');


module.exports.rendersignup = (req, res) => {
    res.render('./users/signup.ejs', { title: 'Sign Up' });
}

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        if (!username) {
            req.flash('error', 'Username is required!');
            return res.redirect('/users/signup');
        }
        let newUser = new User({username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                req.flash('error', 'Login failed!');
                return res.redirect('/users/signup');
            }
            req.flash('success', 'Successfully registered!');
            res.redirect('/listings');
        });
    }
    catch (err) {
        req.flash('error', err.message);
        res.redirect('/users/signup');
    }
}

module.exports.renderLoginform = (req, res) => {
    res.render('./users/login.ejs', { title: 'Login' });
}

module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.redirectUrl || '/listings';
    delete req.session.redirectUrl; // Clear the redirect URL
    res.redirect(redirectUrl);
};
module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.redirect('/listings');
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/listings');
    });
}

