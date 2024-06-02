export interface DepartmentType{
    title: string;
    description: string;
    employees: EmployeeType[];
}

export interface EmployeeType{
    id: number;
    email: string;
    fullName: string;
    roleId: string;
    dateOfBirth: string;
    personalId: string;
    address: string;
    departmentId: number;
}

export interface ProjectType{
    title: string;
    description: string;
    client: string;
    status: StatusType;
    deadline: Date;
}

export interface StatusType {
    id: number;
    name: string;
    color: string;
}

export interface User{
    invoices?: any[];
    id: number;
    name: string;
    tgUsername: string;
    tgId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface StoreInfo{
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface StoreInfoType {
    id?: number;
    key: number;
    title: string;
    description: string;
}

export interface Product{
    id: number;
    title: string;
    price: number;
    duration: string;
    description: string[];
    link: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductType {
    id?: number;
    key: number;
    title: string;
    price: number;
    duration: string;
    description: any;
    link: string;
}

export interface News{
    id: number;
    title: string;
    description: any;
    photos: string[];
    createdAt: string;
    updatedAt: string;
}

export interface NewsType {
    id?: number;
    key: number;
    title: string;
    description: string;
    photos: string[];
}

export interface Testimonial{
    id: number;
    title: string;
    description: any;
    photos: string[];
    createdAt: string;
    updatedAt: string;
}

export interface TestimonialType {
    id?: number;
    key: number;
    title: string;
    description: string;
    photos: string[];
}

export interface Faq{
    id: number;
    question: string;
    description: string[];
    createdAt: string;
    updatedAt: string;
}
export interface FaqType {
    id?: number;
    key: number;
    question: string;
    description: string[];
}