<template>
  <div class="container">
    <div class="header">
      <div class="title-skeleton"></div>
    </div>

    <div class="content">
      <div class="company-header">
        <div class="icon-skeleton"></div>

        <div class="details">
          <div class="details-header">
            <div class="name-skeleton"></div>
            <div class="button-skeleton"></div>
          </div>

          <div class="description-skeleton"></div>

          <div class="info-grid">
            <div class="info-item">
              <div class="info-skeleton"></div>
            </div>
            <div class="info-item">
              <div class="info-skeleton"></div>
            </div>
            <div class="info-item">
              <div class="info-skeleton"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nav class="bg-white mt-4 rounded-lg border mx-5">
      <div class="flex overflow-x-auto">
        <div
          v-for="i in 2"
          :key="i"
          class="px-6 py-4 flex items-center gap-2 whitespace-nowrap"
        >
          <div class="w-6 h-6 rounded bg-gray-200 animate-pulse"></div>
          <div class="w-24 h-5 rounded bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    </nav>

    <div class="px-5">
      <br />
      <div class="w-72 h-8 bg-gray-200 rounded animate-pulse mb-6"></div>

      <div class="grid grid-cols-12 gap-6">
        <!-- Coluna Principal (8 colunas) -->
        <div class="col-span-8">
          <!-- Card de Descrição -->
          <div
            class="bg-white p-8 rounded-xl shadow-md border border-gray-200 mb-6"
          >
            <div class="space-y-3">
              <div class="w-full h-5 bg-gray-200 rounded animate-pulse"></div>
              <div class="w-full h-5 bg-gray-200 rounded animate-pulse"></div>
              <div class="w-3/4 h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div
              class="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-4"
            >
              <div class="w-48 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div class="w-48 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          <!-- Card de Vídeo -->
          <div class="mt-6 bg-white p-6 rounded-xl shadow-md">
            <div class="w-64 h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div
              class="w-full aspect-video bg-gray-200 rounded-lg animate-pulse"
            ></div>
          </div>
        </div>

        <!-- Coluna Lateral (4 colunas) -->
        <div class="col-span-4">
          <div
            class="bg-white p-6 rounded-xl shadow-md border-2 border-gray-200"
          >
            <!-- Cabeçalho -->
            <div class="flex items-center mb-6">
              <div class="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div
                class="w-48 h-6 bg-gray-200 rounded ml-3 animate-pulse"
              ></div>
            </div>

            <!-- Contatos -->
            <div class="space-y-4">
              <div
                class="w-full h-12 bg-gray-200 rounded-lg animate-pulse"
              ></div>
              <div
                class="w-full h-12 bg-gray-200 rounded-lg animate-pulse"
              ></div>
              <div
                class="w-full h-12 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            </div>

            <!-- Redes Sociais -->
            <div class="mt-8">
              <div
                class="w-40 h-6 bg-gray-200 rounded animate-pulse mb-4"
              ></div>
              <div class="grid grid-cols-3 gap-3">
                <div
                  v-for="i in 5"
                  :key="i"
                  class="h-16 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  margin-top: 1rem;
}

.header {
  background: #f0f0f0;
  padding: 1rem;
  text-align: center;
}

.title-skeleton {
  height: 2rem;
  width: 200px;
  margin: 0 auto;
  background: #e0e0e0;
  border-radius: 0.25rem;
  animation: pulse 1.5s infinite;
}

.content {
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
}

.company-header {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.icon-skeleton {
  width: 64px;
  height: 64px;
  background: #e0e0e0;
  border-radius: 0.5rem;
  flex-shrink: 0;
  animation: pulse 1.5s infinite;
}

.details {
  flex-grow: 1;
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.name-skeleton {
  height: 1.5rem;
  width: 200px;
  background: #e0e0e0;
  border-radius: 0.25rem;
  animation: pulse 1.5s infinite;
}

.button-skeleton {
  height: 2rem;
  width: 120px;
  background: #e0e0e0;
  border-radius: 0.25rem;
  animation: pulse 1.5s infinite;
}

.description-skeleton {
  height: 1rem;
  width: 100%;
  background: #e0e0e0;
  border-radius: 0.25rem;
  margin: 1rem 0;
  animation: pulse 1.5s infinite;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
}

.info-skeleton {
  height: 2rem;
  width: 100%;
  background: #e0e0e0;
  border-radius: 0.25rem;
  animation: pulse 1.5s infinite;
}

.navigation {
  margin-top: 1rem;
}

.nav-items {
  display: flex;
  gap: 0.5rem;
}

.nav-skeleton {
  height: 2rem;
  width: 120px;
  background: #e0e0e0;
  border-radius: 0.25rem;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
