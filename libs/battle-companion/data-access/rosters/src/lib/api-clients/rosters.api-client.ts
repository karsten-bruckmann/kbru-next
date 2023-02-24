import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RostersRequest {
  id: number;
}

export interface RostersResponse {
  foo: string;
}

@Injectable({ providedIn: 'root' })
export class RostersApiClient {
  constructor(private http: HttpClient) {}

  public get(request: RostersRequest): Observable<RostersResponse> {
    const params = new URLSearchParams(
      Object.keys(request)
        .map((key) => ({
          key,
          value: request[key as keyof typeof request].toString(),
        }))
        .reduce((p, keyvalue) => ({ ...p, [keyvalue.key]: keyvalue.value }), {})
    );
    return this.http.get<RostersResponse>(`/rosters?${params.toString()}`);
  }
}
