<template>
  <div class="about">
    <vue-headful title="Usage - OneGuy Cinematics" />
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Usage</h1>
        </div>
      </div>
    </section>
    <section id="og-intro" class="wrapper container">
      <div class="columns is-centered about">
        <div class="column is-5 channel">
          <p>
            To put it right upfront, all cinematics you find on this site are
            100% free to use in commercial and non-commercial projects. <br />
            <br />
            I would appreciate a link back to the oneguy.io site but it is not
            required.
          </p>
        </div>
      </div>
    </section>

    <div class="section-dark"></div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  padding-top: 52px;
  background-color: $light-300;
}
.wrapper {
  min-height: 80vh;
  padding-top: 4rem;
}
.about {
  .column {
    padding: 20px;
  }
  .channel {
    p {
      span {
        font-weight: 600;
      }
    }
  }
}

.creator {
  margin-top: 50px;
  border-radius: 7px;
  padding: 50px;
}

.section-dark {
  padding-top: 60px;
  background-color: white;
}
.section-intro {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.28);
  margin-bottom: 60px;
}

.intro {
  padding: 20px;
}

#og-intro {
  padding: 60px;
}

.card {
  border-radius: 7px;
}
.about-title {
  padding: 1rem;
  color: white !important;
  font-size: 2.5rem;
  text-shadow: 0px 0px 1px #000;
}
.card-content .content {
  border-radius: 3px;
  h4 {
    font-size: 2rem;
  }
}
.card-content .content p {
  font-size: 1.2rem;
}

.about-title {
  letter-spacing: 2px !important;
  span {
    color: $primary;
  }
}
</style>
