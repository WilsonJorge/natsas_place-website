<template>
  <footer class="bg-white text-gray-800 py-10">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
            <span class="text-2xl">📢</span>
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 font-extrabold"
            >
              FeedbackMZ
            </span>
          </h3>
          <p class="text-gray-600 mb-6">
            Sua plataforma de denúncias e reclamações em Moçambique.
          </p>
          <div class="flex space-x-5">
            <a
              href="#"
              class="text-gray-500 hover:text-blue-600 transition-colors duration-300"
            >
              <FacebookIcon class="w-6 h-6" />
            </a>
            <a
              href="#"
              class="text-gray-500 hover:text-blue-600 transition-colors duration-300"
            >
              <TwitterIcon class="w-6 h-6" />
            </a>
            <a
              href="#"
              class="text-gray-500 hover:text-blue-600 transition-colors duration-300"
            >
              <InstagramIcon class="w-6 h-6" />
            </a>
            <a
              href="#"
              class="text-gray-500 hover:text-blue-600 transition-colors duration-300"
            >
              <LinkedInIcon class="w-6 h-6" />
            </a>
          </div>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4 text-blue-600">
            Links Rápidos
          </h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/occurrence/create"
                class="text-gray-600 hover:text-blue-700 transition-colors duration-300 flex items-center gap-2 group"
              >
                <span
                  class="w-0 h-0.5 bg-blue-600 group-hover:w-2 transition-all duration-300"
                ></span>
                Fazer Denúncia
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/companies"
                class="text-gray-600 hover:text-blue-700 transition-colors duration-300 flex items-center gap-2 group"
              >
                <span
                  class="w-0 h-0.5 bg-blue-600 group-hover:w-2 transition-all duration-300"
                ></span>
                Empresas
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/news"
                class="text-gray-600 hover:text-blue-700 transition-colors duration-300 flex items-center gap-2 group"
              >
                <span
                  class="w-0 h-0.5 bg-blue-600 group-hover:w-2 transition-all duration-300"
                ></span>
                Notícias
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/sobre"
                class="text-gray-600 hover:text-blue-700 transition-colors duration-300 flex items-center gap-2 group"
              >
                <span
                  class="w-0 h-0.5 bg-blue-600 group-hover:w-2 transition-all duration-300"
                ></span>
                Sobre Nós
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4 text-blue-600">
            Para Empresas
          </h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/auth/register"
                class="text-gray-600 hover:text-blue-700 transition-colors duration-300 flex items-center gap-2 group"
              >
                <span
                  class="w-0 h-0.5 bg-blue-600 group-hover:w-2 transition-all duration-300"
                ></span>
                Cadastrar Empresa
              </NuxtLink>
            </li>
            <li>
              <a
                href="https://feedback-dashboard-opal.vercel.app/auth/signin"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 hover:text-blue-700 transition-colors duration-300 flex items-center gap-2 group"
              >
                <span
                  class="w-0 h-0.5 bg-blue-600 group-hover:w-2 transition-all duration-300"
                ></span>
                Dashboard
              </a>
            </li>
            <li>
              <NuxtLink
                to="/planos"
                class="text-gray-600 hover:text-blue-700 transition-colors duration-300 flex items-center gap-2 group"
              >
                <span
                  class="w-0 h-0.5 bg-blue-600 group-hover:w-2 transition-all duration-300"
                ></span>
                Planos e Preços
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/suporte"
                class="text-gray-600 hover:text-blue-700 transition-colors duration-300 flex items-center gap-2 group"
              >
                <span
                  class="w-0 h-0.5 bg-blue-600 group-hover:w-2 transition-all duration-300"
                ></span>
                Suporte
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4 text-blue-600">Contato</h4>
          <ul class="space-y-3 text-gray-600">
            <li
              class="flex items-center gap-2 hover:text-blue-700 transition-colors duration-300"
            >
              <MapPinIcon class="w-5 h-5 text-blue-600" />
              <span>Maputo, Moçambique</span>
            </li>
            <li class="flex items-center gap-2">
              <EnvelopeIcon class="w-5 h-5 text-blue-600" />
              <a
                href="mailto:contato@feedbackmz.co.mz"
                class="hover:text-blue-700 transition-colors duration-300"
              >
                contato@feedbackmz.co.mz
              </a>
            </li>
            <li class="flex items-center gap-2">
              <PhoneIcon class="w-5 h-5 text-blue-600" />
              <a
                href="tel:+258841234567"
                class="hover:text-blue-700 transition-colors duration-300"
              >
                +258 84 123 4567
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-200 pt-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-gray-600">
            &copy; {{ new Date().getFullYear() }} FeedbackMZ. Todos os direitos
            reservados.
          </p>
          <div class="flex gap-6 text-gray-600">
            <NuxtLink
              to="/privacidade"
              class="hover:text-blue-600 transition-colors duration-300"
              >Privacidade</NuxtLink
            >
            <NuxtLink
              to="/termos"
              class="hover:text-blue-600 transition-colors duration-300"
              >Termos de Uso</NuxtLink
            >
            <NuxtLink
              to="/cookies"
              class="hover:text-blue-600 transition-colors duration-300"
              >Cookies</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/vue/24/outline";

import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedInIcon,
} from "../assets/icons";
</script>
