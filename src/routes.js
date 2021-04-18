const express=require("express");
const routes=express.Router();

const cards=[
    {
        title:"Entradas",
        img:{
            url:"./assets/income.svg",
            alt:"Imagem entradas"
        },
        class:"incomeDisplay",
    },
    {
        title:"Saídas",
        img:{
            url:"./assets/expense.svg",
            alt:"Imagem saídas"
        },
        class:"expanseDisplay",
    },
    {
        title:"Total",
        img:{
            url:"./assets/total.svg",
            alt:"Imagem total"
        },
        class:"totalDisplay",
    }
]


routes.get("/",(_,res)=>{
    res.render("index", {cards});
});

module.exports=routes;