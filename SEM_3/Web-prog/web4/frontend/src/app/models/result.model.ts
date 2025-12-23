export interface PointRequest {
  x: number;
  y: number;
  r: number;
}

export interface ResultResponse {
  id: number;
  x: number;
  y: number;
  r: number;
  result: boolean;
  time: string;
  bench: number;
}


