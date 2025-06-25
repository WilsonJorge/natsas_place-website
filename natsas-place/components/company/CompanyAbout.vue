<template>
  <div class="company-about-container py-10 px-4 md:px-8 bg-gray-50 rounded-xl">
    <h2
      class="text-3xl font-bold mb-10 text-gray-800 inline-block transform hover:scale-102 transition-transform relative"
    >
      Veja mais informações sobre TechSolutions
      <span class="absolute -bottom-2 left-0 w-1/3 h-1 bg-blue-500"></span>
    </h2>

    <!-- Company Information Section -->
    <section class="company-description mb-12">
      <p class="text-gray-700 leading-relaxed mb-6 text-lg max-w-4xl">
        {{ description }}
      </p>

      <!-- Company QR Code -->
      <div
        v-if="qrValue"
        class="qr-code-container flex flex-col md:flex-row items-center gap-6 mb-8 p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
      >
        <div class="qr-image flex-shrink-0">
          <QRCodeVue3
            :value="qrValue"
            :size="180"
            :margin="2"
            :background="'#FFFFFF'"
            :foreground="'#000000'"
            :level="'H'"
            render-as="svg"
            class="rounded"
          />
        </div>
        <div class="qr-info">
          <h4 class="text-lg font-medium text-gray-800 mb-2">
            Escaneie o nosso QR Code
          </h4>
          <p class="text-gray-600">
            Use este código QR para visitar rapidamente o nosso site, salvar
            nossos contatos ou compartilhar nossas informações.
          </p>
          <div class="mt-3">
            <a
              @click="downloadQRCode"
              class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download QR Code
            </a>
          </div>
        </div>
      </div>

      <div class="work-hours-container flex flex-wrap gap-6 mt-8">
        <div class="work-hours-item flex items-center">
          <div
            class="time-indicator w-3 h-12 bg-blue-500 rounded-full mr-4"
          ></div>
          <div>
            <div class="text-sm text-gray-500 mb-1">Horário de abertura</div>
            <div class="text-lg font-medium">{{ startWorkTime }}</div>
          </div>
        </div>
        <div class="work-hours-item flex items-center">
          <div
            class="time-indicator w-3 h-12 bg-blue-500 rounded-full mr-4"
          ></div>
          <div>
            <div class="text-sm text-gray-500 mb-1">Horário de fechamento</div>
            <div class="text-lg font-medium">{{ endWorkTime }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Information -->
    <section
      class="contact-social-container grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12"
    >
      <div class="contact-info lg:col-span-1">
        <h3 class="text-xl font-bold text-gray-800 mb-6 relative inline-block">
          Contatos da Empresa
          <span class="absolute -bottom-2 left-0 w-1/3 h-1 bg-blue-500"></span>
        </h3>

        <ul class="space-y-4 mt-6">
          <li>
            <a
              :href="website"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-item flex items-center group"
            >
              <span
                class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-all mr-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </span>
              <span
                class="text-gray-700 group-hover:text-blue-600 transition-colors truncate"
                >{{ website }}</span
              >
            </a>
          </li>

          <li>
            <a
              :href="'mailto:' + email"
              class="contact-item flex items-center group"
            >
              <span
                class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-all mr-3"
              >
                <MailOutlined class="text-blue-600" />
              </span>
              <span
                class="text-gray-700 group-hover:text-blue-600 transition-colors truncate"
                >{{ email }}</span
              >
            </a>
          </li>

          <li>
            <div class="contact-item flex items-center group">
              <span
                class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-all mr-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </span>
              <span class="text-gray-700 transition-colors">{{ phone }}</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="social-media lg:col-span-2">
        <h3 class="text-xl font-bold text-gray-800 mb-6 relative inline-block">
          Redes Sociais
          <span
            class="absolute -bottom-2 left-0 w-1/3 h-1 bg-purple-500"
          ></span>
        </h3>

        <div class="social-links-container flex flex-wrap gap-4 mt-6">
          <a
            v-for="rede in redes"
            :key="rede.nome"
            :href="rede.url"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link relative overflow-hidden"
          >
            <div
              class="social-link-content flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
            >
              <component
                :is="rede.icon"
                class="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors mr-2"
              />
              <span class="text-sm font-medium text-gray-700">{{
                rede.nome
              }}</span>
            </div>
            <div
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"
            ></div>
          </a>
        </div>
      </div>
    </section>

    <!-- YouTube Video Section -->
    <section v-if="youtubeUrl" class="youtube-section relative">
      <h3 class="text-xl font-bold mb-6 text-gray-800 relative inline-block">
        Conheça Nossa Empresa
        <span class="absolute -bottom-2 left-0 w-1/3 h-1 bg-purple-500"></span>
      </h3>

      <div
        class="youtube-video-container relative mt-6 overflow-hidden rounded-xl shadow-lg"
      >
        <div
          class="video-gradient absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500 z-10"
        ></div>
        <iframe
          class="w-full aspect-video hover:opacity-95 transition-all duration-300"
          :src="youtubeUrl"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
import QRCodeVue3 from "qrcode.vue";
import { computed } from "vue";

interface Address {
  street: string;
  district: {
    name: string;
    province: {
      name: string;
    };
  };
}

const props = defineProps<{
  startWorkTime: string;
  endWorkTime: string;
  address: Address;
  phone: string;
  email: string;
  description: string;
  sector: string;
  activityType: string;
  website: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
  linkedin: string;
  youtube: string;
  youtubeUrl?: string;
}>();

const redes = [
  {
    nome: "Facebook",
    url: props.facebook,
    icon: FacebookOutlined,
  },
  {
    nome: "Instagram",
    url: props.instagram,
    icon: InstagramOutlined,
  },
  {
    nome: "LinkedIn",
    url: props.linkedin,
    icon: LinkedinOutlined,
  },
  {
    nome: "YouTube",
    url: props.youtube,
    icon: YoutubeOutlined,
  },
  {
    nome: "WhatsApp",
    url: props.whatsapp,
    icon: WhatsAppOutlined,
  },
];

// Generate QR code value with company information in vCard format
const qrValue = computed(() => {
  if (!props.website && !props.email && !props.phone) {
    return null;
  }

  // Use vCard format for contact information
  let vcard = "BEGIN:VCARD\nVERSION:3.0\n";
  vcard += "FN:TechSolutions\n"; // Use dynamic company name when available

  if (props.email) {
    vcard += `EMAIL:${props.email}\n`;
  }

  if (props.phone) {
    vcard += `TEL:${props.phone}\n`;
  }

  if (props.website) {
    vcard += `URL:${props.website}\n`;
  }

  vcard += "END:VCARD";

  return vcard;
});

const downloadQRCode = () => {
  // Get the SVG element
  const svgElement = document.querySelector(".qr-image svg");
  if (!svgElement) return;

  // Create a canvas element
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size to match SVG
  canvas.width = 180;
  canvas.height = 180;

  // Fill with white background
  if (ctx) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Convert SVG to image
    const img = new Image();
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function () {
      // Draw image on canvas
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      // Create download link
      const a = document.createElement("a");
      a.download = "techsolutions-qrcode.png";
      a.href = canvas.toDataURL("image/png");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    img.src = url;
  }
};
</script>

<style scoped>
.company-about-container {
  position: relative;
}

.company-about-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.3;
  pointer-events: none;
}

.social-link {
  transition: all 0.3s ease;
}

.social-link:hover {
  transform: translateY(-2px);
}

.contact-item {
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateX(5px);
}

.work-hours-item {
  transition: all 0.3s ease;
}

.work-hours-item:hover {
  transform: translateY(-2px);
}

.youtube-video-container {
  transition: all 0.3s ease;
}

.youtube-video-container:hover {
  transform: scale(1.01);
}
</style>
