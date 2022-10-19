export interface userTypes {
    email: string;
     phone: number;
     isActif: boolean;
    password: string;
     TokenId: number;
     LocalisationId: number;
  }
  
  
  export interface userId extends userTypes {
  
    id: number;
  
  }
  

  