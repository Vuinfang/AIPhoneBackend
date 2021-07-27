// for backend sent http request $ npm i --save @nestjs/axios
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HttpRequestService {
  constructor(private readonly httpService: HttpService) {}
  // get data from http
  async httpGetRequest(url: string) {
    const res = this.httpService.get(url).pipe(
      map((axiosResponse) => {
        return axiosResponse.data;
      }),
    );
    return await lastValueFrom(res).then((resp) => {
      return resp;
    });
  }
  async httpPostRequest(url: string, body: any) {
    const res = this.httpService.post(url, body).pipe(
      map((axiosResponse) => {
        return axiosResponse.data;
      }),
    );
    return await lastValueFrom(res).then((resp) => {
      return resp;
    });
  }
}
