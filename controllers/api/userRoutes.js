const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
   try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
   });

   req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.email = userData.email;
    req.session.loggedIn = true;

    res.json(userData);});
   } catch (err) {
    console.log(err);
    res.status(500).json(err);
   }
  
});

router.post('/login', async (req, res) => {
  try {
    userData = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!userData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

    
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  } 
 });

 router.post('/logout', withAuth, (req, res) => {
   if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }else {
      res.status(404).end();
    }
});

module.exports = router;