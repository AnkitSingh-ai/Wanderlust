const express = require('express');
const router = express.Router();

// About Us Page
router.get('/about', (req, res) => {
    res.render('pages/about');
});

// Help Center Page
router.get('/help', (req, res) => {
    res.render('pages/help');
});

// Contact Us Page
router.get('/contact', (req, res) => {
    res.render('pages/contact');
});

// FAQ Page
router.get('/faq', (req, res) => {
    res.render('pages/faq');
});

// Safety Page
router.get('/safety', (req, res) => {
    res.render('pages/safety');
});

// Careers Page
router.get('/careers', (req, res) => {
    res.render('pages/careers');
});

// Press Page
router.get('/press', (req, res) => {
    res.render('pages/press');
});

// Blog Page
router.get('/blog', (req, res) => {
    res.render('pages/blog');
});

// Privacy Policy Page
router.get('/privacy', (req, res) => {
    res.render('pages/privacy');
});

// Terms of Service Page
router.get('/terms', (req, res) => {
    res.render('pages/terms');
});

// Cookie Policy Page
router.get('/cookies', (req, res) => {
    res.render('pages/cookies');
});

module.exports = router;
