<template>
  <div class="card">
    <div class="container">
      <h4 style="font-weight:500">{{ data.nome }}</h4> 
      <h6 class="h6" style="color: #C4C4C4">Por <span class="span" style="color:#C95925">Nuno Fahla</span></h6> 
      <p>{{ data.bio }}</p>
      <h6 class="h6" style="color: #C95925">Terminado</h6>
      <h6 class="h6" style="color: #C4C4C4">Última atualização em 10/10/2010</h6>
      <div style="text-align: center">
        <a v-if="!project"  href="" class="button secondary">Ver Detalhes</a>
        
        <a v-if="project" :href="'#/project/'+data.id" class="button">Ver Mais</a>
        <a v-if="project"  href="" class="button secondary disabled">Participar</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    project: Boolean,
    data: Object
  }
}
</script>

<style lang="scss" scoped>
.card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,25);
    transition: 0.3s;
    width: 300px;
    left: 19px;
    top: 600px;

    background: #FFFFFF;
    border-radius: 5px;
    display: inline-block;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 20px 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: normal;
}

.h6, .span {
    font-weight: normal;
}

.parent {
        display: inline-flex;
}

.dot {
        height: 25px;
        width: 25px;
        border-radius: 50%;
        margin-right: -5px;
        color: #FFFFFF;
        font-size: 70%;
}

a.button {
  margin: 0;
}
</style>

