<script>
import TwitterFeed from '../components/TwitterFeed.vue'
import Clasificacion from '../components/Clasificacion.vue';
import SiguienteCarrera from '../components/SiguienteCarrera.vue';
export default {
  components: {
    TwitterFeed,
    Clasificacion,
    SiguienteCarrera
  }
};
</script>

<template>
  <div class="indexcontainer">
    <div class="leftcontainer">
    <div class="siguienteCarrera">
      <SiguienteCarrera/>
    </div>
    <div class="news">
      <h1 class="indextitle">MotoGP Temporada 2023</h1>
      <img src="../assets/grid2023.webp" class="grid2023"/>
      <p class="indexparagraph">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium orci sem, 
        vitae posuere nibh pellentesque a. Integer ultricies mollis neque, a commodo mauris 
        consequat lobortis. Nam nec malesuada ante. Aliquam erat volutpat. Quisque fringilla felis 
        mauris, id consectetur felis pulvinar vel. Sed arcu odio, dictum eu molestie et, pharetra et ante. 
        Nunc vel diam sapien.

        Mauris ex eros, tempus at euismod et, pellentesque nec lacus. Nam tincidunt vestibulum enim, ac 
        efficitur dui interdum non. Quisque sed congue nulla. Nullam in eros in felis tincidunt imperdiet. 
        Suspendisse potenti. Praesent in nibh diam. Nullam sagittis vel dui ut gravida. Phasellus mi urna, 
        convallis vitae leo ac, ornare porttitor tortor. Suspendisse sed ante vitae quam rutrum posuere. Donec 
        pellentesque pretium lacus. Aenean elementum sollicitudin finibus. Etiam ut pharetra erat.

        Vivamus auctor turpis sit amet dapibus ornare. Integer id aliquet erat, id tincidunt tortor. Donec ultrices 
        commodo hendrerit. Curabitur enim nisl, tristique commodo tellus sit amet, gravida sollicitudin felis. Aenean 
        finibus elementum nibh, et euismod neque posuere vitae. Pellentesque habitant morbi tristique senectus et netus 
        et malesuada fames ac turpis egestas. Integer nec tempor augue, eu placerat purus.
      </p>
    </div>
    </div>
    <div class="rightcontainer">
      <div class="liveChampionship">
        <Clasificacion/>
      </div>
      <div class="twitterFeed">
        <TwitterFeed/>
      </div>
    </div>
  </div>
</template>

<style>
.indextitle{
  font-size: 2.5rem;
}
.leftcontainer{
  width: 60%;
  margin-top: 20px;
}
.indexcontainer{
  padding: 2rem;
  display: flex;
  justify-content: space-around;
  background-color: #a4a4a4;
  
}


.news{
  width: 100%;
  text-align: center;
}

.rightcontainer{
  width: 25%;
  margin-top: 20px;
  
}
.grid2023{
  width: 100%;
  margin-top: 20px;
}
.indexparagraph{
  margin-top: 30px;
  font-size: 20px;
}

@media (max-width: 1200px) {
  .indexcontainer {
    flex-direction: column;
  }
  .leftcontainer{
    width: 100%;
  }
  .rightcontainer{
    width: 100%;
  }
}
</style>