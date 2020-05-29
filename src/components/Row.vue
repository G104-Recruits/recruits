<template>
  <div class="row">
    <div class="content">
      <div class="icon"><div class="image" v-if="!project" :style="{backgroundImage: 'url('+$root.getUserImage(data)+')'}"></div></div>
      <div class="data">
        <p class="first_line"><span class="name">{{ data.nome }}</span><span class="qualifications">{{ subheader }}</span></p>
        <p class="desc">{{ data.bio }}</p>
        <a :href="'#/user/'+data.id" class="button" v-if="!project">Ver Mais</a>
        <a :href="'#/project/'+data.id" class="button" v-if="project">Ver Mais</a>
        <a :href="''+data.id" class="button secondary disabled" v-if="project">Participar</a>
        <span class="users" v-if="project">
          <span class="user" v-for="user in data.users" :key="user" :style="{backgroundImage: 'url('/*+user.image*/+')'}"></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Row",
  props: {
    project: Boolean,
    data: Object
  },
  computed: {
    subheader: function() {
      if (this.project)
        return '';/*
      else
        return this.data.qualifications.join(', ');*/
    }
  }
}
</script>

<style lang="scss" scoped>
div.row {
  width: 100%;
  text-align: center;
  box-shadow: 2px 2px 10px rgba(0,0,0,.25);

  div.content {
    width: 100%;
    max-width: 700px;
    display: inline-block;
    text-align: left;

    font-family: sans-serif;
    padding: 20px;

    & > div {
      display: table-cell;
      vertical-align: top;
      padding: 10px;

      &.icon {
        div.image {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          
          background-size: cover;
        }
      }

      &.data {
        p {
          &.first_line {
            margin-right: 10px;
            padding-top: 10px;

            span {
              margin-right: 10px;

              &.name {
                font-weight: 500;
                font-size: 25px;
              }

              &.qualifications {
                color: #DF9B7C;
              }
            }
          }
        }

        span.users {
          white-space: nowrap;
          float: right;
          position:  relative;
          top: -8px;

          span.user {
            display: inline-block;
            border-radius: 50%;
            background-color: #123456;
            width: 30px;
            height: 30px;
            box-shadow: 2px 2px 10px rgba(0,0,0,.25);

            margin-right: -10px;
            background-size: cover;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>