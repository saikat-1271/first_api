const express = require('express');
const app = express();
// app.set('view engine', 'ejs');
const mysql=require('mysql');

const db=mysql.createConnection({
   host:"localhost",
   user:"sk",
   password:"sk",
   database:"library"
});

db.connect((err)=>{
   if(err) throw err;
   console.log("connected");
})

app.listen(3000,()=>{
   console.log("start");
});

app.use(express.json());





// show all data---------------------------------


app.get('/students', function (req, res) {
   let sql=`select * from student`;
   db.query(sql,(err,result)=>{
      if(err) throw err;
      res.send(result);
   })
});
app.get('/books', function (req, res) {
   let sql=`select books.bName, student.fname, student.lname from books join student where books.sid=student.sid`;
   db.query(sql,(err,result)=>{
      if(err) throw err;
      res.send(result);
   })
});

// --------------------------------------

app.get('/', function (req, res) {
   res.send('home');
});





// insert data------------------------------------

app.post('/insert_student', function (req, res) {
   let id=req.body.id;
   let fname=req.body.fName;
   let lname=req.body.lName;
   let sql=`INSERT INTO student values(?,?,?)`;
   db.query(sql,[id,fname,lname],(err,res)=>{
      if(err) {
         console.log(err);
      }
      else{
         console.log("data added");
      }
   })
});

app.post('/insert_book', function (req, res) {
   let id=req.body.id;
   let bName=req.body.bName;
   let sid=req.body.sid;
   let sql=`INSERT INTO books values(?,?,?)`;
   db.query(sql,[id,bName,sid],(err,res)=>{
      if(err) {
         console.log(err);
      }
      else{

         console.log("data added");
      }
   })
});

// ----------------------------------------------



// book per student--------------------------------------

app.get('/student_books', function (req, res) {
   let id= req.body.id;
   let sql=`select * from books where sid=?`;
   db.query(sql,[id],(error,result)=>{
      if(error) {
         console.log(err);
      }
      else{
         res.send(result);
      }
   })
});

// -------------------------------------

// deleting -----------------------------------
app.post('/delete_book', function (req, res) {
   let id=req.body.id;
   let bName=req.body.bName;

   if(id!==undefined || bName!==undefined){
      if(id===undefined){
         let sql=`DELETE FROM books WHERE bname=?`;
         db.query(sql,[bName],(error,result)=>{
            if(error) res.send(error);
            console.log("Deleted");
         })
      }
      else{
         let sql=`DELETE FROM books WHERE bid=?`;
         db.query(sql,[id],(error,result)=>{
            if(error) res.send(error);
            console.log("Deleted");
         })
      }
   }
});



app.post('/delete_student', function (req, res) {
   let sid=req.body.sid;
   let sql=`DELETE FROM student WHERE sid=?`;
         db.query(sql,[sid],(error,result)=>{
            if(error) res.send(error);
            console.log(result);
         })
});
