const express =require('express');
const json=require('body-parser');
const cors=require('cors');
const mysql=require('mysql2'); 

const app=express();
app.use(json());
app.use(cors());

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Nisha123#',
    database:'store'

})
db.connect((err)=>{
     if(err)
     {
        console.log(err);
         console.log("database not connected");
     }
     else
     {
         console.log("Database connected")
     }
})

app.post("/store/saveuser",(req,res)=>{
     const{name,email,password,address,role}=req.body;
     db.query('insert into  register(name,email,password,address,role) values(?,?,?,?,?)',[name,email,password,address,role],(err,result)=>{
        if(err)
        {
            res.status(500).send('Error saving user');
        }
        else
        {
            res.status(200).send('user saved succefully');
        }
     })
});

app.post("/store/validate",(req,res)=>{
     const{email,password}=req.body;
     console.log(email);
     console.log(password);
     db.query('select * from register where  email=? and password=?',[email,password],(err,result)=>{
         if(err)
         {
             res.status(500).send('Error validating user');
            
         }
        if(result.length>0)
        {
            res.status(200).json(result[0]);
        }
        else
        {
            res.status(400).send('user not found');
        }
     })
})

app.post('/store/savestore',(req,res)=>{
     const{name,email,address}=req.body;
     db.query('insert into store(name,email,address,rating) values(?,?,?,?)',[name,email,address,'5'],(err,result)=>{
        if(err)
        {
             res.status(500).send('Error saving store');
        }
        else{
             res.status(200).send('Store saved');
        }
     })
})

app.post('/store/getusers',(req,res)=>{
      db.query('select * from register',(err,result)=>{
         if(err)
         {
             res.status(500).send('problem getting users');
         }
         else{
             res.status(200).json(result);
         }
      })
})

app.post('/store/getstore',(req,res)=>{
    db.query('select * from store',(err,result)=>{
       if(err)
       {
           res.status(500).send('problem getting store');
       }
       else{
           res.status(200).json(result);
       }
    })
})

app.post('/store/totalusers',(req,res)=>{
    db.query('select count(id) from register',(err,result)=>{
       if(err)
       {
           res.status(500).send('problem getting count');
       }
       else{
           res.status(200).json(result);
       }
    })
})
app.post('/store/totalstores',(req,res)=>{
    db.query('select count(id),count(rating) from store',(err,result)=>{
       if(err)
       {
           res.status(500).send('problem getting count');
       }
       else{
           res.status(200).json(result);
       }
    })
})

app.post('/store/rating',(req,res)=>{
    const{rate,name}=req.body;
    db.query('select * from store where name=?',[name],(err,result)=>{
        if(err)
        {
            res.status(500).send('problem saving');
        }
        else{
            const {email,address}=result[0];
            db.query('insert into store(rating,name,address,email) values(?,?,?,?)',[rate,name,address,email],(err,result)=>{
                if(err)
                {
                    res.status(500).send('problem saving!!!');
                }
                else{
                    res.status(200).json(result);
                }
             })
        }
     })
    
})
app.post('/store/updatepass',(req,res)=>{
    const{email,pass}=req.body;
    db.query('update register set password=? where email=?',[pass,email],(err,result)=>{
       if(err)
       {
           res.status(500).send('problem setting password');
       }
       else{
           res.status(200).json(result);
       }
    })
})

app.listen(3001,()=>{
       console.log("server running on port 3001")
})


