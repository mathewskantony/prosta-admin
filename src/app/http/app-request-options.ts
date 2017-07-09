import {BaseRequestOptions, RequestOptions, RequestOptionsArgs} from '@angular/http';
import {Inject, Injectable} from '@angular/core';

@Injectable()
export class AppRequestOptions extends BaseRequestOptions {
  constructor(@Inject('webApiBaseUrl') private webApiBaseUrl: string) {
    super();
  }

  merge(options?: RequestOptionsArgs): RequestOptions {
    console.log('webApiBaseUrl=' + this.webApiBaseUrl);
    console.log('options.url=' + options.url);
    options.url = this.webApiBaseUrl + options.url;
    console.log('options.url=' + options.url);
    if (options.method === 'put' ||
      options.method === 'post' ||
      options.method === 'patch') {
      const headers = options.headers;
      headers['Content-Type'] = 'application/X-www-form-urlencoded';
      options.headers = headers;
    }
    return super.merge(options);
  }
}
