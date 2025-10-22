import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="bg-gradient-to-r from-primary to-secondary text-white py-16 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">Neeraali Digital</h1>
        <p class="text-xl md:text-2xl mb-2">Crafting Brands Digitally</p>
        <p class="text-lg md:text-xl mb-8">Where Strategy is Smart, and Creativity is Wild.</p>
        <p class="text-base md:text-lg mb-8 max-w-4xl mx-auto">
          We're Neeraali Digital — a full-service digital marketing agency in Bangalore helping brands grow, protect, and thrive in a fast-changing world.
          From identity to impact, we build bold digital experiences that drive results.
        </p>
        <button class="bg-accent hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
          Let's Build Together
        </button>
      </div>
    </header>
  `
})
export class HeaderComponent {}