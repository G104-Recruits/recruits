<template>
  <div class="home">
    <div class="top">
      <h1>ENCONTRE O PROJETO IDEAL</h1>
      <p>Pesquise por nome aqui ou vá à página de <a href="">busca avançada</a></p>
  	  <div class="search">
        <input type="text">
        <a href="" class="button"><font-awesome-icon icon="search" size="sm" />Procurar</a>
      </div>
      <div class="divider">
        <span class="line"></span>
        <span class="text">OU</span>
      </div>
      <a href="" class="button fill">CRIE UM PROJETO</a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
div.home {
  text-align: center;
}

div.top {
  display: inline-block;
  text-align:left;
  width: 70%;
  min-width: 500px;
  padding: 100px 0;

  & > * {
    margin: 5px 0;
  }
  
  p {
    color: #696969;
    font-weight: 600;

    a {
      color: #C95925;
      text-decoration: none;
    }
  }

  div.search {
    width: 100%;
    display: flex;
    font-size: 16px;

    & > * {
      box-sizing: border-box;
      padding-top: 15px;
      padding-bottom: 15px;
    }

    &:focus-within {
      box-shadow: 2px 2px 10px rgba(0,0,0,.25);
    }

    input[type='text'] {
      border: 0;
      background-color: #E1E1E1;
      float: left;
      border-radius: 3px 0px 0px 3px;
      padding-left: 15px;
      padding-right: 15px;
      flex-grow: 1;
      outline: 0;
    }

    a.button {
      border-radius: 0px 3px 3px 0px;
      float: right;
      margin: 0;
      box-shadow: none;

      svg {
        margin-right: 15px;
      }
    }
  }

  div.divider {
    height: 20px;
    position: relative;
    margin: 100px 0;
    transform: translate(0, -50%);

    span.line {
      display: inline-block;
      width: 100%;
      height: 100%;
      border-bottom: 1px solid #E1E1E1;
    }

    span.text {
      position: absolute;
      top: 50%;
      left: 50%;
      display: table-cell;
      height: 100%;
      background-color: white;
      width: 10%;
      text-align: center; 
      transform: translate(-50%, 10%);
      color: #696969;
    }
  }

  a.button.fill {
    display: inline-block;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    margin: 0;
    padding: 15px 0;
  }
}
</style>