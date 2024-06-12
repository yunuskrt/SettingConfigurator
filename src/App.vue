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
</style>
