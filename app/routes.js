const { ObjectId } = require('mongodb');

const MongoClient = require('mongodb').ObjectID
module.exports = function(app, passport, db) {
// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
      const shoes = [
        {
          brand: 'Nike',
          model: 'Air Force 1',
          colorway: 'White',
          price: 100,
          image_url: 'https://images.footlocker.com/is/image/EBFL2/W2288111_a1?wid=520&hei=520&fmt=png-alpha',
          sizes: [7, 8, 9, 10, 11]
        },
        {
          brand: 'Adidas',
          model: 'Superstar',
          colorway: 'Black/White',
          price: 80,
          image_url: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg',
          sizes: [6, 7, 8, 9, 10]
        },
        {
          brand: 'Jordan',
          model: '1 Retro High',
          colorway: 'Royal Blue/Black',
          price: 160,
          image_url: 'https://m.media-amazon.com/images/I/61GNW4P2O2L.__AC_SY395_SX395_QL70_FMwebp_.jpg',
          sizes: [8, 9, 10, 11, 12]
        },
        {
          brand: 'Converse',
          model: 'Chuck Taylor All Star',
          colorway: 'white/black',
          price: 55,
          image_url: 'https://m.media-amazon.com/images/I/6149X2wAEUL._AC_UL800_FMwebp_QL65_.jpg',
          sizes: [5, 6, 7, 8, 9]
        },
        {
          brand: 'Vans',
          model: 'Old Skool',
          colorway: 'Navy/White',
          price: 65,
          image_url: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTZ0HAMjZeqv08cBauIDIHaXRTbjo3iwRDZMmfWl8GBnSe_XgLWL9BN4OejP00balPX7M07UNumn7IRPrTJTYwgxPPbiG_784KigzsHfSQyZB68wIcQebrIEd-nuLSrvublmVQ&usqp=CAc',
          sizes: [6, 7, 8, 9, 10]
        },
        {
          brand: 'New Balance',
          model: '990v5',
          colorway: 'Grey',
          price: 175,
          image_url: 'https://nb.scene7.com/is/image/NB/m990gl6_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880',
          sizes: [7, 8, 9, 10, 11]
        },
        {
          brand: 'Puma',
          model: 'Clyde',
          colorway: 'Black/White',
          price: 75,
          image_url: 'https://m.media-amazon.com/images/I/71F0TTti8RL._AC_UX695_.jpg',
          sizes: [6, 7, 8, 9, 10]
        },
        {
          brand: 'Reebok',
          model: 'Club C 85',
          colorway: 'White/Green',
          price: 80,
          image_url: 'https://m.media-amazon.com/images/I/71TQe48xt1L.__AC_SY395_SX395_QL70_FMwebp_.jpg',
          sizes: [7, 8, 9, 10, 11]
        },
        {
          brand: 'Under Armour',
          model: 'Curry 8',
          colorway: 'Black/White',
          price: 160,
          image_url: 'https://m.media-amazon.com/images/I/61T142XhUeL._AC_UY695_.jpg',
          sizes: [8, 9, 10, 11, 12]
        },
        {
          brand: 'ASICS',
          model: 'GEL-Kayano 27',
          colorway: 'Blue/Yellow',
          price: 160,
          image_url: 'https://m.media-amazon.com/images/I/616aiPFjRaL.__AC_SX395_SY395_QL70_FMwebp_.jpg',
          sizes: [7, 8, 9, 10, 11]
        }
      ];
      db.collection('cart').find().toArray((err, cart) => {
        if (err) return console.log(err);
          res.render('profile.ejs', {
            shoes,
            total: cart.length
          });
      });
    });
    app.get('/cart', isLoggedIn, function(req, res) {
      const currentUser = req.user.local.email
      db.collection('cart').find({user: currentUser}).toArray((err, cart) => {
        if (err) return console.log(err);
          res.render('cart.ejs', {
          
            cart
          });
      });
    });

    app.delete('/remove', (req, res) => {
      db.collection('cart').findOneAndDelete({_id: ObjectId(req.body._id)}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

    
    

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/shop', (req, res) => {
      db.collection('cart').save({brand: req.body.brand, model: req.body.model, colorway: req.body.colorway, price: req.body.price, size: req.body.size,user: req.user.local.email }, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    app.put('/mall', (req, res) => {
      const _id = objectId(req.body.id)
      db.collection('shoe')
      .findOneAndUpdate({_id}, {
        $set: {
          // thumbUp:req.body.thumbUp + 1
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.delete('/mall', (req, res) => {
      db.collection('shoe').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

    // reviews  ===============================================================

    app.post('/review', (req, res) => {
      db.collection('reviews').save({reviewer: req.body.reviewer, review: req.body.review}, (err, result) => {
        if (err) return console.log(err)
        console.log('review posted!')
        res.redirect('/profile')
      })
    })

    
    
    
// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}






