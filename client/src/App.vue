<template>
    <router-view />
</template>

<style>
#app{
  color: #d2d2d5;
}
body{
  background-color: #1e1e2c;
}

.auth-form-container{
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-input{
  padding: 10px;
  outline: none;
  border: 1px solid #33335a;
  width: 100%;
  box-sizing: border-box;
  background: transparent;
  color: #d2d2d4;
}
.form-input:focus {
  border: 1px solid #df5ed2;
}

.form-input::placeholder {
  color: #d2d2d4;
}

.form-input:hover {
  cursor: pointer;
}
.form-link-container {
  color: #6b7279;
}

.form-link-container a {
  text-decoration: none;
  color: #6b7279;
  font-weight: bold;
}
.date-header {
  cursor: pointer;
  display: flex;
  gap: 7px;
}
 .not-found {
   display: flex;
   justify-content: center;
   align-items: center;
   height: 90vh;
   font-size: 1.5rem;
   font-weight: bold;
 }

 .table-container {
   width: 100%;
   overflow-x: auto;
   margin-top: 1%;
 }
 table {
   width: 100%;
 }
 th,td {
   text-align: left;
 }
 th {
   color: #7a899f;
   font-size: 22px;
   font-weight: normal;
 }

 .input-group label {
   font-weight: bold;
 }
 .mobile-card {
   display: flex;
   flex-direction: column;
   gap: 10px;
   border-radius: 20px;
   border: 1px solid #ddd;
   padding: 15px
 }

 .mobile-card span {
   font-weight: bold;
 }

 .desktop-row td,
 th {
   padding: 20px;
 }

 .mobile-row td {
   padding: 5px 20px;
 }

 .link-item:hover {
   color: #7a899f;
   cursor: pointer;
 }

 .modal-input-container {
   display: flex;
   flex-direction: column;
   gap: 10px;
 }

 .modal-input {
   padding: 10px;
   box-sizing: border-box;
   outline: none;
   border: 1px solid #ddd;
   border-radius: 5px;
   width: 100%;
 }
</style>
