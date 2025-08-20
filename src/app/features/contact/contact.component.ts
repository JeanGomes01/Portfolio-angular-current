import { Component } from '@angular/core';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    if (this.contactForm.name && this.contactForm.email && this.contactForm.subject && this.contactForm.message) {
      console.log('Form submitted:', this.contactForm);
      // Aqui você pode implementar a lógica para enviar o email
      // Por exemplo, chamar um serviço que faz uma requisição HTTP
      
      // Reset do formulário após envio
      this.contactForm = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      
      alert('Mensagem enviada com sucesso!');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
}
