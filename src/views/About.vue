<template>
  <div class="about">
    <vue-headful title="About - OneGuy Cinematics" />
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            About OG Cinematics
          </h1>
        </div>
      </div>
    </section>
    <section id="og-intro" class="wrapper container">
      <div class="columns about">
        <div class="column is-half channel">
          <h1 class="title has-text-centered">The Goal</h1>
          <p>
            &emsp;&emsp;To start, I'd like to take a moment to thank you for
            visiting my site. From what was once just an idea to help fellow
            content creators, these cinematic packs have morphed into something
            much larger than ever imaginable. After analyzing the numbers behind
            the 22 (and counting) Overwatch Cinematics, I decided to create this
            site to allow an even wider audience to gain access to quality
            cinematics.
            <span
              >In the end, the goal of this project is simply to help lower the
              barrier for content creators by making the process of finding
              cinematics easy and convenient.</span
            >
          </p>
        </div>
        <div class="column is-half cinematics">
          <h1 class="title has-text-centered">The Cinematics</h1>
          <p>
            &emsp;&emsp;I think many creators go through a few different phases
            when making montages or frag movies. The first is when you finally
            understand how to cut and sync clips to a beat. The second is when
            rose-tinted glasses begin to come off - yes the montage is
            <em>good</em> buts its just missing
            <em> <strong>something</strong> </em>. One thing that can help that
            (at least in my experience) is to break up the non-stop action with
            some cinematics of the current map. While this isn't the only way,
            you'd be surprised at how much they can help.
          </p>
        </div>
      </div>
      <br /><br /><br />
      <div class="news column is-12">
        <h2 class="title">The Music of OneGuy Cinematics</h2>
        <p class="subtitle">
          These massively talented artists are the heart of the music in the
          cinematics I produce.
        </p>
      </div>
      <section id="music" class="container">
        <div class="columns features">
          <div class="column is-6">
            <div class="card card-dark">
              <div class="card-content">
                <div class="content has-text-centered">
                  <h4 class="title">Burn Water (ColdFusion)</h4>
                  <iframe
                    src="https://open.spotify.com/embed?uri=spotify:artist:3qnrdgI8nroC045B0mnPgz"
                    width="100%"
                    height="380"
                    frameborder="0"
                    allowtransparency="true"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-6">
            <div class="card card-dark">
              <div class="card-content">
                <div class="content has-text-centered">
                  <h4 class="title">A Himitsu</h4>
                  <iframe
                    src="https://open.spotify.com/embed/artist/2OWBve72RIOOqOmydsasPz"
                    width="100%"
                    height="380"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
