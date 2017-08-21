var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
//var Comment = mongoose.model('Comment');


var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* homepage */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'imgurian'
    });
});

/** Preload user object */
router.param('user', function(req, res, next, username) {
    var query = User.findOne({username: username}, 'username');
    query.exec(function(err, user) {
        if(err) {
            return next(err);
        }
        if(!user) {
            return next(err);
        }
        req.user = user;
        return next();
    });
});

/** Preload post object */
router.param('post', function(req, res, next, id) {
    var query = Post.findOne({_id: id}, 'title imageUrl author upvotes');
    query.exec(function(err, post) {
        if(err) {return next(err);}
        if(!post) {return next(err);}
        req.post = post;
        return next();
    });
});

/** login to your account */
router.post('/login', function(req, res, next) {
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Please fill in all fields'});
    }
    passport.authenticate('login', function(err, user, info) {
        if(err){ return next(err); }
        if(user) {
            return res.json({token: user.generateJWT()});
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

/** register a new account */
router.post('/register', function(req, res, next) {
    console.log("Register query: ", req.query.tagId);
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Please fill in all fields'});
    } else if(req.body.username.indexOf(' ') >= 0) {
        return res.status(400).json({message: 'Don\'t use spaces in the username'});
    } else if(req.body.username.length > 15){
        return res.status(400).json({message: 'Maximum size for a username is 15 characters'});
    } else if(req.body.username.length < 3){
        return res.status(400).json({message: 'Minimum size for a username is 3 characters'});
    } else if (req.body.password !== req.body.password2 ) {
        return res.status(400).json({message: 'Passwords don\'t match'});
    }

    User.findOne({ 'username' :  req.body.username }, function(err, user) {
        if (err)
            return done(err);

        if (user) {
            return res.status(400).json({message: 'Username already exists'});
        } else {
            var newUser = new User();
            newUser.username = req.body.username;
            newUser.setPassword(req.body.password);
            newUser.save(function(err) {
                if(err) { return next(err); }
                return res.json({token: newUser.generateJWT()});
            });
        }
    });

});

//Posts

/** Get all posts */
router.get('/posts', function(req, res, next) {
    Post.find(function(err, posts) {
        if(err) return next(err);
        res.json(posts);
    });
});

/** Get posts from a certain number and sorted */
router.get('/load-posts/from/:postsCount/limit-to/:limit/sort-by/:sortField/:order', function(req, res, next) {
    var postsCount = parseInt(req.params.postsCount);
    var limit = parseInt(req.params.limit);
    var sortField = req.params.sortField;
    var order = req.params.order;
    var sortObj = {};
    if( order === 'ascending') {
        sortObj[sortField] = 1;
    } else {
        sortObj[sortField] = -1;
    }
    Post
        .find({})
        .sort(sortObj)
        .skip(postsCount)
        .limit(limit)
        .exec(function(err, posts) {
            if(err) {
                return next(err);
            }
            res.json(posts);
        });
});

/** create a new post */
router.post('/posts', auth, function(req, res, next) {
    var post = new Post(req.body);
    post.title = req.body.title;
    post.author = req.payload.username;

    post.save(function(err, post) {
        if(err) return next(err);
        res.json(post);
    });
});

/** delete one of your posts */

router.delete('/post/:post', auth, function(req, res, next){
  if (req.post.author != req.payload.username){
    return res.status(500).json({message: 'You can only delete your own posts!'});
  }
  req.post.remove(function(err, post){
    if (err) { return next(err); }

    res.send("success");
  });
});

/** upvote a post */

router.put('/post/:post/upvote', auth, function(req, res, next) {
  if (req.post.author == req.payload.username){
    return res.status(500).json({message: 'You can not upvote your own post!'});
  }
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

/** downvote a post */
router.put('/post/:post/downvote', auth, function(req, res, next) {
  if (req.post.author == req.payload.username){
    return res.status(500).json({message: 'You cannot downvote your own post!'});
  }
  req.post.downvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

module.exports = router;
