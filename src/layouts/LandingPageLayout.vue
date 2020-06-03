<template>
  <mu-container class="layout">
    <mu-container id="triangles">
      <img :src="triangles" />
    </mu-container>
    <mu-container class="inside">
      <h1>Kasjopeja</h1>
      <h3>Generator Semestralnego Planu Zajęć WFiIS AGH</h3>
      <br /><br />
      <slot />
    </mu-container>
    <mu-container id="links">
      <a href="https://github.com/orgs/kni-kernel/teams/">
        <img :src="github" alt="Github" />
      </a>
      <a href="https://wiki.wfiis.pl/login">
        <img :src="wiki" alt="WFiIS Wiki" />
      </a>
      <a href="https://www.facebook.com/KNIKernel/">
        <img :src="facebook" alt="Facebook" />
      </a>
    </mu-container>
  </mu-container>
</template>

<script>
import triangles from "../assets/triangles.svg";
import github from "../assets/github.svg";
import wiki from "../assets/wfiis-wiki.svg";
import facebook from "../assets/facebook.svg";

export default {
  name: "LandingPageLayout",
  data() {
    return {
      triangles,
      github,
      wiki,
      facebook
    };
  }
};
</script>

<style scoped>
.layout {
  position: relative;
  height: 100vh;
}

.inside {
  width: 60vw;
  padding: 10% 0 5%;
  margin: auto;
}

.inside h1 {
  font-size: 50px;
  font-weight: normal;
  margin-bottom: 0;
}
.inside h3,
.inside h2 {
  font-size: 20px;
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 20px;
}

#triangles {
  display: inline;
  position: absolute;
  top: 0;
  z-index: -4;
}

#links {
  display: inline;
  position: absolute;
  padding: 15px;
  right: 0;
  bottom: 0;
}

@media only screen and (max-width: 1000px) {
  #triangles {
    display: none;
  }
}
</style>
