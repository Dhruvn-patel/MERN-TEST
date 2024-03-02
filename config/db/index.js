const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
 const  db_init=async()=>{
  await prisma.$connect();
  console.log('database connected !',)  
 }
 module.exports= {db_init,prisma} 