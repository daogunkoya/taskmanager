import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the session storage


    const authToken = localStorage.getItem('access_token');
    console.log('token=', authToken)
    //const authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWFjN2I5NzNkZmNkOWNlNjAyMzYyYTgyN2NhYTc1N2ZlZWM4ZDEzNDkzMzg2NGUwOTg1ZTIwYTM4YjU0YTQwYzFkMDgwZWY1YWQ3Mjc3MGMiLCJpYXQiOjE2Nzk4NDMxODMuMTg1Njc5LCJuYmYiOjE2Nzk4NDMxODMuMTg1NjgyLCJleHAiOjE3MTE0NjU1ODMuMTgzOTk0LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.MMltgjnWudpEKuzKbnP9zmdafjSCMVme4UEE56unozHoIkUwpGHpmAzCF6J4KR4YDBvx8wE42R9Ki2e5Oh8ZN0Xzf7ctAE3Hu8sRVpjHaauXhlCWqDIASY5FTcXQIMR_6dSPD0X_hINY9Grn8LxL3NXI_vN_CY88jO4Xy47gjKb-hfyUB3jLEXP7U39tEpvm5I2pBprFcX6Vl1ly_bCvdM4qCmUf1qqD3BorOvREghThUbT4mh-QypDIs4cdxuSsJSMfxRPfiXxx144mA_B8KAAmrkETXm5QsUf8XUCGd2r5UD9dv1MiHWyBxienF28oM220DC8VESAMiaUNEp-qH0FDtWhiAOfNDgnDj-zbIEZvZsVvlO_fxrjCp3-YYr56hxZRO1BCSmpVdM_WzAE0VSAjJBmhXODjrGW-ZeS0uwH710Uk1IM_QeMfRDAxsKDKCF4xmszmxplDAvWYAyORMXrWFJB-t4fYERpOOTISuahsWSQj-f9mjlhoxWxUJOhZOf7aOFag0vMcvQkA2bCqTcaNw3O2NU_5UJFU8o6jQU6cAHIPXSRztLaYgjDXmi4PiuooxyUrJPYhgIqEdkFCB1qkTQoQ3Svh6SFYNRmTU1llfONWeWm6MIFtwPNbGqR2noEYbu6tC_p_5iY10TXWNdyOOnUNvzBS7jq4YokP0EU";

    // Clone the request and add the auth token to the headers
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });

    // Send the cloned request to the next handler.
    return next.handle(authReq);
  }
}
