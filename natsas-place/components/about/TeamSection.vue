<template>
    <div class="bg-gray-100 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
          <p class="text-xl text-gray-600">Meet the people dedicated to improving your experience</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TeamMember
            v-for="member in team"
            :key="member.name"
            v-bind="member"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface TeamMember {
    name: string
    role: string
    description: string
    image: string
  }
  
  const team: TeamMember[] = [
    {
      name: 'John Smith',
      role: 'Chief Executive Officer',
      description: '15+ years of experience in customer service excellence',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Sarah Johnson',
      role: 'Chief Operations Officer',
      description: 'Expert in streamlining complaint resolution processes',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      description: 'Pioneering innovative solutions in customer support',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ]
  </script>