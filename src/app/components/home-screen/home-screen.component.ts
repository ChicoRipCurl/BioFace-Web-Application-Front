import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Student {
  id: number;
  name: string;
  email: string;
  facultad: string;
  imageUrl: string;
}

interface AccessLog {
  date: string;
  timeEntry: string;
  timeExit: string;
  studentName: string;
  accessPoint: string;
  studentId: number;
}

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent implements OnInit {
  selectedStudent: Student | null = null;

  students: Student[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'u203452658@upc.edu.pe',
      facultad: 'Facultad de Ingeniería',
      imageUrl: 'https://i.imgur.com/hCMFf6B.png'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'u202451234@upc.edu.pe',
      facultad: 'Facultad de Negocios',
      imageUrl: 'https://i.imgur.com/hCMFf6B.png'
    },
    // Más estudiantes aquí...
  ];

  accessLogs: AccessLog[] = [
    {
      date: '09/24/2024',
      timeEntry: '08:30 AM',
      timeExit: '05:00 PM',
      studentName: 'John Doe',
      accessPoint: 'Main Entrance',
      studentId: 1
    },
    {
      date: '09/24/2024',
      timeEntry: '08:30 AM',
      timeExit: '05:00 PM',
      studentName: 'Jane Smith',
      accessPoint: 'Main Entrance',
      studentId: 2
    },
    // Más logs aquí...
  ];

  // Array de URLs de placeholder para simular las cámaras
  cameraFeeds = [
    'https://lh3.googleusercontent.com/-GPftFBqt47o/X2ut32qQv1I/AAAAAAAAor0/y7VLWfec8MQCnte1pa3-YM61l5DsSEFQACLcBGAsYHQ/w640-h358/zoomkkj.gif',
    'https://www.conkreto.net/wp-content/uploads/2020/10/4.jpg',
    'https://noticias.upc.edu.pe/wp-content/uploads/2020/08/Monterrico6-960x640.jpg',

   // '/api/placeholder/400/225',
    'https://noticias.upc.edu.pe/wp-content/uploads/2023/02/Campus_nota.png',
    'https://larepublica.cronosmedia.glr.pe/original/2022/09/23/632e34293695de06603e5f49.jpg',
    'https://lh3.googleusercontent.com/-p8A_Lc3sMmA/X2u1yVIX3rI/AAAAAAAAosg/CZq3uQuaQZAR5RjNLRcvPvlRi681T7jPACLcBGAsYHQ/w640-h198/comparativo.gif'
  ];

  currentCameraPage = 0;
  camerasPerPage = 6;

  constructor() {}

  ngOnInit(): void {}

  selectStudent(studentId: number): void {
    this.selectedStudent = this.students.find(student => student.id === studentId) || null;
  }

  nextCameraPage(): void {
    if ((this.currentCameraPage + 1) * this.camerasPerPage < this.cameraFeeds.length) {
      this.currentCameraPage++;
    }
  }

  toggleStudentDetails(studentId: number): void {
    if (this.selectedStudent?.id === studentId) {
      this.selectedStudent = null;
    } else {
      this.selectedStudent = this.students.find(student => student.id === studentId) || null;
    }
  }


  previousCameraPage(): void {
    if (this.currentCameraPage > 0) {
      this.currentCameraPage--;
    }
  }

  getCurrentCameraFeeds(): string[] {
    const start = this.currentCameraPage * this.camerasPerPage;
    return this.cameraFeeds.slice(start, start + this.camerasPerPage);
  }
}
