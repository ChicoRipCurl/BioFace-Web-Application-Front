import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-help-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './help-screen.component.html',
  styleUrls: ['./help-screen.component.css']
})
export class HelpScreenComponent implements OnInit {
  faqs: FAQ[] = [
    {
      id: 1,
      question: '¿Qué es Bioface School?',
      answer: 'Bioface School es un sistema de reconocimiento facial diseñado específicamente para instituciones educativas. Permite la identificación rápida y segura de estudiantes mediante tecnología biométrica y machine learning, eliminando la necesidad de carnés físicos.'
    },
    {
      id: 2,
      question: '¿Cómo funciona el sistema de reconocimiento facial?',
      answer: 'El sistema captura la imagen facial del estudiante durante el registro inicial y la almacena de forma segura en nuestra base de datos. Para el acceso diario, simplemente debes colocarte frente a las cámaras instaladas en los puntos de entrada, y el sistema verificará tu identidad en segundos.'
    },
    {
      id: 3,
      question: '¿Es seguro el almacenamiento de mis datos biométricos?',
      answer: 'Sí, la seguridad es nuestra prioridad. Todos los datos biométricos se almacenan de forma encriptada y siguiendo los más altos estándares de seguridad. Solo el personal autorizado tiene acceso a esta información.'
    },
    {
      id: 4,
      question: '¿Qué hago si el sistema no me reconoce?',
      answer: 'Si el sistema no te reconoce, puedes intentar reposicionarte frente a la cámara asegurándote de que tu rostro esté bien iluminado. Si el problema persiste, contacta al personal administrativo para una verificación manual y posible actualización de tu registro biométrico.'
    },
    {
      id: 5,
      question: '¿Puedo usar el sistema en diferentes campus de la universidad?',
      answer: 'Sí, una vez registrado en el sistema, tu perfil biométrico funcionará en todos los puntos de acceso habilitados con Bioface School dentro de tu institución educativa.'
    }
  ];

  selectedFaq: FAQ | null = null;

  constructor() {}

  ngOnInit(): void {}

  selectFaq(faq: FAQ): void {
    // Si la misma pregunta se selecciona, se deselecciona
    if (this.selectedFaq?.id === faq.id) {
      this.selectedFaq = null;
    } else {
      this.selectedFaq = faq;
    }
  }
}
