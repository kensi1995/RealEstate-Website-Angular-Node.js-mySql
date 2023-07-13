export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: number;
  username: string;
  password: string;
  city: string;
  image: string;
  role: string;
  status: string;
}

export interface UserImg {
  userId: number;
  imgUrl: string;
}
