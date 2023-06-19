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
        La temporada 2023 de MotoGP se perfila como una de las más emocionantes y competitivas en 
        la historia del campeonato. Los mejores pilotos del mundo se enfrentarán en una serie de 
        carreras llenas de acción y adrenalina, desafiando los límites de la velocidad y la destreza. 
        Los aficionados pueden esperar batallas épicas en cada circuito, donde los contendientes lucharán 
        sin tregua por el codiciado título mundial. Las motos rugirán en las rectas, las curvas serán 
        desafiantes y los adelantamientos estarán al límite. Cada Gran Premio será un espectáculo 
        inolvidable, con estrategias tácticas, habilidades excepcionales y el rugir ensordecedor de 
        los motores. Los fanáticos presenciarán rivalidades intensas, sorpresas emocionantes y momentos 
        de pura emoción que mantendrán a todos al borde de sus asientos. La temporada 2023 de MotoGP promete 
        regalarnos una competencia sin igual, y los amantes de las carreras de motos no pueden perderse este 
        emocionante capítulo en la historia del deporte de dos ruedas.
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

<style scoped>
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