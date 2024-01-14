const express=require('express');
const app=express();
const path=require("path")
const mongoose=require("mongoose");
const user=require("./model/user");
const blog=require("./model/blog");
const Admin=require("./model/admin");
const nodemailer=require('./model/nodemailer');
const multer=require('multer');
const session=require('express-session');
app.use(express.static('public'));
const hbs=require('hbs');
const fs=require('fs');

app.use(express.static(path.join(__dirname,"static")))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine', 'hbs');
app.use(session({
    secret: 'keyboard cat',
}))
app.use('/uploads',express.static(path.join(__dirname,'public','uploads')));
hbs.registerPartial('navbar',fs.readFileSync(path.join(__dirname,'/views/partials/navbar.hbs'),'utf8'));

const storage=multer.diskStorage({
    destination:'./public/uploads/',
    filename:function(req,file,cb){
        cb(null,file.fieldname+ '-'+Date.now()+path.extname(file.originalname));
    },
});
const upload=multer({
    storage:storage,
    limits:{fileSize:10000000},
})
function checkIsLoggedIn(req,res,next){
    if(req.path!== '/addblog'){
        next();
    }
    else{
        if(req.session.isLoggedin){
            next();
    }
        else{
            res.redirect("/login");
        }
    }
}
function checkIsAdminLoggedIn(req,res,next){
    if(req.session.isAdminLoggedIn ){
        next();
    }
    else{
        res.redirect('/admin/login');
    }
}
async function sendVerificationEmail(userEmail){
    try{
        const verificationLink=`http://localhost:4444/verify/${userEmail}`;
        await nodemailer.sendMail({
            from:'prabhakarvaaneesh@gmail.com',
            to:userEmail,
            subject:'Email Verification',
            text:`Click here to verify your email: ${verificationLink}`,
            html:`Click here to verify your email: <a href="${verificationLink}">${verificationLink}</a>`,
        });
        console.log("Email sent");
    }
    catch(err){
        console.log(err);
    }
}
async function sendApprovalEmail(userEmail,blogTitle){
    try{
        const subject='Your Blog have been approved!';
        const text=`Congratulations! Your blog "${blogTitle}" has been approved by the admin`;
        const html=`<p>Congratulations! your blog "<strong>${blogTitle}</strong>" has been approved</p>`;

        await nodemailer.sendMail({
            from: 'prabhakarvaaneesh@gmail.com',
            to:userEmail,
            subject:subject,
            text: text,
            html:html
        });
        console.log("Approval Email sent");
    }
    catch(err){
        console.log(err);
    }
}
app.get("/",(req,res)=>{
    res.render("home",{user:req.session.user});
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/register",(req,res)=>{
    res.render("register");
})
app.post("/register",async(req,res)=>{
    const {username,password,email}=req.body;
    try{
        const newUser=new user({
            username,
            password,
            email,
            isVerified:false,
        });
        await newUser.save();
        await sendVerificationEmail(email);
        res.render('register',{registrationSuccess:true});
    }
    catch(err){
        console.log(err);
    }
})
app.get('/verify/:userEmail',async(req,res)=>{
    const {userEmail}=req.params;
    try{
        const foundUser=await user.findOne({email:userEmail});
        if(foundUser){
            foundUser.isVerified=true;
            await foundUser.save();
            console.log("Email verified");
            res.redirect('/login');
        }
        else{
            res.send("User not found");
        }
    }
    catch(err){
        console.log(err);
    }
})
app.get('/resend-verification',async(req,res)=>{
    try{
        const userEmail=req.session.userEmail;
        if(!userEmail){
            res.send("User email not available");
        }
        await sendVerificationEmail(userEmail);
        res.send('Verification email resent successfully');
    }
    catch(err){
        console.log(err);
    }
})
app.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    let Founduser=await user.findOne({username:username})
    if(Founduser){
        if(Founduser.password!=password){
            res.send("Invalid password");
        }else{
            req.session.isLoggedin=true;
            req.session.user=Founduser;

            const admin=await Admin.findOne({username});
            if(admin && admin.password===password){
                Founduser.isAdmin=true;
                Founduser.isAdminLoggedIn=true;
                req.session.isAdminLoggedIn=true;
            }
            console.log('isAdmin:', Founduser.isAdmin);
            console.log('isAdminLoggedIn:', Founduser.isAdminLoggedIn);
            console.log('isAdminLoggedIn:', req.session.isAdminLoggedIn);

            res.redirect("/");
        }
    }else{
        res.send("user not found!!!");
    }
})
app.post("/addblog",checkIsLoggedIn,upload.single('image'),async(req,res)=>{
    const {title,content}=req.body;
    const authorEmail=req.session.user.email;
    let newBlog=new blog({
        title,
        content,
        user:req.session.user._id,
        isApproved:req.session.user.isAdmin,
        userEmail:authorEmail,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await newBlog.save();
    let userrr=await user.findOne({_id:req.session.user._id});
    userrr.blog.push(newBlog._id);
    await userrr.save();
    if(req.session.user.isAdmin){
        res.send("Admin Blog Added Successfully");
    }
    else{
        res.send("Blog Submmited for Approval by Admin");
    }
})
app.get("/myblog",checkIsLoggedIn,async(req,res)=>{
    if(req.session.user && req.session.user._id){
        let User1=await user.findById(req.session.user._id).populate("blog");
        const approvedblogs=User1.blog.filter(blog=>blog.isApproved === true);
        console.log(User1);
        res.render("myblog",{blogs:approvedblogs,user:req.session.user});
    }
    else{
        res.redirect('/login');
    }

})
app.get("/blogs",async(req,res)=>{
    const blogs=await blog.find({isApproved:true}).populate("user");
    console.log(blogs);
    res.render("allblogs",{blogs,user:req.session.user});
})
app.get("/confirm-delete",checkIsLoggedIn,async(req,res)=>{
    res.render("Delete");
})
app.post("/delete-account",checkIsLoggedIn,async(req,res)=>{
    const Id=req.session.user._id;
    await user.findByIdAndDelete(Id);
    req.session.destroy((err)=>{
        if(err)
        console.log(err);
        res.send("Done");

    })
})
app.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err)
        console.log(err);
    res.redirect("/");
    })
})
app.get("/delete-blog/:blogId",checkIsLoggedIn,async(req,res)=>{
    const BId=req.params.blogId;
    try{
        const foundBlog=await blog.findById(BId);
        if(foundBlog.user.equals(req.session.user._id)){
            await blog.findByIdAndDelete(BId);
            await user.findByIdAndUpdate(req.session.user._id,{
                $pull:{blog:BId}
            });
            res.redirect("/myblog");
        }
        else{
            res.send("Permission Denied");
        }
    }
    catch(err){
        console.log(err);
        res.redirect("/myblog");
    }
})
app.get('/admin/register',(req,res)=>{
    res.render('AdminRegister');
})
app.post('/admin/register',async(req,res)=>{
    const{username,password}=req.body;
    try{
        const newAdmin=new Admin({username,password});
        await newAdmin.save();
        res.send('Admin registered successfully');
    }
    catch(err){
        console.log(err);
    }
})
app.get('/admin/login',(req,res)=>{
    res.render('AdminLogin');
})
app.post('/admin/login',async(req,res)=>{
    const{username,password}=req.body;
    try{
        const admin=await Admin.findOne({username});
        if(admin && admin.password===password){
            req.session.isAdminLoggedIn=true;
            req.session.admin=admin;
            res.redirect('/admin/dashboard');
        }
        else{
            res.send('Invalid admin credentials');
        }
    }
    catch(err){
        console.log(err);
    }
})
app.get('/admin/dashboard',checkIsAdminLoggedIn,async(req,res)=>{
    try{
        const pendingBlogs=await blog.find({isApproved:false}).populate('user');
        res.render('AdminDashboard',{pendingBlogs});
    }
    catch(err){
        console.log(err);
    }
})
app.post('/admin/approve-blog/:blogId',checkIsAdminLoggedIn,async(req,res)=>{
    const blogId=req.params.blogId;
    try{
        const foundBlog=await blog.findById(blogId).populate('user');
        await blog.findByIdAndUpdate(blogId,{isApproved:true});
        const userEmail=foundBlog.user.email;
        await sendApprovalEmail(userEmail,foundBlog.title);
        res.redirect('/admin/dashboard');
    }
    catch(err){
        console.log(err);
    }
})
app.post('/admin/deny-blog/:blogId',checkIsAdminLoggedIn,async(req,res)=>{
    const blogId=req.params.blogId;
    try{
        await blog.findByIdAndDelete(blogId);
        res.redirect('/admin/dashboard');
    }
    catch(err){
        console.log(err);
    }
})
app.get('/edit-blog/:blogId',checkIsLoggedIn,async(req,res)=>{
    const blogId=req.params.blogId;
    try{
        const foundBlog=await blog.findById(blogId);
        if(foundBlog.user.equals(req.session.user._id)){
            res.render('editBlog',{blog:foundBlog,user:req.session.user});
        }
        else{
            res.send("Permission denied");
        }
    }
    catch(err){
        console.log(err);
    }
})
app.post('/edit-blog/:blogId',checkIsLoggedIn,async(req,res)=>{
    const blogId=req.params.blogId;
    const{title,content}=req.body;
    try{
        const foundBlog=await blog.findById(blogId);
        if(foundBlog.user.equals(req.session.user._id)){
            foundBlog.title=title;
            foundBlog.content=content;
            foundBlog.isApproved=false;
            if(req.session.user.isAdmin){
                foundBlog.isApproved=true;
            }
            await foundBlog.save();
            const adminEmail='prabhakarvaaneesh@gmail.com';
            const editApprovalLink=`http://localhost:4444/admin/dashboard`;
            // await sendApprovalRequestEmail(adminEmail,foundBlog.title,editApprovalLink);
            if(req.session.user.isAdmin){
                res.send("Admin Blog Edited Successfully")
            }
            else{
                res.send('Blog edited successfully and sent for approval');
            }
        }
    }
    catch(err){
        console.log(err);
    }
})
mongoose.connect("mongodb://127.0.0.1:27017/g26Session").then(()=>{
    app.listen(4444,()=>{
        console.log("Server started at port 4444");
    })
})


