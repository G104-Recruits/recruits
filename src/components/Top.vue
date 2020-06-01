<template>
  <div class="profiletop">
    <div class="action">
      <div class="image" v-if="!project" :style="{backgroundImage: 'url('+$root.getUserImage(data)+')'}"></div>
      <a v-if="!project" :href="$root.getLigacao('GitHub', data)" target="_blank" class="button secondary">GitHub</a>
      <a class="button secondary" v-if="!project && diffUser" v-on:click="btnClickConvidar()">Convidar</a>
      <a class="button secondary" v-if="!project && !diffUser" v-on:click="btnClickConvites()">Convites</a>
      <a class="button secondary" v-if="project" v-on:click="btnClickPedidos()">Pedidos</a>
    </div>
    <div class="info">
      <h1>{{data.nome}}</h1>
      <p class="desc">{{data.bio}}</p>

      <ul v-if="!project">
        <li><b>Criou</b> {{ data.proprietario }} <b>projetos</b></li>
        <li><b>Participa em</b> {{ data.participa }} <b>projetos</b></li>
        <li><b>Criado em</b> {{ data.dataCriacao }}</li>
      </ul>

      <ul v-if="project">
        <li><b>Número de participantes:</b> {{ privdata.colabs.length }}</li>
        <li><b>Número de Tasks por Concluir:</b> {{ privdata.tasks.length }}</li>
        <li><b>Última task concluída:</b> {{ data.dataCriacao }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",
  props: {
    data: Object,
    privdata: Object,
    project: Boolean,
    diffUser: Boolean,
    btnClickConvidar: Function,
    btnClickConvites: Function,
    btnClickPedidos: Function
  }
}
</script>

<style lang="scss" scoped>
div.profiletop  {
  display: table;
  background-color: #E1E1E1;
  width: 100%;
  vertical-align: top;
  padding: 35px 45px;
  box-sizing: border-box;

  & > div  {
    display: table-cell;
    vertical-align: top;
  }

  div.action {
    text-align: center;
    width: 150px;

    div.image {
      border-radius: 50%;
      width: 150px;
      height: 150px;

      background-size: cover;
      background-image: url(https://img.freepik.com/vetores-gratis/imagens-animadas-abstratas-neon-lines_23-2148344065.jpg?size=626&ext=jpg.jpg);
    }

    a.button {
      margin: 0;
      margin-top: 20px;
      display:  inline-block;
      width: 100%;
      box-sizing: border-box;
    }
  }

  div.info {
    text-align: left;
    padding-left: 100px;
    padding-right: 10%;

    h1 {
      margin: 0;
    }

    p.desc {
      color: #535353;
    }

    ul {
      padding: 0;
      list-style: none;
      color: #535353;

      li {
        &::before {
          content: "\1F890";
          transform: scaleX(-2);
          font-size: 20px;
          color: #C95925;
          margin-right: 10px;
          display:inline-block;
        }

        b {
          color: black;
        }
      }
    }
  }
}
</style>