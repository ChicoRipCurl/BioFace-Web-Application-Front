export interface University {
  id: number;
  name: string;
  campuses: Campus[];
}

export interface Campus {
  id: number;
  name: string;
  image: string;
  faculties: Faculty[];
}

export interface Faculty {
  id: number;
  name: string;
  image: string;
}

export interface Student {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  institution_name: string;
  profile_picture: string;
  role: string;
  campus_id: number;
  faculty_id: number;
}
