export interface ApiResponse<T = any>{
  status:string;
  results?: number;
  data?: {[key:string] : T};
  accessToken?:string;
  message?:string;
  error?:any;
}
